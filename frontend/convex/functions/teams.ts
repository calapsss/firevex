import { paginationOptsValidator } from "convex/server";
import { asyncMap } from 'modern-async'
import { Doc, Id } from "../_generated/dataModel";
import { query, mutation, QueryCtx } from "../_generated/server";
import { v } from "convex/values";
import { api } from "../_generated/api";

//CREATE
//Adds a new team to the database.
export const create = mutation({
  // Defining the arguments we expect for this mutation
  args: {
    name: v.string(),
    description: v.string(),
    visibility: v.string()
  },
  // This handler executes when the mutation is called
  handler: async (ctx, {name, description, visibility}) => {
    //Get User Identity
    const  identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("No authenticated User")
    }
    //grab user identity
    const creator  = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();
    //Validation
    if(creator == null) {
        throw new Error("Please Login to Create a Team")
    }
    if(name.length <= 3 || name.length > 100 ){
        throw new Error("Name is too short or too long")
    }
    if(description.length <= 3 || description.length > 650 ){
        throw new Error("Description is too short or is too long")
    }

    const newTeamId = await ctx.db.insert(
        "teams",{
            creatorId: creator._id,
            name: name,
            description: description,
            visibility: visibility 
        }
    )

    if (newTeamId){
      await ctx.scheduler.runAfter(0, api.functions.members.create, {
        teamId: newTeamId,
        userId: creator._id,
        role: "creator"
      })
    }

    
    return newTeamId;
      
  }
});
  


//READ
//Returns all public teams
export const all = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    //Get User Identity verify that user is logged
    const  identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null
    }

    
    //get all Public teams
    const allPublic = await ctx.db
    .query("teams")
    .withIndex("by_visibility", (q) => q.eq("visibility", "public"))
    .order("desc")
    .paginate(args.paginationOpts)

    return {...allPublic, page: await enrichTeams(ctx, allPublic.page)}
   
  },
});

export const userTeams = query({
    handler: async(ctx) => {
        const  identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return null
        }
        //grab the user
        const user  = await ctx.db
        .query("users")
        .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
        .unique();

        if(user === null){
            throw new Error("User is not onboarded")
        }

        const userTeams = await ctx.db
        .query("teams")
        .withIndex("by_creator", (q)=> q.eq("creatorId", user._id))
        .order("desc")
        .collect()


        return await enrichTeams(ctx, userTeams)

    }
})


async function enrichTeams(ctx: QueryCtx, teams: Doc<"teams">[]){
    return await asyncMap(teams, (team) => enrichTeam(ctx, team));
}

async function enrichTeam(ctx: QueryCtx, team: Doc<"teams"> ){
    const creator = await ctx.db.get(team.creatorId);
    return { ...team, creator}
}
//Deal with this type later
export type Team = NonNullable<Awaited<ReturnType<typeof enrichTeam>>>

//Get Specific team
export const get = query({
    args: {
        teamId: v.id("teams")
    },
    handler: async (ctx, args) => {
        const team = await ctx.db.get(args.teamId);
        if (team === null){
            return null;
        }
        return await enrichTeam(ctx, team);
    }
})

//UPDATE

//Update user details
  export const update = mutation({
    args: {
      teamId: v.id("teams"),
      name: v.string(),
      description: v.string(),
      visibility: v.string()
    },
    handler: async (ctx, {
        teamId,
        name,
        description,
        visibility
    }) => {
      // Fetch the user by its unique identifier
      const  identity = await ctx.auth.getUserIdentity();
      if (!identity) {
        throw new Error("No authenticated User")
      }

      //Check if identity was stored before
      const user  = await ctx.db
        .query("users")
        .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
        .unique();

      //Fetch Team
      const team = await ctx.db.get(teamId);
      if (team === null){
        throw new Error("No team to edit")
      }

      //Verify the team
      if( user?._id != team?.creatorId){
        throw new Error("You are not authorized to edit team")
      }

      return await ctx.db.patch(team._id, {
        name: name,
        description: description,
        visibility: visibility
      })

    }
  });
  

//DELETE
  //Delete a team
  export const deleteTeam = mutation({
    args: {
        teamId: v.id("teams")
    },
    handler: async (ctx, args) => {
      const  identity = await ctx.auth.getUserIdentity();
      if (!identity) {
        throw new Error("No authenticated User")
      }
      //Check if identity was stored before
      const user  = await ctx.db
        .query("users")
        .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
        .unique();

      //Fetch Team
      const team = await ctx.db.get(args.teamId);
      if (team === null){
        throw new Error("No team to delete")
      }

      //Verify the team
      if( user?._id != team?.creatorId){
        throw new Error("You are not authorized to delete team")
      }
      
      return await ctx.db.delete(team._id)


    }
  });

  
