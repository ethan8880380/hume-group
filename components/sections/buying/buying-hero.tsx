import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BuyingHero() {
  return (
    <div className="flex flex-col items-center justify-center w-full pt-8 md:pt-24">
      <div className="flex flex-col items-start gap-4 text-left w-full container mx-auto px-4 md:px-6 mb-8">
        <h1 className="text-4xl sm:text-4xl md:text-5xl mb-2 font-medium text-foreground">
          Find Your Dream Home in Tacoma
        </h1>
        <p className="text-lg max-w-3xl text-foreground/80">
          From first-time buyers to seasoned investors, we&apos;ll help you navigate the market with confidence and find the perfect home for your needs.
        </p>
        <div className="w-8 h-[1px] my-4 bg-primary/10"></div>
        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link href="/listings">
              Browse Available Listings
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

