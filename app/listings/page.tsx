"use client";

import { useState } from "react";
import { useListings } from "@/hooks/use-listings";
import { ListingCard } from "@/components/ui/listing-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Home } from "lucide-react";

export default function ListingsPage() {
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    bedrooms: "any",
    propertyType: "all",
    city: "",
    state: "",
  });

  const { listings, loading, error, total, hasMore, fetchMore } = useListings({
    limit: 12,
    autoFetch: true,
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    // Apply filters and search
    // This would trigger a new search with the current filters
    console.log('Searching with filters:', filters);
  };

  const handleViewDetails = (listingId: string) => {
    window.location.href = `/listings/${listingId}`;
  };

  const handleLoadMore = () => {
    fetchMore();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Listings</h1>
            <p className="text-muted-foreground mb-8">Unable to load listings at this time.</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 mb-2">
            <Home className="h-5 w-5 text-white" />
            <p className="text-white/80 text-sm font-medium">The Hume Group</p>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Find Your Dream Home</h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Discover the latest properties in Tacoma and surrounding areas. 
            Browse through our curated selection of homes, condos, and townhouses.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Location Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="City, State, or ZIP"
                  value={filters.city}
                  onChange={(e) => handleFilterChange("city", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Property Type */}
            <Select value={filters.propertyType} onValueChange={(value) => handleFilterChange("propertyType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Single Family">Single Family</SelectItem>
                <SelectItem value="Townhouse">Townhouse</SelectItem>
                <SelectItem value="Condo">Condo</SelectItem>
                <SelectItem value="Multi-Family">Multi-Family</SelectItem>
              </SelectContent>
            </Select>

            {/* Bedrooms */}
            <Select value={filters.bedrooms} onValueChange={(value) => handleFilterChange("bedrooms", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>

            {/* Price Range */}
            <div className="flex gap-2">
              <Input
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                className="text-sm"
              />
              <Input
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                className="text-sm"
              />
            </div>

            {/* Search Button */}
            <Button onClick={handleSearch} className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-6 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold text-foreground">Properties</h2>
            <Badge variant="secondary">{total} results</Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Select defaultValue="newest">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="beds">Most Bedrooms</SelectItem>
                <SelectItem value="sqft">Largest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Listings Grid */}
        {loading && listings.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {listings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  onViewDetails={handleViewDetails}
                  className="h-full"
                />
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="text-center mt-8">
                <Button 
                  onClick={handleLoadMore} 
                  variant="outline"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Load More Properties"}
                </Button>
              </div>
            )}

            {/* No Results */}
            {!loading && listings.length === 0 && (
              <div className="text-center py-16">
                <Home className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No properties found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or browse all available properties.
                </p>
                <Button onClick={() => setFilters({ minPrice: "", maxPrice: "", bedrooms: "any", propertyType: "all", city: "", state: "" })}>
                  Clear Filters
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 