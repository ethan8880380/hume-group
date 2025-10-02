import SellingHero from "@/components/sections/selling/selling-hero";
import WhyListWithUs from "@/components/sections/selling/why-list-with-us";
import WhatYouCanExpect from "@/components/sections/selling/what-you-can-expect";
import OurTrackRecord from "@/components/sections/selling/our-track-record";
import { HomeValueSection } from "@/components/sections/home/home-value";
import SalesMapSection from "@/components/sections/selling/sales-map-section";
import { Footer } from "@/components/sections/navigation/footer";
import { Reviews } from "@/components/sections/home/reviews";
import CTA from "@/components/sections/home/cta";
import MapSection from "@/components/sections/home/map-section";

export default function SellingPage() {
  return (
    <div>
      <SellingHero />
      <WhyListWithUs />
      <WhatYouCanExpect />
      <OurTrackRecord />
      <Reviews />
      <MapSection />
      <div className="w-full h-24"></div>
      <HomeValueSection />
      <CTA />
      <Footer />
    </div>
  );
}

