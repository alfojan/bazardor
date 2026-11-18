export default function Loading() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 animate-pulse">
      {/* Category Heading Skeleton */}
      <div className="mb-8">
        <div className="h-4 w-32 bg-gray-200 rounded"></div>

        <div className="h-10 w-48 bg-gray-200 rounded mt-4"></div>

        <div className="h-5 w-72 max-w-full bg-gray-200 rounded mt-3"></div>
      </div>

      {/* Sorting Skeleton */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-5 w-36 bg-gray-200 rounded"></div>

        <div className="h-9 w-36 bg-gray-200 rounded"></div>
      </div>

      {/* Product Card Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="bg-white border border-gray-200 rounded-xl p-5"
          >
            <div className="flex justify-between items-center">
              <div className="h-10 w-10 bg-gray-200 rounded"></div>

              <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
            </div>

            <div className="h-6 w-40 bg-gray-200 rounded mt-6"></div>

            <div className="h-4 w-28 bg-gray-200 rounded mt-3"></div>

            <div className="flex justify-between items-center mt-6">
              <div className="h-7 w-24 bg-gray-200 rounded"></div>

              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
