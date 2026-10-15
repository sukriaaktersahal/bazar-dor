// price ticker component
"use client";

import {useEffect, useState} from "react";
import {Product} from "@/types";
import {getAllProducts} from "@/lib/api";
import {toBengaliNumber, formatChange, getChangeType} from "@/lib/format";

// priceticker function
export default function PriceTicker(){
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() =>{
        async function load(){
            const data = await getAllProducts();
            setProducts(data.slice(0, 15));
            }
        load();
},[]);
if(products.length === 0) return null;
const tickerItems = [...products, ...products];

return(
    <div className = "bg-white border-b border-gray-200 overflow-hidden">
    <div className = "flex animate-marquee whitespace-nowrap py-1.5">
        {tickerItems.map((product, idx) =>{
            const changeType = getChangeType(product.change);
            const changeColor = changeType === "up" ? "text-red-600" : changeType === "down" ? "text-green-600" : "text-gray-500";

            return(
                <div key = {`${product.id}-${idx}`}
                     className="inline-flex items-center gap-1.5 px-4 text-sm border-r border-gray-200">
                        <span>{product.emoji}</span>
                        <span className = "font-medium text-gray-700">{product.name}</span>
                        <span className = "text-gray-500 text-500 text-xs">{product.unit}</span>
                        <span className = "font-semibold text-gray-900">{toBengaliNumber(product.currentPrice)} টাকা </span>
                        <span className = {`text-xs font-medium ${changeColor}`}>{formatChange(product.change)}</span>
                    </div>
            );

        })}
        </div>
    </div>
);
}
            