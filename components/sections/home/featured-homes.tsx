"use client";

import { useFeaturedListings } from "@/hooks/use-listings";
import { ListingCard } from "../../ui/listing-card";
import { Button } from "../../ui/button";
import { Skeleton } from "../../ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import { Home, ArrowRight } from "lucide-react";

export default function FeaturedHomes() {
  const { listings, loading, error } = useFeaturedListings(3);

  const handleViewDetails = (listingId: string) => {
    // Navigate to listing detail page
    window.location.href = `/listings/${listingId}`;
  };

  const handleViewAll = () => {
    window.location.href = '/listings';
  };

  if (error) {
    return (
      <div className="bg-background py-16">
        <div className="container mx-auto px-6">
          <p className="text-primary text-sm font-bold text-center mb-2">The Hume Group</p>
          <h2 className="text-3xl font-medium text-foreground text-center mb-4">Featured Homes</h2>
          <p className="text-lg text-muted-foreground text-center mb-12">We help Tacoma homeowners sell faster, smarter, and with less stress.</p>
          <div className="text-center">
            <p className="text-muted-foreground">Unable to load featured homes at this time.</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background py-16">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <p className="text-primary text-sm font-bold">The Hume Group</p>
        </div>
        <h2 className="text-3xl font-medium text-foreground text-center mb-4">Featured Homes</h2>
        <p className="text-lg text-muted-foreground text-center mb-8">Discover the latest properties in Tacoma and surrounding areas.</p>
        
        <div className="flex items-center justify-center gap-4 mb-8">
          <Tabs defaultValue="all" className="w-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">Listings</TabsTrigger>
              <TabsTrigger value="north-tacoma">North Tacoma</TabsTrigger>
              <TabsTrigger value="south-tacoma">South Tacoma</TabsTrigger>
              <TabsTrigger value="gig-harbor">Gig Harbor</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button onClick={handleViewAll} size="lg" className="group">
            View All Listings
          </Button>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="aspect-[4/3] w-full" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onViewDetails={handleViewDetails}
                className="h-full"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}