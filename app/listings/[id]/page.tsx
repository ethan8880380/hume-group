"use client";

import { useListing } from "@/hooks/use-listings";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar, 
  Home, 
  Phone, 
  Mail, 
  Share2,
  Heart,
  ArrowLeft
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ListingDetailPageProps {
  params: { id: string };
}

export default function ListingDetailPage({ params }: ListingDetailPageProps) {
  const { listing, loading, error } = useListing(params.id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${listing?.address}, ${listing?.city}`,
        text: `Check out this property: ${listing?.address}, ${listing?.city}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Property Details</h1>
            <p className="text-muted-foreground mb-8">Unable to load property details at this time.</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (loading || !listing) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-8">
          <div className="space-y-8">
            <Skeleton className="h-8 w-64" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Skeleton className="aspect-[4/3] w-full" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={handleBack} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Listings
            </Button>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleFavorite}>
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-[16/9] relative overflow-hidden rounded-lg">
                {listing.images.length > 0 && (
                  <Image
                    src={listing.images[selectedImage]}
                    alt={`${listing.address} - ${listing.city}`}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              
              {listing.images.length > 1 && (
                <div className="grid grid-cols-6 gap-2">
                  {listing.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square relative overflow-hidden rounded-md border-2 transition-all ${
                        index === selectedImage ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${listing.address} - ${listing.city} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {listing.address}
                </h1>
                <p className="text-lg text-muted-foreground mb-4">
                  {listing.city}, {listing.state} {listing.zipCode}
                </p>
                <div className="text-3xl font-bold text-primary">
                  {formatPrice(listing.price)}
                </div>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-semibold">{listing.bedrooms}</div>
                    <div className="text-sm text-muted-foreground">Bedrooms</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-semibold">{listing.bathrooms}</div>
                    <div className="text-sm text-muted-foreground">Bathrooms</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Square className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-semibold">{listing.squareFeet.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Sq Ft</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-semibold">{listing.yearBuilt}</div>
                    <div className="text-sm text-muted-foreground">Year Built</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>About This Property</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {listing.description}
                  </p>
                </CardContent>
              </Card>

              {/* Features */}
              {listing.features.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Features & Amenities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {listing.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-primary rounded-full" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Contact Agent
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">The Hume Group</div>
                  <div className="text-sm text-muted-foreground">Your Local Real Estate Experts</div>
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Property Info */}
            <Card>
              <CardHeader>
                <CardTitle>Property Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Property Type</span>
                  <span className="font-medium">{listing.propertyType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant={listing.status === 'active' ? 'default' : 'secondary'}>
                    {listing.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">MLS Number</span>
                  <span className="font-medium">{listing.mlsNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lot Size</span>
                  <span className="font-medium">{listing.lotSize} acres</span>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {listing.address}<br />
                  {listing.city}, {listing.state} {listing.zipCode}
                </p>
                {listing.latitude && listing.longitude && (
                  <div className="mt-4 h-32 bg-muted rounded-md flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">Map View</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 