"use client";

import { Button } from "@/components/ui/button";
import { Footer } from "@/components/sections/navigation/footer";
import { neighborhoodsData } from "@/lib/neighborhoods-data";
import { NeighborhoodCard } from "@/components/ui/neighborhood-card";
import CTA from "@/components/sections/home/cta";
import { HomeValuationDialog } from "@/components/home-valuation-dialog";
import Link from "next/link";

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

      {/* CTA Section - Hidden */}
      {/* <section className="mb-16 container mx-auto px-6">
        <div className="container mx-auto px-4 text-center bg-primary py-20 rounded-lg">
          <h2 className="text-3xl md:text-4xl font-medium text-white mb-6">
            Which Tacoma Neighborhood is Right for You?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-4xl mx-auto">
            Not sure what neighborhood is right for you? Take our quick quiz to see which one is your best fit!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"  
              variant="secondary"
              className="cursor-pointer text-primary"
            >
              Take the Quiz
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-primary border-white/20 text-white hover:bg-primary/90 hover:text-white hover:border-white/50 cursor-pointer"
            >
              Connect With an Agent
            </Button>
          </div>
        </div>
      </section> */}

      {/* Buy/Sell CTA */}
      <CTA />
    </main>
    <Footer />
    </>
  );
}