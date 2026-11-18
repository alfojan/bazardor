import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { getAllProducts } from "@/lib/api";
import ProductDetails from "@/components/products/ProductDetails";
import { Product } from "@/types/product";
import { auth } from "@/lib/auth";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/signin");
  }

  let products: Product[];

  try {
    products = await getAllProducts();
  } catch (error) {
    console.error("Product loading error:", error);

    return (
      <section className="text-center py-20 px-4">
        <p className="text-red-500">
          পণ্যের তথ্য লোড করা যায়নি। পরে আবার চেষ্টা করুন।
        </p>

        <Link href="/" className="btn btn-success text-white mt-6">
          হোম পেজে ফিরে যান
        </Link>
      </section>
    );
  }

  const product = products.find(
    (item) => String(item.id) === slug || item.slug === slug,
  );

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
