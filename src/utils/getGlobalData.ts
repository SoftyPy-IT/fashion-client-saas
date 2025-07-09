import { IStorefront } from "@/types/storefront.types";

const productionURL = process.env.NEXT_PUBLIC_API_URL;
const developmentURL = process.env.NEXT_PUBLIC_API_URL;
const mode = process.env.NEXT_PUBLIC_NODE_ENV;
const API_BASE = mode === "production" ? productionURL : developmentURL;

// Add caching options for Next.js data fetching
const fetchOptions = {
  next: {
    revalidate: 3600, // Revalidate every hour
  },
  headers: {
    "Content-Type": "application/json",
  },
};

export async function getGlobalData(): Promise<IStorefront | null> {
  try {
    const response = await fetch(`${API_BASE}/storefront/all`, fetchOptions);

    if (!response.ok) {
      throw new Error(`Failed to fetch global data: ${response.status}`);
    }

    const data = await response.json();
    return data.data as IStorefront;
  } catch (error) {
    console.error("Error fetching global data:", error);
    return null;
  }
}

export async function getProducts(slug: string) {
  try {
    if (!slug) {
      return null;
    }

    // Consider using a more efficient endpoint if available
    // Ideally, you'd have an endpoint like /product/by-slug/{slug}
    const response = await fetch(`${API_BASE}/product/all`, fetchOptions);

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const data = await response.json();

    // Handle case when data.data might not be an array
    if (!Array.isArray(data.data)) {
      console.error("Expected array in product data, got:", typeof data.data);
      return null;
    }

    const product = data.data.find(
      (prod: any) => prod._id === slug || prod.slug === slug,
    );

    return product || null; // Explicitly return null when not found
  } catch (error) {
    console.error(`Error fetching product ${slug}:`, error);
    return null;
  }
}

export async function getCategory(id: string) {
  try {
    const response = await fetch(
      `${API_BASE}/category/categories`,
      fetchOptions,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }

    const data = await response.json();
    const category = data.data.find(
      (cat: any) => cat._id === id || cat.slug === id,
    );

    return category || null;
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error);
    return null;
  }
}

export async function getBlog(id: string) {
  try {
    const response = await fetch(`${API_BASE}/blog/${id}`, fetchOptions);

    if (!response.ok) {
      throw new Error(`Failed to fetch blog: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching blog ${id}:`, error);
    return null;
  }
}
