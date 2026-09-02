import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center py-16">
      <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 md:grid-cols-2">
        {/* LEFT - Image Placeholder */}
        <div className="flex items-center justify-center">
          <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-lg bg-gray-200">
            <Image
              src="/placeholder.jpg"
              alt="Age Guesser illustration"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* RIGHT - Content */}
        <div className="flex flex-col justify-center text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Can I guess your age?
          </h1>

          <p className="mt-4 text-lg text-gray-600 md:text-xl">
            Answer 11 quick questions about your lifestyle and I&apos;ll reveal your biological age.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 md:flex-row md:justify-center lg:justify-start">
            <Link
              href="/quiz"
              className="rounded-lg bg-emerald-600 px-6 py-3 text-white transition-colors hover:bg-emerald-700"
            >
              Play
            </Link>

            <Link
              href="/about"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-gray-700 transition-colors hover:bg-gray-100"
            >
              How to play
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
