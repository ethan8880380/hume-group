"use client";

import { useEffect } from "react";
import { useListings } from "@/hooks/use-listings";
import { ListingCard } from "@/components/ui/listing-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NeighborhoodListingsProps {
  neighborhoodName: string;
  neighborhoodSlug?: string;
  limit?: number;
}

export function NeighborhoodListings({ 
  neighborhoodName, 
  neighborhoodSlug,
  limit = 3 
}: NeighborhoodListingsProps) {
  const router = useRouter();
  const { listings, loading, error, fetchListings } = useListings({
    autoFetch: false,
  });

  useEffect(() => {
    // Fetch listings - for now show all available listings
    // TODO: Add neighborhood-based filtering once real data is available
    fetchListings({
      limit,
      status: 'active',
      // You can add neighborhood-specific filtering here once the data structure supports it
      // For example: neighborhood: neighborhoodSlug
    });
  }, [fetchListings, limit, neighborhoodSlug]);

  const handleViewDetails = (listingId: string) => {
    router.push(`/listings/${listingId}`);
  };

  if (error) {
    return (
      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-muted-foreground">
            <p>Unable to load listings at this time. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-medium text-foreground">
            New Listings in {neighborhoodName}
          </h2>
          <Link href="/listing-results">
            <Button size="lg">View All Homes in {neighborhoodName}</Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-video rounded-lg mb-4" />
                <div className="h-6 bg-gray-200 rounded mb-2 w-1/2" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg">No active listings in {neighborhoodName} at this time.</p>
            <p className="text-sm mt-2">Check back soon for new properties!</p>
          </div>
        )}
      </div>
    </section>
  );
}

