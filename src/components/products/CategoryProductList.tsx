"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

type CategoryProductListProps = {
  products: Product[];
};

export default function CategoryProductList({
  products,
}: CategoryProductListProps) {
  const [sortOrder, setSortOrder] = useState("default");

  const sortedProducts = [...products];

  if (sortOrder === "low-to-high") {
    sortedProducts.sort((a, b) => Number(a.today) - Number(b.today));
  } else if (sortOrder === "high-to-low") {
    sortedProducts.sort((a, b) => Number(b.today) - Number(a.today));
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <p className="text-gray-600">
          মোট {products.length} টি পণ্য পাওয়া গেছে
        </p>

        <div className="flex items-center gap-2">
          <label
            htmlFor="price-sort"
            className="text-sm font-medium text-gray-700"
          >
            সাজান:
          </label>

          <div className="relative">
            <select
              id="price-sort"
              className="appearance-none select select-bordered select-sm bg-white text-gray-700 pr-9"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
            >
              <option value="default">ডিফল্ট</option>
              <option value="low-to-high">দাম: কম থেকে বেশি</option>
              <option value="high-to-low">দাম: বেশি থেকে কম</option>
            </select>

            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              ▼
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
