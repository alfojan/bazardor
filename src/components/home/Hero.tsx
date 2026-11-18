import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-green-50">
      <div className="max-w-7xl mx-auto px-4 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* Left Content */}
          <div>
            <p className="text-green-700 font-semibold mb-4">
              বাংলাদেশের প্রতিদিনের বাজারদর
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              বাজারের সঠিক দাম,
              <span className="text-green-600"> এখন আপনার হাতেই!</span>
            </h1>

            <p className="mt-5 text-gray-600 text-base md:text-lg leading-relaxed">
              চাল, ডাল, তেল, মাছ, মাংসসহ নিত্যপ্রয়োজনীয় পণ্যের প্রতিদিনের
              বাজারদর এক জায়গায় দেখুন। বাজার করুন জেনে-বুঝে।
            </p>

            <Link
              href="#সব-পণ্য"
              className="btn btn-success text-white mt-7 px-7"
            >
              সব পণ্য দেখুন →
            </Link>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <Image
              src="/images/bazar-hero.png"
              alt="বাজারের পণ্যের ছবি"
              width={600}
              height={450}
              priority
              className="w-full max-w-lg h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
