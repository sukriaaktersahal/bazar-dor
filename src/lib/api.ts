// fetching product, category from API
import { Product, Category } from "@/types";

// URL
const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";
const BACKUP_URL = "https://api.api-store.workers.dev/api/bazardor";

// function for fetching
async function fetchWithFallback(endpoint : string){
    try{
        const res = await fetch(`${BASE_URL}${endpoint}`, {cache : "no-store", });
        if(!res.ok) throw new Error(`Primary API failed : ${res.status}`);
        return await res.json();
    }catch(err){
        console.warn("Falling back to backup API...", err);
        const res = await fetch(`${BACKUP_URL}${endpoint}`, {cache : "no-store",});
        if(!res.ok) throw new Error(`Backup failed: ${res.status}`);
        return await res.json();
    }    
}

// fetching all products
export async function getAllProducts() : Promise<Product[]>{
  const data = await fetchWithFallback("/products");
  if(Array.isArray(data)) return data;
  return data.products || data.data || [];
}

// fetching product according to category
export async function getProductsByCategory(slug : string) : Promise<Product[]>{
  const data = await fetchWithFallback(`/products?category=${slug}`);
  if(Array.isArray(data)) return data;
  return data.products || data.data || [];
}

// get product data by id/slug
export async function getProductBySlug(slug : string) : Promise<Product | null> {
  try{
    const allProducts = await getAllProducts();
    const found = allProducts.find((p)=> p.slug === slug);
    return found || null;
  }catch{
    return null;
  }
}

// interface raw category
interface RawCategory{
  id : string;
  slug : string;
  nameBn? : string;
  name? : string;
  icon? : string;
  image? : string;
}
// fetch all category
export async function getAllCategories(): Promise<Category[]>{
  const data = await fetchWithFallback("/categories");
  const raw : RawCategory[] = Array.isArray(data)? data : data.categories || data.data || [];

  return raw.map((c)=> ({
    id : c.id,
    slug : c.slug,
    name : c.nameBn || c.name ||c.slug,
    icon : c.icon || c.image || "🛒",
  }));
}

