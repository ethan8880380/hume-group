import SellingHero from "@/components/sections/selling/selling-hero";
import WhyListWithUs from "@/components/sections/selling/why-list-with-us";
import WhatYouCanExpect from "@/components/sections/selling/what-you-can-expect";
import OurTrackRecord from "@/components/sections/selling/our-track-record";
import TestimonialSection from "@/components/sections/selling/testimonial-section";
import { HomeValueSection } from "@/components/sections/home/home-value";
import SalesMapSection from "@/components/sections/selling/sales-map-section";
import ScheduleCall from "@/components/sections/selling/schedule-call";
import { Footer } from "@/components/sections/navigation/footer";

export default function SellingPage() {
  return (
    <div>
      <SellingHero />
      <WhyListWithUs />
      <WhatYouCanExpect />
      <OurTrackRecord />
      <TestimonialSection />
      <HomeValueSection />
      <SalesMapSection />
      <ScheduleCall />
      <Footer />
    </div>
  );
}

