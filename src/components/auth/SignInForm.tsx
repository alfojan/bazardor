"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

// Better Auth error-কে সহজ বাংলা Message-এ পরিবর্তন করবে
function getAuthErrorMessage(error: unknown) {
  const authError = error as {
    code?: string;
    message?: string;
    status?: number;
  };

  const code = authError?.code?.toLowerCase() || "";
  const message = authError?.message?.toLowerCase() || "";

  if (
    code.includes("invalid_email_or_password") ||
    code.includes("invalid_credentials") ||
    message.includes("invalid email or password")
  ) {
    return "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়। আবার চেষ্টা করুন।";
  }

  if (
    code.includes("account_not_linked") ||
    message.includes("account_not_linked")
  ) {
    return "এই ইমেইলটি অন্য একটি Login পদ্ধতিতে নিবন্ধিত। আগে ব্যবহৃত পদ্ধতিতে সাইন ইন করুন।";
  }

  if (
    code.includes("email_not_verified") ||
    message.includes("email not verified")
  ) {
    return "আপনার ইমেইল এখনো যাচাই করা হয়নি।";
  }

  if (authError?.status === 429) {
    return "অনেকবার চেষ্টা করা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।";
  }

  return "সাইন ইন করা যায়নি। আপনার তথ্য যাচাই করে আবার চেষ্টা করুন।";
}

export default function SignInForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const loadingToast = toast.loading("সাইন ইন করা হচ্ছে...");

    try {
      const formData = new FormData(event.currentTarget);

      const { error } = await authClient.signIn.email({
        email: String(formData.get("email")),
        password: String(formData.get("password")),
        callbackURL: "/",
      });

      if (error) {
        toast.error(getAuthErrorMessage(error), {
          id: loadingToast,
        });
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে।", {
        id: loadingToast,
      });

      router.push("/");
      router.refresh();
    } catch {
      toast.error("ইন্টারনেট সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।", {
        id: loadingToast,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSocialSignIn(provider: "google" | "github") {
    setIsLoading(true);

    const loadingToast = toast.loading(
      "সামাজিক অ্যাকাউন্টে সংযোগ করা হচ্ছে...",
    );

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(getAuthErrorMessage(error), {
          id: loadingToast,
        });
      } else {
        toast.dismiss(loadingToast);
      }
    } catch {
      toast.error("সামাজিক অ্যাকাউন্টে সংযোগ করা যায়নি। আবার চেষ্টা করুন।", {
        id: loadingToast,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="bg-[#f4f5f6] px-4 py-12 md:py-16">
      <div className="max-w-md mx-auto">
        <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">সাইন ইন</h1>

          <p className="mt-2 text-sm text-gray-500">
            আপনার অ্যাকাউন্টে প্রবেশ করুন।
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ইমেইল
              </label>

              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="আপনার ইমেইল লিখুন"
                required
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#00875A] focus:ring-1 focus:ring-[#00875A]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                পাসওয়ার্ড
              </label>

              <input
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                required
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#00875A] focus:ring-1 focus:ring-[#00875A]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#00875A] hover:bg-[#00764d] text-white text-sm font-medium py-2.5 rounded-md transition-colors disabled:opacity-60"
            >
              {isLoading ? "অপেক্ষা করুন..." : "সাইন ইন"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="text-xs text-gray-400">অথবা</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleSocialSignIn("google")}
              className="border border-gray-200 rounded-md py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Google দিয়ে সাইন ইন
            </button>

            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleSocialSignIn("github")}
              className="border border-gray-200 rounded-md py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              GitHub দিয়ে সাইন ইন
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-semibold text-[#00875A] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
