// fetching product, category from API
import { Product, Category } from "@/types";

// URL
const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";
const BACKUP_URL = "https://api.api-store.workers.dev/api/bazardor";

// function for fetching
async function fetchWithFallback(endpoint : string){
    try{
        const res = await fetch(`${BASE_URL}${endpoint}`,{
            cache : "no-store",
        });
        if(!res.ok) throw new Error(`Primary API failed: ${res.status}`);
        return await res.json();
    }catch(error){
        console.warn("Primary APi failed, trying backup....", error);
        const res = await fetch(`${BACKUP_URL}${endpoint}`,{
            cache : "no-store",
    });
    if(!res.ok) throw new Error(`Backup API also failed: ${res.status}`);
    return await res.json();
    }    
}

// fetching all products
export async function getAllProducts() : Promise<Product[]>{
  const data = await fetchWithFallback("/products");

  return data.products || data.data || data || [];
}

// fetching product according to category
export async function getProductsByCategory(categorySlug : string) : Promise<Product[]>{
  const data = await fetchWithFallback(`/products?category=${categorySlug}`);
  return data.products || data.data || data || [];
}

// get product data by id/slug
export async function getProductBySlug(slug : string) : Promise<Product | null> {
  try {
    const data = await fetchWithFallback(`/products/${slug}`);
    return data.product || data.data || data || null;
  }catch{
    return null;
  }
}

// fetch all category
export async function getAllCategories() : Promise<Category[]>{
  const data = await fetchWithFallback("/categories");
  return data.categories || data.data || data || [];
}

