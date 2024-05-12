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
    args : {
        userId: v.id("users")
    },
    handler: async (ctx, args) => {
        const members = await ctx.db.query("members")
            .withIndex("by_user", (q) => q.eq("userId", args.userId))
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
        const member = await ctx.db.query("members")
        .withIndex("by_team_user", (q) => q.eq("teamId", teamId).eq("userId", userId))
        .unique()
        if(member === null ){
            throw new Error("Member does not exist")
        }
        const edit = await ctx.db.patch(member._id, {role: role})
        return edit
    },
})