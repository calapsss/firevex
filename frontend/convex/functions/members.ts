import { asyncMap } from "modern-async";
import { Doc, Id } from "../_generated/dataModel";
import { query, mutation, QueryCtx } from "../_generated/server";
import { v } from "convex/values";


//CREATE
export const create = mutation({
    args : {
        teamId: v.id("teams"),
        userId: v.id("users"),
        role: v.optional(v.string())
    },
    handler: async(ctx, {
        teamId, userId, role
    }) => {
        const joined = await ctx.db.insert("members", {
            teamId: teamId,
            userId:userId,
            role: role || "member" 
        });
        return joined
    }
})

//READ
export const get = query({
    args : {
        userId: v.id("users"),
        teamId: v.id("teams")
    },
    handler: async (ctx, {userId, teamId}) => {
        const user =  await ctx.db.query("members")
            .withIndex("by_team_user", (q) => 
                q.eq("teamId", teamId).eq("userId", userId))
        .unique()

        return user
    }
})

export const getTeamMembers = query ({
    args : {
        teamId: v.id("teams")
    },
    handler: async (ctx, args) => {
        const members = await ctx.db.query("members")
            .withIndex("by_team", (q) => q.eq("teamId", args.teamId))
            .order("desc")
            .collect()

        return await enrichMembers(ctx, members);

    }
})

export const getUserTeams = query ({
    handler: async (ctx) => {
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
            throw new Error("Please Login to Create a Topic")
        }
        const members = await ctx.db.query("members")
            .withIndex("by_user", (q) => q.eq("userId",creator._id))
            .order("desc")
            .collect()

        return await enrichTeams(ctx, members);
    }
})

async function enrichTeams(ctx: QueryCtx, members: Doc<"members">[]){
    return await asyncMap(members, (member) => enrichTeam(ctx, member));
}

async function enrichTeam(ctx: QueryCtx, member: Doc<"members"> ){
    const team = await ctx.db.get(member.teamId);
    return { ...member, team}
}

async function enrichMembers(ctx: QueryCtx, members: Doc<"members">[]){
    return await asyncMap(members, (member) => enrichMember(ctx, member));
}

async function enrichMember(ctx: QueryCtx, member: Doc<"members"> ){
    const user = await ctx.db.get(member.userId);
    return { ...member, user}
}
//Deal with this type later
export type TeamMembers = NonNullable<Awaited<ReturnType<typeof enrichMember>>>
export type UserTeams = NonNullable<Awaited<ReturnType<typeof enrichTeam>>>


//UPDATE
// Only update the role
export const updateRole = mutation({
    args: {
        userId: v.id("users"),
        teamId: v.id("teams"),
        role: v.string()
    },
    handler: async(ctx, {userId, teamId, role}) =>  {
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
        const adminMember = await ctx.db.query("members")
            .withIndex("by_team_user", (q) => q.eq("teamId", teamId).eq("userId", admin._id))
            .unique()

        //Role Check
        if (!adminMember){
            throw new Error("You are not a member of this team")
        }

        if (adminMember.role != "admin" && adminMember.role != "creator" ){
            throw new Error("You do not have permissions to edit a user")
        }

        const member = await ctx.db.query("members")
        .withIndex("by_team_user", (q) => q.eq("teamId", teamId).eq("userId", userId))
        .unique()
        if(member === null ){
            throw new Error("Member does not exist")
        }

        if( member.role === "creator"){
            throw new Error("You can not edit the creator of this team")
        }

        if(member.role === "admin" && adminMember.role != "creator"){
            throw new Error("You can not edit a fellow admin in this team")
        }

        const edit = await ctx.db.patch(member._id, {role: role})
        return edit
    },
})


// DELETE
// Only to delete a user from team
export const deleteMember = mutation ({
    args:  {
        userId : v.id("users"),
        teamId: v.id("teams")
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
        const adminMember = await ctx.db.query("members")
        .withIndex("by_team_user", (q) => q.eq("teamId", args.teamId).eq("userId", admin._id))
        .unique()

        //Role Check
        if (!adminMember){
            throw new Error("You are not a member of this team")
        }

        if (adminMember.role != "admin" && adminMember.role != "creator" ){
            throw new Error("You do not have permissions to kick a user")
        }

        //Retrieve User to Kick
        const kickMember =  await ctx.db.query("members")
        .withIndex("by_team_user", (q) => q.eq("teamId",args.teamId).eq("userId", args.userId))
        .unique()

        
        if (kickMember === null){
            throw new Error("Member does not exist")
        }
        
        
        if(kickMember.role === "admin" || kickMember.role === "creator"){
            throw new Error("You can not kick a fellow admin or creator in this team")
        }
        
        //Delete
        await ctx.db.delete(kickMember._id)
       
    }
})


// Leave Team
export const leaveTeam = mutation ({
    args:  { 
        teamId: v.id("teams")
    },
    handler: async (ctx, args) => {
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
        

        //Retrieve User to leave
        const leaveTeam =  await ctx.db.query("members")
        .withIndex("by_team_user", (q) => q.eq("teamId",args.teamId).eq("userId", user._id))
        .unique()

        if (leaveTeam === null){
            throw new Error("Member does not exist")
        }

        //Delete
        return await ctx.db.delete(leaveTeam._id)
    }
})