import { Id } from "../_generated/dataModel";
import { query, mutation } from "../_generated/server";
import { v } from "convex/values";

//Adds a new user to the database.
export const createUser = mutation({
  // Defining the arguments we expect for this mutation
  args: {
    data: v.object({
        UserID: v.string(), //User ID from external
        Username: v.string(), //Username
        FirstName: v.string(),
        LastName: v.string(),
        Email: v.string(),
        Role: v.string(), //Teacher or Student
        Onboarded: v.boolean(),
        Bio: v.optional(v.string()),
        AvatarURL: v.optional(v.string()),
    })
  },
  // This handler executes when the mutation is called
  handler: async (ctx, args) => {
    // Checking if a user with the provided username already exists
    const existingUsername = await ctx.db
      .query("Users")
      .withIndex("by_Username", q => q.eq("Username", args.data.Username))
      .unique();

    // Checking if a user with the provided user_id already exists
    const existingUserId = await ctx.db
      .query("Users")
      .withIndex("by_UserID", q => q.eq("UserID", args.data.UserID))
      .unique();

    // Throwing an error if a user with the provided username already exists
    if (existingUsername) {
      throw new Error("Username already exists");
    }

    // Throwing an error if a user with the provided user_id already exists
    if (existingUserId) {
      throw new Error("User ID already exists");
    }

    // If the username and user_id are unique, we insert a new user in the database
    const userId = await ctx.db.insert("Users", args.data);
    // Returning the ID of the newly created user
    return userId;
  }
});
  
  //returns a user by their user_id
  export const getUser = query({
    args: { userId: v.optional(v.string()) },
    handler: async (ctx, args) => {
      if (!args.userId) {
        return null;
      }else{
        const users = await ctx.db
        .query("Users")
        .withIndex("by_UserID", q => q.eq("UserID", args.userId!))
        .collect();
  
      // `users` is an array because a query could return multiple results. 
      // If `user_id` is unique, we can just return the first element.
      return users[0];
      }
      
    }
  });

  //get user by their Convex ID
  export const getUserById = query({
    args: { userId: v.optional(v.id("Users")) },
    handler: async (ctx, args) => {
      if (!args.userId) {
        return null;
      }
      const user = await ctx.db.get(args.userId);
      return user;
    }
  });

  //Update user details
  export const updateUser = mutation({
    args: {
      UserID: v.string(),
      data: v.object({
        UserID: v.optional(v.string()), //User ID from external
        Username: v.optional(v.string()), //Username
        FirstName: v.optional(v.string()),
        LastName: v.optional(v.string()),
        Email: v.optional(v.string()),
        Role: v.optional(v.string()), //Teacher or Student
        Onboarded: v.optional(v.boolean()),
        Bio: v.optional(v.string()),
        AvatarURL: v.optional(v.string()),
      })
    },
    handler: async (ctx, args) => {
      // Fetch the user by its unique identifier
      const user = await ctx.db
        .query("Users")
        .withIndex("by_UserID", q => q.eq("UserID", args.UserID))
        .unique();
  
      // If the user does not exist, throw an error.
      if (!user) {
        throw new Error("User not found");
      }
  
      // If a new username is provided, check if it's unique
      if (args.data.Username && args.data.Username !== user.Username) {
        const existingUsername = await ctx.db
          .query("Users")
          .withIndex("by_Username", q => q.eq("Username", args.data.Username!))
          .unique();
  
        // If the username is already in use by any other user
        if (existingUsername && existingUsername._id !== user._id) {
          throw new Error("Username already in use");
        }
        
        await ctx.db.patch(user._id, { Username: args.data.Username });
      }
      
      // Avatar
      if (args.data.AvatarURL && args.data.AvatarURL !== '') {
        await ctx.db.patch(user._id, { AvatarURL: args.data.AvatarURL });
      }
  
      // Bio
      if (args.data.Bio && args.data.Bio !== '') {
        await ctx.db.patch(user._id, { Bio: args.data.Bio });
      }
  
      // First name
      if (args.data.FirstName && args.data.FirstName !== '') {
        await ctx.db.patch(user._id, { FirstName: args.data.FirstName });
      }
  
      // Last name
      if (args.data.LastName && args.data.LastName !== '') {
        await ctx.db.patch(user._id, { LastName: args.data.LastName });
      }
  
      // Onboarded
      if (args.data.Onboarded !== undefined) {
        await ctx.db.patch(user._id, { Onboarded: args.data.Onboarded });
      }
  
    }
  });
  
  //Delete a user by their user_id
  export const deleteUser = mutation({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
      // First, get the user's Convex ID using the user_id index
      const user = await ctx.db
        .query("Users")
        .withIndex("by_UserID", q => q.eq("UserID", args.userId))
        .unique();
  
      if (user) {
        // Then delete the user using delete() and the Convex ID
        await ctx.db.delete(user._id);
      } else {
        throw new Error("User not found");
      }
    }
  });

  
