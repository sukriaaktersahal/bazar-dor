// importing betterauth, MongoClient 
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// mongodb connection setup
const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db(process.env.MONGODB_DB || "bazardor");

// betterAuth configuration setup
export const auth = betterAuth({
  database : mongodbAdapter(db,{client,}), emailAndPassword :{enabled : true,},

//   social providers
socialProviders:{
    google:{
        clientId : process.env.GOOGLE_CLIENT_ID!,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET!,
        },
},

// account linking
account:{
    accountLinking:{
        enabled : true,
        trustedProviders : ["google"],
    },
},

  secret : process.env.BETTER_AUTH_SECRET!,
  baseURL : process.env.BETTER_AUTH_URL!,
});