import Link from "next/link";

const footerLinks = [
  { label: "হোম", href: "/" },
  { label: "ক্যাটাগরি", href: "/category/chal" },
  { label: "সাইন ইন", href: "/signin" },
  { label: "সাইন আপ", href: "/signup" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-green-100 bg-green-50 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <Link href="/" className="text-2xl font-bold text-green-700">
              🛒 বাজার দর
            </Link>
            <p className="mt-3 max-w-md text-sm leading-6 text-gray-600">
              প্রতিদিনের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর দেখে জেনে-বুঝে কেনাকাটা
              করুন।
            </p>
          </div>

          <nav aria-label="ফুটার নেভিগেশন">
            <h2 className="font-semibold text-gray-900">দরকারি লিংক</h2>
            <ul className="mt-3 grid grid-cols-2 gap-3 text-sm">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-green-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 border-t border-green-100 pt-5 text-center text-sm text-gray-500">
          © 2026 বাজার দর
        </div>
      </div>
    </footer>
  );
}