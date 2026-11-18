import { getAllProducts } from "@/lib/api";
import { formatPrice, formatPercentage } from "@/lib/utils";

export default async function PriceTicker() {
  let products = [];

  try {
    products = await getAllProducts();
  } catch {
    return null;
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden bg-green-950 text-white py-3">
      <div className="ticker-track flex w-max">
        {[...products, ...products].map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="flex items-center gap-3 px-6 whitespace-nowrap"
          >
            <span>{product.image}</span>

            <span className="font-medium">{product.nameBn}</span>

            <span className="text-green-300">
              {formatPrice(product.today)}/{product.unit}
            </span>

            <span
              className={
                product.change.dir === "up"
                  ? "text-red-300"
                  : product.change.dir === "down"
                    ? "text-green-300"
                    : "text-gray-300"
              }
            >
              {product.change.dir === "up"
                ? "▲"
                : product.change.dir === "down"
                  ? "▼"
                  : "—"}{" "}
              {formatPercentage(product.change.pct)}
            </span>

            <span className="text-green-700">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
