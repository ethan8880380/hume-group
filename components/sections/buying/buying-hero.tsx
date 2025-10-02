import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function BuyingHero() {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-primary pt-40 -mt-17 pb-12">
      <div className="flex flex-col items-start gap-4 text-left w-full container mx-auto px-6 mb-8">
        <h1 className="text-5xl mb-2 font-medium text-white">
          Find Your Dream Home in Tacoma
        </h1>
        <p className="text-lg max-w-3xl text-white/80">
          From first-time buyers to seasoned investors, we'll help you navigate the market with confidence and find the perfect home for your needs.
        </p>
        <div className="w-8 h-[1px] my-4 bg-white/50"></div>
        <div className="flex gap-4">
          <Button size="lg" variant="secondary" className="text-primary">
            Start Your Home Search Today
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
            Schedule a Buyer Consultation
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

