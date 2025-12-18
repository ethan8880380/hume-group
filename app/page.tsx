import { Metadata } from "next";
import VideoHero from "@/components/sections/home/video-hero";
import FeaturedHomes from "@/components/sections/home/featured-homes";
import MapSection from "@/components/sections/home/map-section";
import { Reviews } from "@/components/sections/home/reviews";
import { HomeValueSection } from "@/components/sections/home/home-value";
import CTA from "@/components/sections/home/cta";
import { Blog } from "@/components/sections/home/blog";
import { Footer } from "@/components/sections/navigation/footer";
import WhyBuyWithUs from "@/components/sections/buying/why-buy-with-us";
import WhyListWithUs from "@/components/sections/selling/why-list-with-us";

export const metadata: Metadata = {
  title: "The Hume Group | Tacoma's Top Real Estate Team",
  description: "The Hume Group is Tacoma's trusted real estate team. Matt Hume, Tom Hume, and David Gala specialize in buying and selling homes in Tacoma, University Place, Proctor, Stadium District, and Pierce County.",
  keywords: [
    'Tacoma real estate',
    'Tacoma realtors',
    'Tacoma homes for sale',
    'sell home Tacoma',
    'buy home Tacoma',
    'The Hume Group',
    'Matt Hume realtor',
    'Tom Hume realtor',
    'Pierce County real estate',
  ],
  openGraph: {
    title: "The Hume Group | Tacoma's Top Real Estate Team",
    description: "Tacoma's trusted real estate team specializing in buying and selling homes in the greater Tacoma area.",
    url: 'https://thehumegroup.com',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://thehumegroup.com',
  },
};

// Homepage specific JSON-LD
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://thehumegroup.com/#webpage',
  url: 'https://thehumegroup.com',
  name: "The Hume Group | Tacoma's Top Real Estate Team",
  description: "The Hume Group is Tacoma's trusted real estate team specializing in buying and selling homes.",
  isPartOf: {
    '@type': 'WebSite',
    '@id': 'https://thehumegroup.com/#website',
    url: 'https://thehumegroup.com',
    name: 'The Hume Group',
    publisher: {
      '@type': 'RealEstateAgent',
      '@id': 'https://thehumegroup.com/#organization',
    },
  },
  about: {
    '@type': 'RealEstateAgent',
    '@id': 'https://thehumegroup.com/#organization',
  },
  mainEntity: {
    '@type': 'RealEstateAgent',
    '@id': 'https://thehumegroup.com/#organization',
  },
};

export default function Home() {
  return (
    <main className="font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VideoHero />  
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
