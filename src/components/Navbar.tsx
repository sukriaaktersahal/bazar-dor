// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllCategories } from "@/lib/api";
import { Category } from "@/types";
import UserMenu from "./UserMenu";

// navbar function
export default function Navbar(){
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(()=> {
    async function load(){
      try{
        const data = await getAllCategories();
        setCategories(data);
      }catch(err){
        console.error("Category load failed:", err);
      }
    }
    load();
  }, []);

  const today = new Date();
  const banglaDate = today.toLocaleDateString("bn-BD",{
    year : "numeric",
    month : "long",
    day : "numeric",
  });

  return(
    <header className ="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className ="max-w-6xl mx-auto px-4">
        {/* top row, logo with user menu */}
        <div className ="flex items-center justify-between py-3">
          <Link href  = "/" className = "flex items-center gap-2">
            <div className = "w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white text-xl">🛒</div>
            <div className ="flex flex-col leading-tight">
              <span className="text-lg font-bold text-green-700"> বাজার দর</span>
              <span className="text-xs text-gray-500">{banglaDate}</span>
            </div>
          </Link>

          <UserMenu />
        </div>

        {/* categories row */}
        <nav className ="flex items-center gap-1 overflow-x-auto no-scrollbar pb-2">
          <Link href ="/" className = {`text-sm px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
              pathname === "/"? "bg-green-600 text-white font-medium": "text-gray-700 hover:bg-gray-100" }`}> হোম</Link>
          {categories.map((cat) =>{
            const isActive = pathname === `/category/${cat.slug}`;
            return(
              <Link key = {cat.id} href = {`/category/${cat.slug}`}
                className = {`text-sm px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
                  isActive? "bg-green-600 text-white font-medium" : "text-gray-700 hover:bg-gray-100"}`} >{cat.name}</Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}