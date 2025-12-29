import Link from "next/link";
import { Footer } from "@/components/sections/navigation/footer";

export default function NotFound() {
  return (
    <main className="font-sans min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        <p className="text-sm font-medium text-primary mb-4">404 Error</p>
        
        <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-3 text-center">
          Page not found
        </h1>
        
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Go home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center text-primary font-medium hover:text-primary/80 transition-colors"
          >
            Contact us →
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
