import { Id } from "../_generated/dataModel";
import { query, mutation } from "../_generated/server";
import { v } from "convex/values";

//Adds a new user to the database.
export const createUser = mutation({
  // Defining the arguments we expect for this mutation
  args: {
    data: v.object({
        username: v.string(), //Username
        firstName: v.string(),
        lastName: v.string(),
        email: v.string(),
        role: v.string(), //Teacher or Student
        onboarded: v.boolean(),
        bio: v.optional(v.string()),
        avatarUrl: v.optional(v.string()),
    })
  },
  // This handler executes when the mutation is called
  handler: async (ctx, args) => {
    //Get User Identity
    const  identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("No authenticated User")
    }
    // Checking if a user with the provided username already exists
    const existingUsername = await ctx.db
      .query("users")
      .withIndex("by_Username", q => q.eq("username", args.data.username))
      .unique();
    if(existingUsername){
      throw new Error("Username already exists")
    }
    //Check if identity was stored before
    const user  = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();
      
    if (user == null){
      // If the username and user_id are unique, we insert a new user in the database
      // Messy code will fix sune
      return await ctx.db.insert("users", { 
        ... args.data,
        tokenIdentifier: identity.tokenIdentifier }
      );
    } else{
      throw new Error("User already onboarded");
    }
  }
});
  
//returns a user by their identity
export const getUser = query({
  args: {},
  handler: async (ctx) => {
     //Get User Identity
    const  identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null
    }

    //Get user info
    const user  = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    if (user != null){
      return user
    }
    else{
      return null
    }
   
  },
});


  //Update user details
  export const updateUser = mutation({
    args: {
      data: v.object({
        username: v.string(), //Username
        firstName: v.optional(v.string()),
        lastName: v.optional(v.string()),
        email: v.optional(v.string()),
        role: v.optional(v.string()), //Teacher or Student
        onboarded: v.optional(v.boolean()),
        bio: v.optional(v.string()),
        avatarUrl: v.optional(v.string()),
      })
    },
    handler: async (ctx, args) => {
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

      

      // Checking if a user with the provided username already exists
      const existingUsername = await ctx.db
        .query("users")
        .withIndex("by_Username", q => q.eq("username", args.data.username))
        .unique();
        if(existingUsername && args.data.username != user?.username){
          throw new Error("Username already exists")
        }

      
      if(args.data.username == ""){
        throw new Error("Username can't be empty")
      }

      if (user != null){
        // If the username and user_id are unique, we insert a new user in the database
        // Messy code will fix sune
        return await ctx.db.patch(user._id, { ... args.data} );
      } else{
        throw new Error("You are not yet onboarded");
      }
      
    }
  });
  
  //Delete a user
  export const deleteUser = mutation({
    handler: async (ctx) => {
      const  identity = await ctx.auth.getUserIdentity();
      if (!identity) {
        throw new Error("No authenticated User")
      }
      //Check if identity was stored before
      const user  = await ctx.db
        .query("users")
        .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
        .unique();
  
      if (user) {
        // Then delete the user using delete() and the Convex ID
        await ctx.db.delete(user._id);
      } else {
        throw new Error("User not found");
      }
    }
  });

  
