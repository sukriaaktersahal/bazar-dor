// profile page
"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {useSession } from "@/lib/auth-client";
import { toBengaliNumber } from "@/lib/format";

// profile page function
export default function ProfilePage(){
    const {data : session, isPending} = useSession();
    const router = useRouter();

    // if no session
    useEffect(()=> { if (!isPending && !session){
      router.push("/signin?redirect=/profile");}}, [session, isPending, router]);

    // loading state
    if(isPending){
         return (
            <main className = "max-w-3xl mx-auto px-4 py-12">
                <div className = "w-48 h-8 bg-gray-200 rounded animate-pulse mb-6"></div>
                <div className ="bg-white border border-gray-200 rounded-lg p-6">
                <div className = "flex items-center gap-4">
                    <div className = "w-16 h-16 bg-gray-200 rounded-full"></div>
                    <div className = "flex-1">
                    <div className = "h-5 bg-gray-200 rounded w-40 mb-2"></div>
                    <div className = "h-4 bg-gray-200 rounded w-56"></div>
                    </div>
                </div>
                </div>
            </main>
            );
        }
    
    if(!session) return null;
    const user = session.user;
    const initial =(user.name || user.email || "U").charAt(0).toUpperCase();

    return(
        <main className = "max-w-3xl mx-auto px-4 py-12">

            {/* header */}
            <div className = "mb-8">
                <h1 className = "text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
                <p className = "text-sm text-gray-500 mt-1"> আপনার অ্যাকাউন্টের তথ্য দেখুন ও সম্পাদনা করুন</p>
            </div>

            {/* profile card */}
            <div className ="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
                <div className ="flex items-center gap-4">
                    <div className = "w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-bold">{initial}</div>
                    <div className = "flex-1">
                        <h2 className = "text-lg font-semibold text-gray-900">{user.name || "নাম নেই"}</h2>
                        <p className = "text-sm text-gray-500">{user.email}</p>
                    </div>
                    <Link href ="/profile/update" className ="text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md transition-colors">আপডেট করুন</Link>
                </div>
            </div>

            {/* account info card */}
            <div className ="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className = "font-semibold text-gray-900 mb-4">অ্যাকাউন্ট তথ্য</h3>
                <div className = "space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-500">ইউজার আইডি</span>
                        <span className="text-sm text-gray-900 font-mono truncate max-w-xs">{user.id}</span>
                    </div>

                    <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-500">ইমেইল ভেরিফাইড</span>
                        <span className="text-sm text-gray-900">{user.emailVerified ? "হ্যাঁ" : "না"}</span>
                    </div>

                    <div className="flex justify-between py-2">
                        <span className="text-sm text-gray-500">অ্যাকাউন্ট তৈরি</span>
                        <span className="text-sm text-gray-900">{user.createdAt? new Date(user.createdAt).toLocaleDateString("bn-BD",{ year: "numeric", month: "long", day: "numeric",}): "—"} </span>
                    </div>
                </div>
            </div>
        </main>
    );
}

 