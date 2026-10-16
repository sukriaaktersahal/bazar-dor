// user menu file with navbar updated
"use client";

import {useState, useRef, useEffect} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

// user menu function
export default function UserMenu(){
  const { data: session, isPending }= useSession();
  const [open, setOpen] = useState(false);
  const menuRef =useRef<HTMLDivElement>(null);
  const router= useRouter();


  useEffect(()=> {
    function handleClick(e: MouseEvent){
      if(menuRef.current && !menuRef.current.contains(e.target as Node)){
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return ()=> document.removeEventListener("mousedown", handleClick);
  }, []);

  // loading skeleton
  if (isPending){
    return (<div className="w-24 h-9 bg-gray-200 rounded-md animate-pulse"></div>);
  }

  //  sign in/ up while there is no session
  if(!session){
    return(
      <div className ="flex items-center gap-2">
        <Link href = "/signin" className="text-sm font-medium text-gray-700 hover:text-green-700 px-3 py-1.5">সাইন ইন</Link>
        <Link href ="/signup" className ="text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-4 py-1.5 rounded-md transition-colors">সাইন আপ</Link>
      </div>
    );
  }

  // avatar, dropdown if session is on
  const user = session.user;
  const initial =(user.name || user.email || "U").charAt(0).toUpperCase();

  async function handleSignOut(){
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  return(
    <div className ="relative" ref = {menuRef}>
      <button onClick = {()=> setOpen(!open)} className ="flex items-center gap-2 hover:bg-gray-100 rounded-md px-2 py-1 transition-colors">
        <div className ="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-semibold">{initial}</div>
            <span className ="text-sm font-medium text-gray-700 hidden sm:inline">{user.name?.split(" ")[0] || "ব্যবহারকারী"}</span>
        <svg className = {`w-4 h-4 text-gray-500 transition-transform ${ 
            open ? "rotate-180" : "" }`} fill="none" stroke ="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap ="round"
            strokeLinejoin ="round"
            strokeWidth ={2}
            d ="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      {/* dropdown */}
      {open &&(
        <div className ="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden z-50">
          <div className = "px-4 py-3 border-b border-gray-100">
            <p className ="text-sm font-medium text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>

          <Link href = "/profile" className ="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick ={()=> setOpen(false)}> আমার প্রোফাইল</Link>

          <button onClick = {handleSignOut} className ="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"> সাইন আউট</button>
        </div>
      )}
    </div>
  );
}
