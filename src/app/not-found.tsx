import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 px-4 text-center">
      <h1 className="text-7xl font-bold text-green-600">404</h1>

      <h2 className="mt-4 text-2xl font-semibold">পেজটি খুঁজে পাওয়া যায়নি!</h2>

      <p className="mt-2 text-base-content/60">
        দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।
      </p>

      <Link href="/" className="btn btn-success mt-6 text-white">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
