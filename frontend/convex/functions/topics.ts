import { asyncMap } from "modern-async";
import { Doc, Id } from "../_generated/dataModel";
import { query, mutation, QueryCtx } from "../_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";


//Create
export const create = mutation({
    args: {
        teamId: v.id("teams"),
        name: v.string(),
        description: v.string(),
        tags: v.optional(v.id("tags"))
    },
    handler: async(ctx, {
        teamId, name, description, tags
    }) => {
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
        if(name.length <= 3 || name.length > 100 ){
            throw new Error("Name is too short or too long")
        }
        if(description.length <= 3 || description.length > 650 ){
            throw new Error("Description is too short or is too long")
        }

        const newTopic = await ctx.db.insert(
            "topics",{
                creatorId: creator._id,
                name: name,
                description: description,
                teamId: teamId
            }
        )
        
        return newTopic;
        
    }
})

//READ
//get all topics from everyone
export const all = query({
    args: {
        paginationOpts: paginationOptsValidator
    },
    handler: async(ctx, args) => {
        const allTopics = await ctx.db
        .query("topics")
        .order("desc")
        .paginate(args.paginationOpts)

        return { ...allTopics, page: await enrichTopics(ctx, allTopics.page)}
    },
})

//Get topics from a team
export const getTeamTopics = query({
    args: {
        teamId: v.id("teams"),
        paginationOpts: paginationOptsValidator
    },
    handler: async(ctx, args) => {
        const teamTopics = await ctx.db
        .query("topics")
        .withIndex("by_team", (q) => q.eq("teamId", args.teamId))
        .order("desc")
        .paginate(args.paginationOpts)

        return { ...teamTopics, page: await enrichTopics(ctx, teamTopics.page)}
    },
})

//Get topics form user
export const getUserTopics = query({
    args: {
        userId: v.id("users"),
        paginationOpts: paginationOptsValidator
    },
    handler: async(ctx, args) => {
        const userTopics = await ctx.db
        .query("topics")
        .withIndex("by_creator", (q) => q.eq("creatorId", args.userId))
        .order("desc")
        .paginate(args.paginationOpts)

        return { ...userTopics, page: await enrichTopics(ctx, userTopics.page)}
    },
})

//enrich topics with team and creatorids (TODO: deal with tags)
async function enrichTopics(ctx: QueryCtx, topics: Doc<"topics">[]){
    return await asyncMap(topics, (topic) => enrichTopic(ctx, topic));
}

async function enrichTopic(ctx: QueryCtx, topic: Doc<"topics"> ){
    const user = await ctx.db.get(topic.creatorId);
    const team = await ctx.db.get(topic.teamId);
    return { ...topic, user, team}
}
//Deal with this type later
export type Topic = NonNullable<Awaited<ReturnType<typeof enrichTopic>>>

//UPDATE
export const update = mutation({
    args: {
        topicId: v.id("topics"),
        data: v.object({
            name: v.optional(v.string()),
            description: v.optional(v.string()),
        })
    },
    handler: async (ctx, args) => {
        //Fetch topic
        const topic = await ctx.db.get(args.topicId);
        if(topic === null ){
            throw new Error("Topic does not exist")
        }

        //Check if user is logged in 
        const  identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Please Login to edit")
        }
        //grab the user
        const user  = await ctx.db
        .query("users")
        .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
        .unique();
        if(user === null){
            throw new Error("User is not onboarded")
        }

        //Check if user has permissions to edit 
        const member = ctx.db.query("members")
        .withIndex("by_team_user", (q) => q.eq("teamId",topic.teamId).eq("userId", user._id))
        .unique()

        if(member === null){
            throw new Error("You have no permission to edit")
        }

        const editedTopic = ctx.db.patch(
            args.topicId, {
                name: args.data?.name,
                description: args.data?.description
            }
        )

        return editedTopic
    },
})


//DELETE
export const del = mutation({
    args: {
        topicId: v.id("topics"),
    },
    handler: async (ctx, args) => {
        //Fetch topic
        const topic = await ctx.db.get(args.topicId);
        if(topic === null ){
            throw new Error("Topic does not exist")
        }

        //Check if user is logged in 
        const  identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Please Login to edit")
        }
        //grab the user
        const user  = await ctx.db
        .query("users")
        .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
        .unique();
        if(user === null){
            throw new Error("User is not onboarded")
        }

        //Check if user has permissions to edit 
        const member = ctx.db.query("members")
        .withIndex("by_team_user", (q) => q.eq("teamId",topic.teamId).eq("userId", user._id))
        .unique()

        if(member === null){
            throw new Error("You have no permission to edit")
        }

        return await ctx.db.delete(topic._id)

    },
})
