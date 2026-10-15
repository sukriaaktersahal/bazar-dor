// importing betterauth, MongoClient 
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";

// mongodb connection setup
const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db(process.env.MONGODB_DB || "bazardor");

// betterAuth configuration setup
export const auth = betterAuth({
  database : {
    db : db,
    type : "mongodb",
  },
  emailAndPassword : {
    enabled : true,
  },
  secret : process.env.BETTER_AUTH_SECRET!,
  baseURL : process.env.BETTER_AUTH_URL!,
});