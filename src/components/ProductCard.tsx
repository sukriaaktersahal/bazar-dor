// component for product card
"use client";

import Link from "next/link";
import {Product, unitToBengali} from "@/types";
import { toBengaliNumber, formatChange , getChangeColor} from "@/lib/format";

interface Props{
    product : Product;
}

export default function ProductCard({product} : Props){
    return(
        <Link href = {`/product/${product.slug}`}>
            <div className = "group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-green-300 transition-all cursor-pointer h-full">

                {/* upper part */}
                <div className = "flex items-start gap-3 mb-3">
                    <div className = "w-12 h-12 flex items-center justify-center text-3xl bg-gray-50 rounded-full flex-shrink-0">{product.image}</div>
                    <div className = "flex-1 min-w-0">
                        <h3 className = "font-semibold text-gray-900 truncate group-hover:text-green-700 transition-colors">{product.nameBn}</h3>
                        <p className = "text-xs text-gray-500 mt-0.5">{unitToBengali(product.unit)}</p>
                </div>
            </div>

            {/* lower part */}
            <div className = "flex items-end justify-between pt-2 border-t border-gray-100">
                <div>
                    <p className = "text-xs text-gray-500 mb-0.5">আজকের দাম</p>
                    <p className = "text-lg font-bold text-gray-900">{toBengaliNumber(product.today)}{" "}
                        <span className="text-sm font-medium">টাকা</span></p>
                </div>
                <span className = {`text-xs font-semibold px-2 py-1 rounded ${getChangeColor(product.change.dir)}`}>
                    {formatChange(product.change.pct, product.change.dir)}
                </span>
            </div>
          </div>
        </Link>
    );
}
    

        