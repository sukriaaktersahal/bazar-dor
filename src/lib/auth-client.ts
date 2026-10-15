// for client side
"use client";

import { createAuthClient } from "better-auth/react";

// auth client base url setup
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});

// exporting necessary function
export const {
  signIn,      
  signUp,      
  signOut,     
  useSession,  
} = authClient;
