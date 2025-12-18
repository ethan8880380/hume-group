import { Metadata } from "next";
import { Footer } from "@/components/sections/navigation/footer";
import CTA from "@/components/sections/home/cta";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Listings | Homes for Sale in Tacoma",
  description: "Browse homes for sale listed by The Hume Group in Tacoma and surrounding areas. View our current listings featuring quality properties throughout Pierce County.",
  keywords: [
    'Tacoma homes for sale',
    'Hume Group listings',
    'houses for sale Tacoma',
    'Tacoma property listings',
    'Pierce County homes for sale',
    'Tacoma MLS listings',
  ],
  openGraph: {
    title: 'Our Listings | The Hume Group',
    description: 'Browse homes for sale listed by The Hume Group in Tacoma and surrounding areas.',
    url: 'https://thehumegroup.com/listings',
  },
  alternates: {
    canonical: 'https://thehumegroup.com/listings',
  },
};

// JSON-LD for Real Estate Listings
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'The Hume Group Property Listings',
  description: 'Current property listings from The Hume Group in Tacoma, WA',
  url: 'https://thehumegroup.com/listings',
  itemListOrder: 'https://schema.org/ItemListUnordered',
  numberOfItems: 12,
};

export default function ListingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <div className="flex flex-col items-center justify-center w-full pt-24">
        <div className="flex flex-col items-start gap-4 text-left w-full container mx-auto px-6 mb-8">
          <h1 className="text-5xl mb-2 font-medium text-foreground">
            Browse Our Available Listings
          </h1>
          <p className="text-lg max-w-3xl text-foreground/80">
            Explore homes for sale by us in Tacoma and the surrounding areas. If you see something you like, contact us to schedule a showing.
          </p>
          <div className="w-8 h-[1px] my-4 bg-primary/10"></div>
          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/buying">Learn About Buying</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Listings Widget */}
      <div className="container mx-auto px-6 py-12">
        <div dangerouslySetInnerHTML={{
          __html: `<bb-widget data-type="FeaturedGallery" data-filter="agent_id:31230+mls_id:wa555+listing_status:active,under-contract+login-panel:false+header-menu:false+limit:12+order:create_dt desc"></bb-widget>`,
        }} />
      </div>

      <CTA />
      <Footer />
    </div>
  );
}
