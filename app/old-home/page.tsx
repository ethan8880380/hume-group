import Hero from "@/components/sections/home/hero";
import FeaturedHomes from "@/components/sections/home/featured-homes";
import MapSection from "@/components/sections/home/map-section";
import { Reviews } from "@/components/sections/home/reviews";
import { HomeValueSection } from "@/components/sections/home/home-value";
import Team from "@/components/sections/home/team";
import CTA from "@/components/sections/home/cta";
import { Blog } from "@/components/sections/home/blog";
import { Footer } from "@/components/sections/navigation/footer";
import WhyBuyWithUs from "@/components/sections/buying/why-buy-with-us";
import WhyListWithUs from "@/components/sections/selling/why-list-with-us";

export default function Home() {
  return (
    <main className="font-sans">
      <Hero />  
      {/* <Team /> */}
      <FeaturedHomes />
      <MapSection />
      <WhyListWithUs />
      <WhyBuyWithUs />
      <Reviews />
      <HomeValueSection />
      <CTA />
      <Blog />
      <Footer />
    </main>
  );
}
