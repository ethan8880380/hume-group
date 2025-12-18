import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/sections/navigation/footer";
import { neighborhoodsData } from "@/lib/neighborhoods-data";
import { NeighborhoodCard } from "@/components/ui/neighborhood-card";
import CTA from "@/components/sections/home/cta";
import { HomeValuationDialog } from "@/components/home-valuation-dialog";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tacoma Neighborhoods Guide",
  description: "Explore Tacoma's most desirable neighborhoods including Proctor, Stadium District, North Slope, 6th Ave, West End, and more. Find the perfect neighborhood for your lifestyle with our comprehensive guides.",
  keywords: [
    'Tacoma neighborhoods',
    'Proctor District Tacoma',
    'Stadium District Tacoma',
    'North Slope Tacoma',
    '6th Ave Tacoma',
    'West End Tacoma',
    'University Place',
    'Tacoma neighborhood guide',
    'best neighborhoods Tacoma',
  ],
  openGraph: {
    title: 'Explore Tacoma Neighborhoods | The Hume Group',
    description: 'Discover Tacoma\'s most desirable neighborhoods. Find the perfect fit for your lifestyle with our comprehensive neighborhood guides.',
    url: 'https://thehumegroup.com/neighborhoods',
    images: ['/images/neighborhoods/1.png'],
  },
  alternates: {
    canonical: 'https://thehumegroup.com/neighborhoods',
  },
};

// JSON-LD for ItemList of Neighborhoods
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Tacoma Neighborhoods',
  description: 'Guide to neighborhoods in Tacoma, Washington',
  itemListElement: neighborhoodsData.map((neighborhood, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Place',
      name: neighborhood.name,
      description: neighborhood.shortDescription,
      url: `https://thehumegroup.com/neighborhoods/${neighborhood.slug}`,
    },
  })),
};

// Transform data for use in this component
const neighborhoods = neighborhoodsData.map((n) => ({
  id: n.slug,
  name: n.name,
  description: n.shortDescription,
  image: n.heroImage,
  href: `/neighborhoods/${n.slug}`,
}));

export default function NeighborhoodsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-medium text-foreground mb-6">
              Explore Tacoma&apos;s Most Desirable Neighborhoods
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Find the right fit for your lifestyle. Browse our neighborhood guides to learn 
              about local highlights, schools, real estate trends, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/listing-results">
                <Button 
                  size="lg" 
                >
                  Search Homes
                </Button>
              </Link>
              <HomeValuationDialog 
                trigger={
                  <Button 
                    variant="outline" 
                    size="lg" 
                  >
                    Free Home Valuation
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhoods Grid */}
      <section className="pb-6 pt-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {neighborhoods.map((neighborhood) => (
              <NeighborhoodCard
                key={neighborhood.id}
                id={neighborhood.id}
                name={neighborhood.name}
                description={neighborhood.description}
                image={neighborhood.image}
                href={neighborhood.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Buy/Sell CTA */}
      <CTA />
    </main>
    <Footer />
    </>
  );
}
