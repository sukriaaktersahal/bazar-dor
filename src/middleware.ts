// middleware.ts file for protected route
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// middleware function
export async function middleware(request : NextRequest){
    const {pathname} = request.nextUrl;
    if(pathname.startsWith("/product/")){
        const sessionCookie = getSessionCookie(request);
        if(!sessionCookie){
            const signInUrl =new URL("/signin", request.url);
            signInUrl.searchParams.set("redirect", pathname);
            return NextResponse.redirect(signInUrl);
        }
    }
    return NextResponse.next();
}

// middleware path
export const config ={matcher: ["/product/:path*"],};


