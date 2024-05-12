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


});