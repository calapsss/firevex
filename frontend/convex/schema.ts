import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    //User Profiles
    Users: defineTable({
        UserID: v.string(), //User ID from external
        Username: v.string(), //Username
        FirstName: v.string(),
        LastName: v.string(),
        Email: v.string(),
        Role: v.string(), //Teacher or Student
        Onboarded: v.optional(v.boolean()),
        Bio: v.optional(v.string()),
        AvatarURL: v.optional(v.string()),
    }).index("by_UserID", ["UserID"])
    .index("by_Username", ["Username"]),


});