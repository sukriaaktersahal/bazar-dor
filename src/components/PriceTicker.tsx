// price ticker component
"use client";

import {useEffect, useState} from "react";
import {Product, unitToBengali} from "@/types";
import {getAllProducts} from "@/lib/api";
import {toBengaliNumber, formatChange, getChangeColor} from "@/lib/format";

// priceticker function
export default function PriceTicker(){
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() =>{
        async function load(){
            try{
            const data = await getAllProducts();
            setProducts(data.slice(0, 15));
            }catch(err){
                console.error("Price ticker data load failed:", err);
            }
        }
        load();
},[]);

if(products.length === 0) return null;
const items = [...products, ...products];

return(
    <div className = "bg-white border-b border-gray-200 overflow-hidden">
    <div className = "flex animate-marquee whitespace-nowrap py-1.5">
        {items.map((p, idx) =>(
                <div key = {`${p.id}-${idx}`}
                     className="inline-flex items-center gap-1.5 px-4 text-sm border-r border-gray-200">
                        <span>{p.image}</span>
                        <span className = "font-medium text-gray-700">{p.nameBn}</span>
                        <span className = "text-gray-500 text-500 text-xs">{unitToBengali(p.unit)}</span>
                        <span className = "font-semibold text-gray-900">{toBengaliNumber(p.today)} টাকা </span>
                        <span className = {`text-xs font-medium px-1.5 py-0.5 rounded ${getChangeColor(p.change.dir)}`}>{formatChange(p.change.pct, p.change.dir)}</span>
                    </div>
                ))}
        </div>
    </div>
  );
}
            