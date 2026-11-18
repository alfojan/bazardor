import { getAllProducts } from "@/lib/api";
import ProductCard from "@/components/products/ProductCard";

export default async function PriceRisers() {
  let products = [];

  try {
    products = await getAllProducts();
  } catch {
    return null;
  }

  // Find products whose prices have increased
  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Section Heading */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <p className="text-sm font-semibold text-green-600">PRICE INCREASE</p>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
            📈 সবচেয়ে বেশি দাম বেড়েছে
          </h2>

          <p className="text-gray-500 mt-2">
            আজ যেসব পণ্যের দাম সবচেয়ে বেশি বেড়েছে।
          </p>
        </div>

        <span className="badge badge-success badge-outline">Top 6 Risers</span>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {risers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
