"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "./button";
import { Heart, MapPin, ArrowUpRight } from "lucide-react";
import { Listing } from "@/app/api/listings/route";

interface ListingCardProps {
  listing: Listing;
  onFavorite?: (listingId: string) => void;
  onViewDetails?: (listingId: string) => void;
  isFavorite?: boolean;
  className?: string;
}

export function ListingCard({
  listing,
  onFavorite,
  onViewDetails,
  isFavorite = false,
  className = "",
}: ListingCardProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatAddress = (address: string, city: string, state: string) => {
    return `${address}, ${city} ${state}`;
  };

  const handleImageClick = () => {
    if (listing.images.length > 1) {
      setImageIndex((prev) => (prev + 1) % listing.images.length);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavorite?.(listing.id);
  };

  const handleViewDetails = () => {
    onViewDetails?.(listing.id);
  };

  return (
    <div className={`group relative overflow-hidden rounded-lg pb-0 transition-all duration-300 ${className}`}>
      {/* Property Image */}
      <div className="relative aspect-video overflow-hidden">
        {listing.images.length > 0 && listing.images[imageIndex] && listing.images[imageIndex].trim() !== '' && (
          <>
            <Image
              src={listing.images[imageIndex]}
              alt={`${listing.address} - ${listing.city}`}
              fill
              className={`object-cover rounded-sm transition-all duration-500 ${
                imageLoading ? 'blur-sm' : 'blur-0'
              }`}
              onLoad={() => setImageLoading(false)}
              onClick={handleImageClick}
            />
            {listing.images.length > 1 && (
              <div className="absolute bottom-3 left-3 flex gap-1">
                {listing.images.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-md transition-all ${
                      index === imageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        )}
        
        {/* Fallback for no images */}
        {(!listing.images.length || !listing.images[imageIndex] || listing.images[imageIndex].trim() === '') && (
          <div className="w-full h-full bg-primary/[0.03] flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">🏠</div>
              <div className="text-sm">No Image Available</div>
            </div>
          </div>
        )}
        
        {/* Favorite Button */}
        {onFavorite && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow-sm"
            onClick={handleFavoriteClick}
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-primary/50'
              }`}
            />
          </Button>
        )}
      </div>

      {/* White Overlay Card */}
      <div className="">
        <div className="py-4">
          {/* Price */}
          <div className="text-xl font-medium text-foreground mb-2 flex justify-between">
            {formatPrice(listing.price)}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0"
              onClick={handleViewDetails}
            >
          <ArrowUpRight className="h-7 w-7 text-primary" />
        </Button>
          </div>

          {/* Address */}
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground line-clamp-1">
              {formatAddress(listing.address, listing.city, listing.state)}
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-primary/10 mb-3"></div>

          {/* Property Details */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-baseline gap-1 text-md text-foreground">
              {listing.bedrooms} <span className="text-xs font-normal text-muted-foreground">Bed</span>
            </div>
            <div className="flex items-baseline gap-1 text-md text-foreground">
              {listing.bathrooms} <span className="text-xs font-normal text-muted-foreground">Bath</span>
            </div>
            <div className="flex items-baseline gap-1 text-md text-foreground">
              {listing.squareFeet.toLocaleString()}<span className="text-xs font-normal text-muted-foreground"> Sq Ft</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 