"use client";

import { useState } from "react";
import { BuyingBuddyWidget } from "@/components/ui/buyingbuddy-widget";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Home } from "lucide-react";
import { Footer } from "@/components/sections/navigation/footer";
import CTA from "@/components/sections/home/cta";

export default function ListingsPage() {
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    bedrooms: "any",
    propertyType: "all",
    city: "Tacoma",
    state: "WA",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

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
            <Button onClick={() => {/* Filters are applied automatically via widget */}} className="flex items-center gap-2">
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
          </div>
        </div>

        {/* BuyingBuddy Widget */}
        <div dangerouslySetInnerHTML={{
          __html: `<bb-widget data-type="FeaturedGallery" data-filter="agent_id:31230+listing_status:active+login-panel:false+header-menu:false"></bb-widget>`,
           }}
        />
        </div>
      <CTA />
      <Footer />
    </div>
  );
} 