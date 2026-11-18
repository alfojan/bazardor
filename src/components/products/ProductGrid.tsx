import { getAllProducts } from "@/lib/api";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

export default async function ProductGrid() {
  let products: Product[] = [];

  try {
    products = await getAllProducts();
  } catch (error) {
    console.error("Products loading error:", error);

    return (
      <p className="text-center text-red-500 py-10">
        পণ্যের তথ্য লোড করা যায়নি। পরে আবার চেষ্টা করুন।
      </p>
    );
  }

  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500 py-10">কোনো পণ্য পাওয়া যায়নি।</p>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 pb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
