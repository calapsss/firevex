import { asyncMap } from "modern-async";
import { Doc, Id } from "../_generated/dataModel";
import { query, mutation, QueryCtx } from "../_generated/server";
import { v } from "convex/values";


//CREATE
export const create = mutation({
    args : {
        teamId: v.id("teams"),
    },
    handler: async(ctx, {
        teamId
    }) => {
      //Get User Identity
      const  identity = await ctx.auth.getUserIdentity();
      if (!identity) {
      throw new Error("No authenticated User")
      }
      //grab user identity
      const user  = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();
      //Validation
      if(user == null) {
          throw new Error("Please Login to Create a Topic")
      }
      //Retrieve team
      const team = await ctx.db.get(teamId);
        if(team === null){
            throw new Error("This team does not exist")
        }
      //Retrieve User to is Member
      const member =  await ctx.db.query("members")
      .withIndex("by_team_user", (q) => q.eq("teamId",teamId).eq("userId", user._id))
      .unique()
      if (member === null){
          throw new Error("Member does not exist")
      }
    //Generate Invite Code
    const firstWord = team.name.split(" ")[0];
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const inviteCode = `${firstWord}-${randomCode}`;
        const invite = await ctx.db.insert("invites", {
            teamId: teamId,
            code: inviteCode,
            userId: user._id
        });
        return inviteCode
    }
})


// DELETE
// Only to delete a user from team
export const deleteCode = mutation ({
    args:  {
        invite: v.id("invites")
    },
    handler: async (ctx, args) => {
        //Get User Identity
        const  identity = await ctx.auth.getUserIdentity();
        if (!identity) {
        throw new Error("No authenticated User")
        }
        //grab user identity
        const admin  = await ctx.db
        .query("users")
        .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
        .unique();
        //Validation
        if(admin == null) {
            throw new Error("Please Login to Create a Topic")
        }
        //Permission Check
        const inviteCode = await ctx.db.get(args.invite)

        //Role Check
        if (!inviteCode){
            throw new Error("No invite Code Exists")
        }

        if(inviteCode.userId != admin._id){
            throw new Error("You don't own the invite code")
        }

        //Delete
        return await ctx.db.delete(inviteCode._id)
    }
})


//JOIN TEAM
export const joinTeam = mutation ({
    args:  {
        invite: v.id("invites")
    },
    handler: async (ctx, args) => {
        //Get User Identity
        const  identity = await ctx.auth.getUserIdentity();
        if (!identity) {
        throw new Error("No authenticated User")
        }

        //grab user identity
        const admin  = await ctx.db
        .query("users")
        .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
        .unique();

        //Validation
        if(admin == null) {
            throw new Error("Please Login to Join Team")
        }
        //Permission Check
        const inviteCode = await ctx.db.get(args.invite)

        //Role Check
        if (!inviteCode){
            throw new Error("No invite Code Exists")
        }


        //Retrieve member
        
        const member =  await ctx.db.query("members")
            .withIndex("by_team_user", (q) => 
                q.eq("teamId", inviteCode.teamId).eq("userId", admin._id))
        .unique()

        if(member){
            throw new Error("You are already a member of this team")
        }

        //Create Member
        return await ctx.db.insert("members", {
            teamId: inviteCode.teamId,
            userId: admin._id,
            role: "member"
        })

    }
})
