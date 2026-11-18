import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { getProductsByCategory } from "@/lib/api";
import CategoryProductList from "@/components/products/CategoryProductList";
import { Product } from "@/types/product";
import { auth } from "@/lib/auth";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const categories = [
  { name: "চাল", slug: "chal", icon: "🍚" },
  { name: "ডাল", slug: "dal", icon: "🫘" },
  { name: "তেল", slug: "tel", icon: "🛢️" },
  { name: "সবজি", slug: "sobji", icon: "🥬" },
  { name: "মাছ", slug: "mach", icon: "🐟" },
  { name: "মাংস", slug: "mangsho", icon: "🍗" },
  { name: "ডিম-দুধ", slug: "dim-dui", icon: "🥛" },
  { name: "মসলা", slug: "mosla", icon: "🌶️" },
];

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  // Check user session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect to sign in if user is not logged in
  if (!session) {
    redirect("/signin");
  }

  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  let products: Product[] = [];

  try {
    products = await getProductsByCategory(slug);
  } catch (error) {
    console.error("Category products loading error:", error);

    return (
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-red-500">
          পণ্যের তথ্য লোড করা যায়নি। পরে আবার চেষ্টা করুন।
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <p className="text-green-600 font-semibold">PRODUCT CATEGORY</p>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
          {category.icon} {category.name}
        </h1>

        <p className="text-gray-500 mt-2">
          এই ক্যাটাগরির সব পণ্যের আজকের বাজারদর দেখুন।
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🛒</div>

          <h2 className="text-2xl font-bold text-gray-800">
            কোনো পণ্য পাওয়া যায়নি!
          </h2>

          <p className="text-gray-500 mt-2">
            এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
          </p>

          <Link href="/" className="btn btn-success text-white mt-6">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <CategoryProductList products={products} />
      )}
    </section>
  );
}
