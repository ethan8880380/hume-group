import { Metadata } from "next";
import BuyingHero from "@/components/sections/buying/buying-hero";
import WhyBuyWithUs from "@/components/sections/buying/why-buy";
import WhatYouCanExpect from "@/components/sections/buying/what-you-can-expect";
import { HomeValueSection } from "@/components/sections/home/home-value";
import MapSection from "@/components/sections/home/map-section";
import { Footer } from "@/components/sections/navigation/footer";
import { Reviews } from "@/components/sections/home/reviews";
import ContactSection from "@/components/sections/contact/contact-section";

export const metadata: Metadata = {
  title: "Buy a Home in Tacoma, WA",
  description: "Find your dream home in Tacoma with The Hume Group. Expert buyer representation, local market knowledge, and personalized guidance for first-time buyers to seasoned investors.",
  keywords: [
    'buy home Tacoma',
    'Tacoma homes for sale',
    'houses for sale Tacoma WA',
    'Tacoma buyer agent',
    'first time home buyer Tacoma',
    'Pierce County homes',
    'Tacoma real estate search',
  ],
  openGraph: {
    title: 'Buy a Home in Tacoma | The Hume Group',
    description: 'Find your dream home in Tacoma with expert buyer representation and local market knowledge.',
    url: 'https://thehumegroup.com/buying',
    images: ['/images/buying/hero.jpg'],
  },
  alternates: {
    canonical: 'https://thehumegroup.com/buying',
  },
};

// JSON-LD for Service
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Home Buying Services',
  description: 'Professional home buying services in Tacoma, WA including buyer representation, home search, market analysis, and negotiation.',
  provider: {
    '@type': 'RealEstateAgent',
    name: 'The Hume Group',
    url: 'https://thehumegroup.com',
  },
  areaServed: {
    '@type': 'City',
    name: 'Tacoma',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'WA',
      addressCountry: 'US',
    },
  },
  serviceType: 'Real Estate Buyer Services',
};

export default function BuyingPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BuyingHero />
      <WhyBuyWithUs />
      <WhatYouCanExpect />
      <Reviews />
      <MapSection />
      <div className="w-full h-24"></div>
      <HomeValueSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
