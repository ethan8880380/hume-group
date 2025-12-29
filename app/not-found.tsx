import Link from "next/link";
import { Footer } from "@/components/sections/navigation/footer";

export default function NotFound() {
  return (
    <main className="font-sans min-h-screen flex flex-col">
      {/* Background with subtle pattern */}
      <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating houses pattern */}
          <div className="absolute top-20 left-[10%] text-8xl opacity-[0.03] rotate-[-15deg]">🏠</div>
          <div className="absolute top-40 right-[15%] text-6xl opacity-[0.04] rotate-[10deg]">🏡</div>
          <div className="absolute bottom-32 left-[20%] text-7xl opacity-[0.03] rotate-[5deg]">🏘️</div>
          <div className="absolute bottom-20 right-[25%] text-9xl opacity-[0.02] rotate-[-8deg]">🏠</div>
          
          {/* Gradient orbs */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 py-20">
          {/* Animated house icon */}
          <div className="relative mb-8">
            <div className="text-[120px] md:text-[160px] leading-none animate-bounce [animation-duration:3s]">
              🏠
            </div>
            {/* Question mark overlay */}
            <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 bg-primary text-white text-2xl md:text-3xl font-bold w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              ?
            </div>
          </div>

          {/* 404 Text */}
          <h1 className="text-7xl md:text-9xl font-bold text-primary mb-4 tracking-tight">
            404
          </h1>

          {/* Message */}
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 text-center">
            This property isn&apos;t on the market
          </h2>
          <p className="text-lg text-gray-600 mb-10 text-center max-w-md">
            Looks like this page has moved or doesn&apos;t exist. Let us help you find your way home.
          </p>

          {/* Navigation options */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Back to Home
            </Link>
            <Link
              href="/listings"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg border-2 border-primary hover:bg-primary/5 transition-all hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              Browse Listings
            </Link>
          </div>

          {/* Quick links */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">Or try one of these:</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link
                href="/buying"
                className="text-primary hover:text-primary/80 hover:underline transition-colors"
              >
                Buying a Home
              </Link>
              <Link
                href="/selling"
                className="text-primary hover:text-primary/80 hover:underline transition-colors"
              >
                Selling a Home
              </Link>
              <Link
                href="/neighborhoods"
                className="text-primary hover:text-primary/80 hover:underline transition-colors"
              >
                Neighborhoods
              </Link>
              <Link
                href="/contact"
                className="text-primary hover:text-primary/80 hover:underline transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

