"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import SignOutButton from "@/components/auth/SignOutButton";
import Image from "next/image";

const categories = [
  { name: "সব পণ্য", slug: "", icon: "🛒" },
  { name: "চাল", slug: "chal", icon: "🍚" },
  { name: "ডাল", slug: "dal", icon: "🫘" },
  { name: "তেল", slug: "tel", icon: "🛢️" },
  { name: "সবজি", slug: "sobji", icon: "🥬" },
  { name: "মাছ", slug: "mach", icon: "🐟" },
  { name: "মাংস", slug: "mangsho", icon: "🍗" },
  { name: "ডিম-দুধ", slug: "dim-dui", icon: "🥛" },
  { name: "মসলা", slug: "mosla", icon: "🌶️" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const today = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <header className="w-full bg-white text-gray-800 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Navbar */}
        <div className="flex w-full items-center justify-between gap-4 py-3">
          {/* Logo and Date */}
          <Link href="/" className="flex flex-col shrink-0">
            <span className="text-xl md:text-2xl font-bold text-green-700">
              🛒 বাজার দর
            </span>

            <span className="text-xs text-gray-500 mt-1">{today}</span>
          </Link>

          {/* Auth Section */}
          <div className="flex items-center justify-end gap-2 shrink-0">
            {session ? (
              /* Profile Dropdown */
              <details className="dropdown dropdown-end">
                <summary className="list-none cursor-pointer flex items-center gap-2 rounded-full px-2 py-1 hover:bg-gray-100 transition-colors [&::-webkit-details-marker]:hidden">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-semibold">
                      {session.user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}

                  <span className="text-sm font-medium text-gray-700 max-w-24 truncate">
                    {session.user.name}
                  </span>

                  <span className="text-xs text-gray-500">▼</span>
                </summary>

                {/* Dropdown Menu */}
                <div className="dropdown-content mt-3 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-3">
                  <div className="pb-3 border-b border-gray-100">
                    <p className="font-semibold text-gray-800 text-sm">
                      {session.user.name}
                    </p>

                    <p className="text-xs text-gray-500 mt-1 break-all">
                      {session.user.email}
                    </p>
                  </div>

                  <Link
                    href="/update-profile"
                    className="flex items-center gap-2 mt-2 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                  >
                    <span>👤</span>
                    আমার প্রোফাইল
                  </Link>

                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <SignOutButton />
                  </div>
                </div>
              </details>
            ) : (
              /* Sign In and Sign Up */
              <>
                <Link
                  href="/signin"
                  className="btn btn-sm btn-outline btn-success"
                >
                  Sign In
                </Link>

                <Link
                  href="/signup"
                  className="btn btn-sm btn-success text-white"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Category Navigation */}
        <nav className="flex w-full items-center justify-start gap-2 overflow-x-auto pb-3">
          {categories.map((category) => {
            const href = category.slug ? `/category/${category.slug}` : "/";

            const isActive = category.slug
              ? pathname === href
              : pathname === "/";

            return (
              <Link
                key={category.slug || "all"}
                href={href}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700"
                }`}
              >
                {category.icon} {category.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
