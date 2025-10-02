"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/sections/navigation/footer";
import { HeaderWrapper } from "@/components/sections/navigation/header-wrapper";
import { Header } from "@/components/sections/navigation/header";
import { neighborhoodsData } from "@/lib/neighborhoods-data";

// Transform data for use in this component
const neighborhoods = neighborhoodsData.map((n) => ({
  id: n.slug,
  name: n.name,
  description: n.shortDescription,
  image: n.heroImage,
  href: `/neighborhoods/${n.slug}`,
}));

export default function NeighborhoodsPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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
              <Button 
                size="lg" 
              >
                Search Homes
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
              >
                Free Home Valuation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhoods Grid */}
      <section className="pb-6 pt-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {neighborhoods.map((neighborhood, index) => (
              <div
                key={neighborhood.id}
                onMouseEnter={() => setHoveredCard(neighborhood.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group"
              >
                <Card className="relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-96 border-0 rounded-lg">
                  {/* Background Image */}
                  <Image
                    src={neighborhood.image}
                    alt={neighborhood.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  

                  
                  {/* Content positioned at the bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Title and description - animated */}
                    <motion.div 
                      animate={{
                        y: hoveredCard === neighborhood.id ? -16 : 0,
                        marginBottom: hoveredCard === neighborhood.id ? 16 : -24
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {neighborhood.name}
                      </h3>
                      <p className="text-white/90 text-sm">
                        {neighborhood.description}
                      </p>
                    </motion.div>
                    
                    {/* Buttons - animated */}
                    <motion.div 
                      className="flex gap-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: hoveredCard === neighborhood.id ? 1 : 0,
                        y: hoveredCard === neighborhood.id ? 0 : 20
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <Link href={neighborhood.href} className="flex gap-3">
                        <Button variant="outline">
                          View Homes
                        </Button>
                      </Link>
                      <Link href={neighborhood.href} className="flex-1">
                        <Button 
                          variant="outline"
                        >
                          Explore Neighborhood
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-16 container mx-auto px-6">
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
      </section>
    </main>
    <Footer />
    </>
  );
}