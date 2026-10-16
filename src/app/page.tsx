// updated page.tsx file
import HeroSection from "@/components/HeroSection";
import ProductSection from "@/components/ProductSection";
import { getAllProducts } from "@/lib/api";
import { Product } from "@/types";

export default async function Home(){
  let products : Product[] = [];

  try{
    products = await getAllProducts();
  }catch(err){
    console.error("Failed to load products : ", err);
  }

  // price up
  const risers = [...products]
  .filter((p) => p.change.dir === "up")
  .sort((a, b) => b.change.pct - a.change.pct)
  .slice(0, 6);

  // price down
  const fallers = [...products]
  .filter((p) => p.change.dir === "down")
  .sort((a, b) => a.change.pct - b.change.pct)
  .slice(0, 6);

  return(
    <main>
      <HeroSection/>
      <div className = "max-w-6xl mx-auto px-4 py-8">

        {/* today price up */}
        <ProductSection title = "আজ দাম বেড়েছে ▲"
                        subtitle = "যে পণ্যগুলোর দাম আজ সবচেয়ে বেশি বেড়েছে"
                        products = {risers}/>

        {/* today price down */}
        <ProductSection title = "আজ দাম কমেছে ▼"
                        subtitle = "যে পণ্যগুলোর দাম আজ সবচেয়ে বেশি কমেছে "
                        products = {fallers}/>
        {/* all products */}
        <ProductSection id = "সব-পণ্য"
                        title = "সব-পণ্য"
                        subtitle = "সব ক্যাটাগরির সব পণ্যের আজকের দাম "
                        products = {products}/>
      </div>
    </main>
  );
}
