"use client";

import { useFeaturedListings } from "@/hooks/use-listings";
import { ListingCard } from "../../listing-card";
import { Button } from "../../button";
import { Skeleton } from "../../skeleton";
import { Home, ArrowRight } from "lucide-react";

export default function FeaturedHomes() {
  const { listings, loading, error } = useFeaturedListings(6);

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
          <Home className="h-4 w-4 text-primary" />
          <p className="text-primary text-sm font-bold">The Hume Group</p>
        </div>
        <h2 className="text-3xl font-medium text-foreground text-center mb-4">Featured Homes</h2>
        <p className="text-lg text-muted-foreground text-center mb-12">Discover the latest properties in Tacoma and surrounding areas.</p>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
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
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {listings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  onViewDetails={handleViewDetails}
                  className="h-full"
                />
              ))}
            </div>
            
            <div className="text-center">
              <Button onClick={handleViewAll} className="group">
                View All Listings
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 