import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-primary pt-40 -mt-17 pb-24">
      <div className="flex flex-col items-start gap-4 text-left w-full container mx-auto px-6 mb-12">
        <h1 className="text-5xl mb-2 font-medium text-white">Smart Strategy. Faster Sales. Better Returns.</h1>
        <p className="text-lg max-w-3xl text-white/80">
          The Hume Group combines decades of local expertise, personalized service, and unmatched professionalism to guide you seamlessly through your real estate journey.
        </p>
        <div className="w-8 h-[1px] my-4 bg-white/50"></div>
        <div className="flex gap-4">
          <Button size="lg" variant="secondary" className="text-primary">Get Top Dollar - Book a Call Now</Button>
          <Button size="lg">Search Homes</Button>
        </div>
      </div>
      <div className="container mx-auto px-6 relative">
        <div className="relative w-[100v] overflow-hidden">
          <Image 
            src="/images/hero.png" 
            alt="Hero Image" 
            width={1000} 
            height={1080} 
            quality={100}
            priority
            className="w-full rounded-lg" 
          />
          <div className="absolute inset-y-0 left-full w-full bg-primary"></div>
        </div>
      </div>
    </div>
  );
}