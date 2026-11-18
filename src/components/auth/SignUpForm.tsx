"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

// Error-কে সহজ বাংলা Message-এ পরিবর্তন করবে
function getSignUpErrorMessage(error: unknown) {
  const authError = error as {
    code?: string;
    message?: string;
    status?: number;
  };

  const code = authError?.code?.toLowerCase() || "";
  const message = authError?.message?.toLowerCase() || "";

  if (
    code.includes("user_already_exists") ||
    code.includes("email_already_exists") ||
    message.includes("already exists") ||
    message.includes("already registered")
  ) {
    return "এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট তৈরি করা হয়েছে। সাইন ইন করুন।";
  }

  if (
    code.includes("password_too_short") ||
    message.includes("password must be")
  ) {
    return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
  }

  if (code.includes("invalid_email") || message.includes("invalid email")) {
    return "সঠিক ইমেইল ঠিকানা লিখুন।";
  }

  if (authError?.status === 429) {
    return "অনেকবার চেষ্টা করা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।";
  }

  return "অ্যাকাউন্ট তৈরি করা যায়নি। আপনার তথ্য যাচাই করে আবার চেষ্টা করুন।";
}

export default function SignUpForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const loadingToast = toast.loading("অ্যাকাউন্ট তৈরি করা হচ্ছে...");

    try {
      const formData = new FormData(event.currentTarget);

      const { error } = await authClient.signUp.email({
        name: String(formData.get("name")).trim(),
        email: String(formData.get("email")).trim(),
        password: String(formData.get("password")),
        callbackURL: "/",
      });

      if (error) {
        toast.error(getSignUpErrorMessage(error), {
          id: loadingToast,
        });
        return;
      }

      toast.success("অ্যাকাউন্ট তৈরি হয়েছে।", {
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
        toast.error(getSignUpErrorMessage(error), {
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
          <h1 className="text-2xl font-bold text-gray-800">অ্যাকাউন্ট তৈরি</h1>

          <p className="mt-2 text-sm text-gray-500">
            বাজার দর ব্যবহার করতে নতুন অ্যাকাউন্ট খুলুন।
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-2">
                নাম
              </span>

              <input
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#00875A] focus:ring-1 focus:ring-[#00875A]"
                type="text"
                name="name"
                placeholder="আপনার নাম লিখুন"
                autoComplete="name"
                required
              />
            </label>

            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-2">
                ইমেইল
              </span>

              <input
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#00875A] focus:ring-1 focus:ring-[#00875A]"
                type="email"
                name="email"
                placeholder="আপনার ইমেইল লিখুন"
                autoComplete="email"
                required
              />
            </label>

            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-2">
                পাসওয়ার্ড
              </span>

              <input
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#00875A] focus:ring-1 focus:ring-[#00875A]"
                type="password"
                name="password"
                placeholder="কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড"
                autoComplete="new-password"
                minLength={8}
                maxLength={128}
                required
              />
            </label>

            <button
              className="w-full bg-[#00875A] hover:bg-[#00764d] text-white font-medium rounded-md py-2.5 transition-colors disabled:opacity-50"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "অপেক্ষা করুন..." : "সাইন আপ"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="text-sm text-gray-400">অথবা</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              className="border border-gray-200 rounded-md py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              type="button"
              disabled={isLoading}
              onClick={() => handleSocialSignIn("google")}
            >
              Google দিয়ে সাইন আপ
            </button>

            <button
              className="border border-gray-200 rounded-md py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              type="button"
              disabled={isLoading}
              onClick={() => handleSocialSignIn("github")}
            >
              GitHub দিয়ে সাইন আপ
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            আগে থেকেই অ্যাকাউন্ট আছে?{" "}
            <Link
              className="font-semibold text-[#00875A] hover:underline"
              href="/signin"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
