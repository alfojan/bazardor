
import { Product } from "@/types/product";

const API_BASE_URLS = [
    process.env.MAIN_API_URL,
    process.env.BASE_URL_1,
    process.env.BASE_URL_2,
].filter((url): url is string => Boolean(url));

async function fetchFromApi<T>(endpoint: string): Promise<T> {
    for (const baseUrl of API_BASE_URLS) {
        try {
            const response = await fetch(`${baseUrl}${endpoint}`, {
                next: { revalidate: 300 },
            });

            if (!response.ok) {
                continue;
            }

            return (await response.json()) as T;
        } catch {
            continue;
        }
    }

    throw new Error("সব API থেকে ডেটা লোড করা যায়নি।");
}

export async function getAllProducts(): Promise<Product[]> {
    return fetchFromApi<Product[]>("/products");
}

export async function getProductsByCategory(
    category: string
): Promise<Product[]> {
    return fetchFromApi<Product[]>(
        `/products?category=${encodeURIComponent(category)}`
    );
}

export async function getProductById(
    id: number
): Promise<Product> {
    return fetchFromApi<Product>(`/products/${id}`);
}
