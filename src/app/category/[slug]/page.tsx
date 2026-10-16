// category page
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductsByCategory, getAllCategories } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

interface Props{
    params : Promise<{ slug :string}>;
}

export default async function CategoryPage({ params } : Props){
    const { slug } = await params;
    const categories = await getAllCategories();
    const category = categories.find((c) => c.slug === slug);

    // while slug is invalid
    if(!category){
        notFound();
    }
    const products = await getProductsByCategory(slug);

    return(
        <main className = "max-w-6xl mx-auto px-4 py-8">
            {/* breadcrumb */}
            <nav className = "text-sm text-gray-500 mb-4">
                <Link href = "/" className = "hover:text-green-700"> হোম </Link>
                <span className = "mx-2"> / </span>
                <span className = "text-gray-900"> {category.name} </span>
            </nav>

            {/* header */}
            <div className = "flex items-center gap-3 mb-6">
                <div className = "w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-3xl">{category.icon}</div>
                <div>
                    <h1 className = "text-2xl font-bold text-gray-900">{category.name}</h1>
                    <p className = "text-sm text-gray-500">এই ক্যাটাগরির সব পণ্যের আজকের দাম</p>
                </div>
            </div>

            {/* grid */}
            {products.length === 0?(
                <div className = "text-center py-16 bg-gray-50 rounded-lg">
                    <p className = "text-4xl mb-3"> 🛒 </p>
                    <p className = "text-gray-600 mb-4">এই ক্যাটাগরিতে কোনো পণ্য নেই</p>
                    <Link href = "/" className = "inline-block bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md text-sm">হোম পেজে ফিরে যান</Link>
                </div>
            ):(
                <div className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">{products.map((product) => (<ProductCard key = {product.id} product={product} />))}</div>
            )}
        </main>
    );
}


