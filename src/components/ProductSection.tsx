// product section for bazardor 

import {Product} from "@/types"
import ProductCard from "./ProductCard";

interface Props{
    title : string;
    subtitle? : string;
    products : Product[];
    id? : string;
}

// ProductSection function
export default function ProductSection({title, subtitle, products, id} : Props){
    if(products.length === 0) return null;

    return(
        <section id = {id} className = "mb-10">
            <div className = "mb-4">
                <h2 className = "text-xl md:text-2xl font-bold text-gray-900">{title}</h2>
                {subtitle && ( <p className="text-sm text-gray-500 mt-1">{subtitle}</p> )}
            </div>

            <div className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (<ProductCard key={product.id} product={product} />))}
            </div>
        </section>
    );
}


