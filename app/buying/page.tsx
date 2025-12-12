import BuyingHero from "@/components/sections/buying/buying-hero";
import WhyBuyWithUs from "@/components/sections/buying/why-buy-with-us";
import WhatYouCanExpect from "@/components/sections/buying/what-you-can-expect";
import { HomeValueSection } from "@/components/sections/home/home-value";
import MapSection from "@/components/sections/home/map-section";
import { Footer } from "@/components/sections/navigation/footer";
import { Reviews } from "@/components/sections/home/reviews";
import CTA from "@/components/sections/home/cta";

export default function BuyingPage() {
  return (
    <div>
      <BuyingHero />
      <WhyBuyWithUs />
      <WhatYouCanExpect />
      <Reviews />
      <MapSection />
      <div className="w-full h-24"></div>
      <HomeValueSection />
      <CTA />
      <Footer />
    </div>
  );
}

