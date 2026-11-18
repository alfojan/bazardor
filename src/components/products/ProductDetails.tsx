import { Product } from "@/types/product";
import { formatPrice, formatPercentage } from "@/lib/utils";

type ProductDetailsProps = {
  product: Product;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const marketPrices = product.markets.flatMap((market) => [
    market.min,
    market.max,
  ]);

  const marketSummary =
    marketPrices.length === 0
      ? null
      : {
          min: Math.min(...product.markets.map((market) => market.min)),
          max: Math.max(...product.markets.map((market) => market.max)),
          average:
            marketPrices.reduce((total, price) => total + price, 0) /
            marketPrices.length,
        };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 space-y-8">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-green-600 font-semibold">
              {product.categoryNameBn}
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              {product.image} {product.nameBn}
            </h1>

            <p className="text-gray-500 mt-3">প্রতি {product.unit}</p>

            <div className="mt-8">
              <p className="text-gray-500">আজকের বাজারদর</p>

              <h2 className="text-3xl font-bold text-green-700 mt-2">
                {formatPrice(product.today)}
              </h2>

              <span
                className={`badge badge-outline mt-3 ${
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
          </div>

          <div className="bg-green-50 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-5">
              দামের তুলনা
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between gap-4">
                <span className="text-gray-600">আজকের দাম</span>
                <span className="font-semibold text-gray-900">
                  {formatPrice(product.today)}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-600">গতকালের দাম</span>
                <span className="font-semibold text-gray-900">
                  {formatPrice(product.yesterday)}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-600">গত সপ্তাহের দাম</span>
                <span className="font-semibold text-gray-900">
                  {formatPrice(product.lastWeek)}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-600">গত মাসের দাম</span>
                <span className="font-semibold text-gray-900">
                  {formatPrice(product.lastMonth)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          বাজারদরের সারসংক্ষেপ
        </h2>

        {marketSummary ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-green-50 rounded-xl p-5">
                <p className="text-sm text-gray-600">সর্বনিম্ন দাম</p>
                <p className="text-xl font-bold text-green-700 mt-2">
                  {formatPrice(marketSummary.min)}
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-5">
                <p className="text-sm text-gray-600">সর্বোচ্চ দাম</p>
                <p className="text-xl font-bold text-green-700 mt-2">
                  {formatPrice(marketSummary.max)}
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-5">
                <p className="text-sm text-gray-600">গড় দাম</p>
                <p className="text-xl font-bold text-green-700 mt-2">
                  {formatPrice(marketSummary.average)}
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              গড় দাম প্রতিটি বাজারের সর্বনিম্ন ও সর্বোচ্চ দামের সমান-ওজনের গড়।
            </p>
          </>
        ) : (
          <p className="text-gray-500 mt-4">
            বাজারদরের সারসংক্ষেপ দেখানোর মতো তথ্য নেই।
          </p>
        )}
      </section>

      <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
          বাজারভিত্তিক দাম
        </h2>

        {product.markets.length === 0 ? (
          <p className="text-gray-500">
            এই পণ্যের জন্য কোনো বাজারের তথ্য পাওয়া যায়নি।
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full [&_thead]:bg-[#f3f4f6] [&_tbody_tr:nth-child(even)]:bg-[#f3f4f6]">
              <thead>
                <tr>
                  <th>বাজার</th>
                  <th>বিভাগ</th>
                  <th>সর্বনিম্ন দাম</th>
                  <th>সর্বোচ্চ দাম</th>
                </tr>
              </thead>

              <tbody>
                {product.markets.map((market, index) => (
                  <tr key={`${market.market}-${market.division}-${index}`}>
                    <td>{market.market}</td>
                    <td>{market.division}</td>
                    <td>{formatPrice(market.min)}</td>
                    <td>{formatPrice(market.max)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </section>
  );
}
