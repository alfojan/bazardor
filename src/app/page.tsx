import { Suspense } from "react";

import Hero from "@/components/home/Hero";
import PriceRisers from "@/components/home/PriceRisers";
import PriceFallers from "@/components/home/PriceFallers";
import ProductGrid from "@/components/products/ProductGrid";

function ProductGridSkeleton() {
  return (
    <section className="max-w-7xl mx-auto px-4 pb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse"
          >
            <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-7 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />

      <PriceRisers />

      <PriceFallers />

      <section id="সব-পণ্য" className="max-w-7xl mx-auto px-4 pt-16">
        <h2 className="text-3xl font-bold text-gray-900">সব পণ্য</h2>

        <p className="mt-2 mb-8 text-gray-600">
          নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর দেখুন।
        </p>
      </section>

      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGrid />
      </Suspense>
    </>
  );
}
