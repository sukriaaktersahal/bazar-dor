// category products file for sorting added\
"use client";

import {useState} from "react";
import {Product} from "@/types";
import ProductCard from "./ProductCard";

interface Props{
    initialProducts : Product[];
}

// category product function
export default function CategoryProducts({ initialProducts} : Props){
    const [sortBy, setSortBy] = useState("default");
    const sortedProducts = [...initialProducts].sort((a,b)=> {
        if(sortBy === "low-to-high"){
            return a.today - b.today;
        }
        if(sortBy === "high-to-low"){
            return b.today - a.today;
        }
        return 0;
    });

    return(
        <>
        {/* sorting dropdown */}
       <div className = "flex items-center justify-between mb-4">
        <p className ="text-sm text-gray-500">প্রতি ক্যাটাগরিতে {initialProducts.length}টি পণ্য দেখানো হচ্ছে</p>
           <div className = "flex items-center gap-2 text-sm">
            <span className = "text-gray-600 font-medium">সাজান:</span>
            <select value = {sortBy}
                    onChange = {(e)=> setSortBy(e.target.value)}
                    className = "border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer bg-white">
                    <option value = "default">ডিফল্ট</option>
                    <option value = "low-to-high">দাম: কম থেকে বেশি</option>
                    <option value = "high-to-low">দাম: বেশি থেকে কম</option>
            </select>
            </div>
        </div>

        {/* product grid */}
        <div className = "grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sortedProducts.map((product) =>(<ProductCard key={product.id} product={product} />))}
        </div>
    </>
    );
}


