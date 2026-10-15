// importing auth 
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// exporting get,port methods for nextjs api route
export const { GET, POST } = toNextJsHandler(auth.handler);

