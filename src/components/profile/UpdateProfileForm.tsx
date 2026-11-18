"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

interface UpdateProfileFormProps {
  currentName: string;
}

export default function UpdateProfileForm({
  currentName,
}: UpdateProfileFormProps) {
  const router = useRouter();

  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("নাম লিখুন");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        toast.error("প্রোফাইল আপডেট হয়নি");
        return;
      }

      toast.success("প্রোফাইল আপডেট সফল হয়েছে!");

      router.refresh();
    } catch {
      toast.error("প্রোফাইল আপডেট করতে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          নাম
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="আপনার নাম লিখুন"
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#00875A] focus:ring-1 focus:ring-[#00875A]"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#00875A] hover:bg-[#00764d] text-white text-sm font-medium py-2 rounded-md transition-colors disabled:opacity-60"
      >
        {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
      </button>
    </form>
  );
}
