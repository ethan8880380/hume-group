import { Button } from "@/components/ui/button";

export default function BuyingHero() {
  return (
    <div className="flex flex-col items-center justify-center w-full pt-24">
      <div className="flex flex-col items-start gap-4 text-left w-full container mx-auto px-6 mb-8">
        <h1 className="text-5xl mb-2 font-medium text-foreground">
          Find Your Dream Home in Tacoma
        </h1>
        <p className="text-lg max-w-3xl text-foreground/80">
          From first-time buyers to seasoned investors, we&apos;ll help you navigate the market with confidence and find the perfect home for your needs.
        </p>
        <div className="w-8 h-[1px] my-4 bg-primary/10"></div>
        <div className="flex gap-4">
          <Button asChild size="lg">
            <a 
              href="https://www.windermere.com/homes/wa/tacoma" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Search Listings in Tacoma
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="/contact">Contact Us</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

