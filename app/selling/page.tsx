import { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Sell Your Home in Tacoma, WA",
  description: "Sell your Tacoma home with confidence. The Hume Group provides expert home selling services, strategic pricing, professional marketing, and skilled negotiation to get you the best results.",
  keywords: [
    'sell home Tacoma',
    'Tacoma home selling',
    'list house Tacoma WA',
    'Tacoma listing agent',
    'sell house Pierce County',
    'home valuation Tacoma',
    'Tacoma real estate listing',
  ],
  openGraph: {
    title: 'Sell Your Home in Tacoma | The Hume Group',
    description: 'Sell your Tacoma home with confidence. Expert home selling services with strategic pricing and professional marketing.',
    url: 'https://thehumegroup.com/selling',
    images: ['/images/selling/hero.jpg'],
  },
  alternates: {
    canonical: 'https://thehumegroup.com/selling',
  },
};

// JSON-LD for Service
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Home Selling Services',
  description: 'Professional home selling services in Tacoma, WA including market analysis, pricing strategy, professional photography, marketing, and negotiation.',
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
  serviceType: 'Real Estate Listing Services',
};

export default function SellingPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
