// profile update page
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

// profile page update function
export default function ProfileUpdatePage(){
    const { data : session, isPending } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState(session?.user?.name || "");
    // setting initial value
    useEffect(()=> {
    if(!isPending && !session) {router.push("/signin?redirect=/profile/update");}
    }, [session, isPending, router]);

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        if(!name.trim()){
            toast.error("নাম খালি রাখা যাবে না");
            return;
        }

        setLoading(true);
        const {error} = await authClient.updateUser({
        name : name.trim(),
        });
        setLoading(false);

        if(error){
            toast.error(error.message || "আপডেট ব্যর্থ হয়েছে");
            return;
        }

        toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
        setTimeout(() => router.push("/profile"), 800);
  }

    if(isPending){
        return(
            <main className = "max-w-lg mx-auto px-4 py-12">
                <div className = "h-8 bg-gray-200 rounded w-48 animate-pulse mb-6"></div>
                <div className = "bg-white border border-gray-200 rounded-lg p-6">
                <div className ="h-10 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className ="h-10 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </main>
        );
    }
    if(!session) return null;

    return(
        <main className = "max-w-lg mx-auto px-4 py-12">
            {/* breadcrumb */}
            <nav className = "text-sm text-gray-500 mb-4">
                <Link href = "/profile" className = "hover:text-green-700"> প্রোফাইল </Link>
                <span className = "mx-2">/</span>
                <span className = "text-gray-900">আপডেট</span>
            </nav>

            <h1 className = "text-2xl font-bold text-gray-900 mb-1">তথ্য আপডেট করুন</h1>
            <p className = "text-sm text-gray-500 mb-6">আপনার নাম পরিবর্তন করুন</p>

            <div className = "bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <form onSubmit = {handleSubmit} className = "space-y-4">
                    <div>
                        <label className = "block text-sm font-medium text-gray-700 mb-1">নাম</label>
                        <input  type = "text"
                                value = {name}
                                onChange = {(e)=> setName(e.target.value)}
                                placeholder = "আপনার নাম"
                                className = "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"/>
                    </div>

                    <div className = "flex gap-3 pt-2">
                        <button type = "submit"
                                disabled = {loading} className = "flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-2.5 rounded-md transition-colors">
                                {loading ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
                        </button>
                        <Link href = "/profile" className = "px-5 py-2.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">বাতিল</Link>
                    </div>
                </form>
            </div>
        </main>
    );

}
