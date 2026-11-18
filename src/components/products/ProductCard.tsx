import Link from "next/link";
import { Product } from "@/types/product";
import { formatPrice, formatPercentage } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="card bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-green-300 transition"
    >
      <div className="card-body p-5">
        {/* Product Image and Information */}
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 bg-[#e5e7eb] rounded-xl flex items-center justify-center shrink-0">
            <span className="text-3xl">{product.image}</span>
          </div>

          <div className="min-w-0">
            <h3 className="text-lg font-bold text-gray-800">
              {product.nameBn}
            </h3>

            <p className="text-sm text-gray-500 mt-1">প্রতি {product.unit}</p>
          </div>
        </div>

        {/* Today's Price and Price Change */}
        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">আজকের দাম</p>

            <span className="text-xl font-bold text-gray-900">
              {formatPrice(product.today)}
            </span>
          </div>

          <span
            className={`badge badge-outline ${
              product.change.dir === "up"
                ? "badge-error"
                : product.change.dir === "down"
                  ? "badge-success"
                  : "badge-neutral"
            }`}
          >
            {product.change.dir === "up"
              ? "▲"
              : product.change.dir === "down"
                ? "▼"
                : "—"}{" "}
            {formatPercentage(product.change.pct)}
          </span>
        </div>

        <div className="text-right">
          <span className="text-sm text-green-600 font-medium">
            বিস্তারিত দেখুন →
          </span>
        </div>
      </div>
    </Link>
  );
}
