import { Button } from "@/components/ui/button";
import Image from "next/image";

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
          <Button size="lg">
            Start Your Home Search Today
          </Button>
          <Button size="lg" variant="ghost">
            Schedule a Buyer Consultation
          </Button>
        </div>
      </div>
      <div className="container mx-auto px-6 relative">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
          <Image 
            src="/images/buying/hero.jpg" 
            alt="Beautiful Tacoma home" 
            fill
            quality={100}
            priority
            className="object-cover" 
          />
        </div>
      </div>
    </div>
  );
}

