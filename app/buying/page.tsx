import BuyingHero from "@/components/sections/buying/buying-hero";
import WhyBuyWithUs from "@/components/sections/buying/why-buy-with-us";
import WhatYouCanExpect from "@/components/sections/buying/what-you-can-expect";
import OurTrackRecord from "@/components/sections/buying/our-track-record";
import TestimonialSection from "@/components/sections/buying/testimonial-section";
import { HomeValueSection } from "@/components/sections/home/home-value";
import ListingsMapSection from "@/components/sections/buying/listings-map-section";
import ScheduleCall from "@/components/sections/buying/schedule-call";
import { Footer } from "@/components/sections/navigation/footer";

export default function BuyingPage() {
  return (
    <div>
      <BuyingHero />
      <WhyBuyWithUs />
      <WhatYouCanExpect />
      <OurTrackRecord />
      <TestimonialSection />
      <HomeValueSection />
      <ListingsMapSection />
      <ScheduleCall />
      <Footer />
    </div>
  );
}

