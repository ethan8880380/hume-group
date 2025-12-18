import { Metadata } from "next";
import { Footer } from "@/components/sections/navigation/footer";
import { Button } from "@/components/ui/button";
import CTA from "@/components/sections/home/cta";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Search Homes for Sale in Tacoma, WA",
  description: "Search all homes for sale in Tacoma and Pierce County. Browse MLS listings, filter by price, beds, baths, and find your perfect home with The Hume Group.",
  keywords: [
    'Tacoma homes for sale',
    'Tacoma MLS search',
    'houses for sale Tacoma WA',
    'Pierce County real estate',
    'Tacoma property search',
    'homes for sale near me Tacoma',
  ],
  openGraph: {
    title: 'Search Tacoma Homes for Sale | The Hume Group',
    description: 'Search all homes for sale in Tacoma and Pierce County. Find your perfect home with The Hume Group.',
    url: 'https://thehumegroup.com/listing-results',
  },
  alternates: {
    canonical: 'https://thehumegroup.com/listing-results',
  },
};

// JSON-LD for Search Results Page
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SearchResultsPage',
  name: 'Tacoma Home Search Results',
  description: 'Search results for homes for sale in Tacoma, WA',
  url: 'https://thehumegroup.com/listing-results',
  mainEntity: {
    '@type': 'ItemList',
    name: 'Tacoma Homes for Sale',
    itemListOrder: 'https://schema.org/ItemListUnordered',
  },
};

export default function ListingResultsPage() {
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
            Homes around Tacoma
          </h1>
          <p className="text-lg max-w-3xl text-foreground/80">
            Browse properties matching your search criteria. If you see something you like, contact us to schedule a showing or learn more about buying a home.
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

      {/* BuyingBuddy ListingResults Widget */}
      <div className="container mx-auto px-6 py-12">
        <div dangerouslySetInnerHTML={{
          __html: `<bb-widget data-type="ListingResults" data-filter="mls_id:wa555+listing_status:active+city:tacoma+login-panel:false+header-menu:false"></bb-widget>`,
        }} />
      </div>

      <CTA />
      <Footer />
    </div>
  );
}
