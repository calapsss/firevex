import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    //User Profiles
    users: defineTable({
        username: v.string(), //Username
        firstName: v.string(),
        lastName: v.string(),
        email: v.string(),
        role: v.string(), //Teacher or Student
        onboarded: v.optional(v.boolean()),
        bio: v.optional(v.string()),
        avatarUrl: v.optional(v.string()),
        tokenIdentifier: v.string(),
    })
    .index("by_Username", ["username"])
    .index("by_token", ["tokenIdentifier"]),

    //Team 
    teams: defineTable({
        creatorId: v.id("users"),
        name: v.string(),
        description: v.string(),
        visibility: v.string()
    })
    .index("by_name", ["name"])
    .index("by_creator", ["creatorId"])
    .index("by_visibility", ["visibility"]),

    //Member List
    members: defineTable({
        teamId: v.id("teams"),
        userId: v.id("users"),
        role: v.string()
    })
    .index("by_team", ["teamId"])
    .index("by_user", ["userId"])
    .index("by_team_role", ["teamId", "role"])
    .index("by_team_user", ["teamId", "userId"]),

    //Tags
    tags: defineTable({
        name: v.string()
    }),

    //Topic 
    topics: defineTable({
        teamId: v.id("teams"),
        creatorId: v.id("users"),
        name: v.string(),
        description: v.string(),
        tags: v.optional(v.id("tags"))
    })
    .index("by_team", ["teamId"])
    .index("by_creator", ["creatorId"])
    .index("by_team_creator", ["creatorId", "teamId"])
    .index("by_tag", ["tags"]),

    //Content
    contents: defineTable({
        teamId: v.id("teams"),
        topicId: v.id("topics"),
        creatorId: v.id("users"),
        name: v.string(),
        description: v.string(),
        attachments: v.optional(v.array(v.string())),
        tags: v.optional(v.array(v.id("tags")))
    })
    .index("by_team", ["teamId"])
    .index("by_creator", ["creatorId"])
    .index("by_team_creator", ["creatorId", "teamId"])
    .index("by_tag", ["tags"]),

})
