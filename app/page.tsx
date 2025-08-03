import Hero from "@/components/sections/home/hero";
import FeaturedHomes from "@/components/sections/home/featured-homes";
import WhatWeDo from "@/components/sections/home/what-we-do";
import MapSection from "@/components/sections/home/map-section";
import { Reviews, defaultTestimonials } from "@/components/sections/home/reviews";
import { HomeValueSection } from "@/components/sections/home/home-value";
import Team from "@/components/sections/home/team";
import CTA from "@/components/sections/home/cta";
import { Blog } from "@/components/sections/home/blog";
import { Footer } from "@/components/sections/navigation/footer";

export default function Home() {
  return (
    <main className="font-sans">
      <Hero />
      <WhatWeDo />  
      <FeaturedHomes />
      <MapSection />
      <Reviews testimonials={defaultTestimonials} />
      <HomeValueSection />
      <Team />
      <CTA />
      <Blog />
      <Footer />
    </main>
  );
}
