"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignOut() {
    setIsLoading(true);

    const loadingToast = toast.loading("সাইন আউট করা হচ্ছে...");

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি।", {
          id: loadingToast,
        });
        return;
      }

      toast.success("সাইন আউট সম্পন্ন হয়েছে।", {
        id: loadingToast,
      });

      router.push("/signin");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "সাইন আউট করা যায়নি।",
        { id: loadingToast },
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isLoading}
      className="px-3 py-2 text-sm font-medium text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors disabled:opacity-50"
    >
      {isLoading ? "অপেক্ষা করুন..." : "← সাইন আউট"}
    </button>
  );
}
