import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function SellingHero() {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-primary pt-40 -mt-17 pb-12">
      <div className="flex flex-col items-start gap-4 text-left w-full container mx-auto px-6 mb-8">
        <h1 className="text-5xl mb-2 font-medium text-white">
          Sell Your Home With Confidence
        </h1>
        <p className="text-lg max-w-3xl text-white/80">
          Get top dollar with expert marketing, smooth negotiations, and unmatched local expertise every step of the way.
        </p>
        <div className="w-8 h-[1px] my-4 bg-white/50"></div>
        <div className="flex gap-4">
          <Button size="lg" variant="secondary" className="text-primary">
            Get Top Dollar - Book a Call Now
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
            Free Home Valuation
          </Button>
        </div>
      </div>
      <div className="container mx-auto px-6 relative">
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
          <Image 
            src="/images/hero.png" 
            alt="Tacoma with Mount Rainier" 
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


