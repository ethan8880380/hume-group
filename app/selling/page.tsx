import SellingHero from "@/components/sections/selling/selling-hero";
import WhyListWithUs from "@/components/sections/selling/why-list";
import WhatYouCanExpect from "@/components/sections/selling/what-you-can-expect";
import OurTrackRecord from "@/components/sections/selling/our-track-record";
import TeamMembers from "@/components/sections/about/team-members";
import { HomeValueSection } from "@/components/sections/home/home-value";
import { Footer } from "@/components/sections/navigation/footer";
import { Reviews } from "@/components/sections/home/reviews";
import ContactSection from "@/components/sections/contact/contact-section";
import MapSection from "@/components/sections/home/map-section";

export default function SellingPage() {
  return (
    <div>
      <SellingHero />
      <WhyListWithUs />
      <WhatYouCanExpect />
      <OurTrackRecord />
      <TeamMembers />
      <Reviews />
      <MapSection />
      <div className="w-full h-24"></div>
      <HomeValueSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

