// profile page
"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useSession, signOut, authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

// profile page function
export default function ProfilePage(){
    const {data : session, isPending} = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(session?.user?.name || "");

    // if no session
    useEffect(()=> { if(!isPending && !session){
      router.push("/signin?redirect=/profile");
    }
    
    if(session?.user?.name) {
      setName(session.user.name);
    }
    }, [session, isPending, router]);

    // update handler
    async function handleUpdate(e: React.FormEvent){
        e.preventDefault();
        if(!name.trim()){
            toast.error("নাম খালি রাখা যাবে না");
            return;
        }
        setLoading(true);
        const { error } = await authClient.updateUser({ name: name.trim() });
        setLoading(false);

        if(error){
        toast.error(error.message || "আপডেট ব্যর্থ হয়েছে");
        return;
        }

        toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
    }

    // sign out handler
    async function handleSignOut(){
        await signOut();
        toast.success("সফলভাবে সাইন আউট হয়েছে");
        router.push("/");
        router.refresh();
        
    }

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
            <div className ="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6 flex items-center justify-between gap-4">
                <div className ="flex items-center gap-4">
                    <div className = "w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-bold">{initial}</div>
                    <div>
                        <h2 className = "text-lg font-bold text-gray-900">{user.name || "নাম নেই"}</h2>
                        <p className = "text-sm text-gray-500">{user.email}</p>
                    </div>
                </div>
            

            {/* signout button */}
            <button onClick = {handleSignOut}
                    className = "border border-red-200 text-red-600 hover:bg-red-50 text-sm font-medium px-4 py-2 rounded-md transition-colors flex items-center gap-2">
                    <span>↪</span> সাইন আউট
            </button>
            </div>

            {/*  */}

            {/* account info card */}
            <div className = "bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className = "font-semibold text-gray-900 mb-4">তথ্য আপডেট করুন</h3>
                <form onSubmit = {handleUpdate} className = "space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">নাম</label>
                        <input  type = "text"
                                value = {name}
                                onChange = {(e)=> setName(e.target.value)}
                                placeholder = "আপনার নাম"
                                className = "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"/>
                        
                    </div>
                    
                    <button type = "submit"
                            disabled = {loading}
                            className = "w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-2.5 rounded-md transition-colors">
                            {loading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
                    </button>
                </form>
            </div>
    </main>
  );
}