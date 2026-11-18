import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/auth/SignOutButton";
import UpdateProfileForm from "@/components/profile/UpdateProfileForm";
import { auth } from "@/lib/auth";

export default function UpdateProfilePage() {
  return <ProfilePage />;
}

async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  return (
    <section className="min-h-full bg-[#f4f5f6] px-4 py-10 md:py-14">
      <div className="max-w-3xl mx-auto">
        {/* Page Heading */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            আমার প্রোফাইল
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* User Information Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 mb-5">
          <div className="flex items-center gap-4">
            {/* User Avatar */}
            <div className="w-12 h-12 rounded-full bg-[#e5f3eb] flex items-center justify-center text-[#00875a] text-xl font-bold">
              {session.user.name?.charAt(0).toUpperCase() || "U"}
            </div>

            {/* User Details */}
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-gray-800">
                {session.user.name}
              </h2>

              <p className="text-sm text-gray-500 break-all">
                {session.user.email}
              </p>
            </div>

            <SignOutButton />
          </div>
        </div>

        {/* Update Information Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 md:p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-5">তথ্য</h2>

          <UpdateProfileForm currentName={session.user.name} />
        </div>
      </div>
    </section>
  );
}
