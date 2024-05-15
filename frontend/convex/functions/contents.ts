import { asyncMap } from "modern-async";
import { Doc, Id } from "../_generated/dataModel";
import { query, mutation, QueryCtx } from "../_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";


//Create
export const create = mutation({
    args: {
        teamId: v.id("teams"),
        topicId: v.id("topics"),
        name: v.string(),
        description: v.string(),
        attachments: v.optional(v.array(v.string())),
        tags: v.optional(v.array(v.id("tags")))    
    },
    handler: async(ctx, {
        teamId, name, description, topicId, attachments,  tags
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

        const newContent = await ctx.db.insert(
            "contents",{
                creatorId: creator._id,
                name: name,
                description: description,
                teamId: teamId,
                topicId: topicId,
                attachments: attachments,
                tags: tags
            }
        )
        
        return newContent;
        
    }
})

//READ
//get all topics from everyone
export const all = query({
    args: {
        paginationOpts: paginationOptsValidator
    },
    handler: async(ctx, args) => {
        const allContent = await ctx.db
        .query("contents")
        .order("desc")
       .paginate(args.paginationOpts)
       return { ...allContent, page: await enrichContents(ctx, allContent.page)}
},
})

//Get topics from a team
export const getTeamContent = query({
    args: {
        teamId: v.id("teams"),
        paginationOpts: paginationOptsValidator
    },
    handler: async(ctx, args) => {
        //Check if user is logged in 
        const  identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Please Login to view")
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
        .withIndex("by_team_user", (q) => q.eq("teamId",args.teamId).eq("userId", user._id))
        .unique()

        if(member === null){
            throw new Error("You have no permission to view team's content")
        }

        const teamContent = await ctx.db
        .query("contents")
        .withIndex("by_team", (q) => q.eq("teamId", args.teamId))
        .order("desc")
        .paginate(args.paginationOpts)

        return { ...teamContent, page: await enrichContents(ctx, teamContent.page)}
    },
})

//Get topics form user
export const getUserContent = query({
    args: {
        userId: v.id("users"),
        paginationOpts: paginationOptsValidator
    },
    handler: async(ctx, args) => {

        const userContents = await ctx.db
        .query("contents")
        .withIndex("by_creator", (q) => q.eq("creatorId", args.userId))
        .order("desc")
        .paginate(args.paginationOpts)

        return { ...userContents, page: await enrichContents(ctx, userContents.page)}
    },
})

//enrich topics with team and creatorids (TODO: deal with tags)
async function enrichContents(ctx: QueryCtx, contents: Doc<"contents">[]){
    return await asyncMap(contents, (content) => enrichContent(ctx, content));
}

async function enrichContent(ctx: QueryCtx, content: Doc<"contents"> ){
    const user = await ctx.db.get(content.creatorId);
    const team = await ctx.db.get(content.teamId);
    const topic = await ctx.db.get(content.topicId); 
    return { ...topic, user, team, topic}
}
//Deal with this type later
export type Content = NonNullable<Awaited<ReturnType<typeof enrichContent>>>

//UPDATE
export const update = mutation({
    args: {
        contentId: v.id("contents"),
        data: v.object({
            name: v.optional(v.string()),
            description: v.optional(v.string()),
            attachments: v.optional(v.array(v.string())),
            tags: v.optional(v.array(v.id("tags")))
      })
    },
    handler: async (ctx, args) => {
        //Fetch content
        const content = await ctx.db.get(args.contentId);
        if(content === null ){
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
        .withIndex("by_team_user", (q) => q.eq("teamId",content.teamId).eq("userId", user._id))
        .unique()

        if(member === null){
            throw new Error("You have no permission to edit")
        }

        const edited = ctx.db.patch(
            args.contentId, {
                name: args.data?.name,
                description: args.data?.description,
                attachments: args.data?.attachments,
                tags: args.data?.tags
            }
        )

        return edited
    },
})


//DELETE
export const del = mutation({
    args: {
        contentId: v.id("contents"),
    },
    handler: async (ctx, args) => {
        //Fetch content
        const content = await ctx.db.get(args.contentId);
        if(content === null ){
            throw new Error("content does not exist")
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
        .withIndex("by_team_user", (q) => q.eq("teamId",content.teamId).eq("userId", user._id))
        .unique()

        if(member === null){
            throw new Error("You have no permission to edit")
        }

        return await ctx.db.delete(content._id)

    },

})