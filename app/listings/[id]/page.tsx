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
  Home, 
  Phone, 
  Mail, 
  Share2,
  Heart,
  ArrowLeft,  
  Camera,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Image from "next/image";
import { useState, use } from "react";
import { NewsletterSubscribe } from "@/components/newsletter-subscribe";

interface ListingDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ListingDetailPage({ params }: ListingDetailPageProps) {
  const resolvedParams = use(params);
  const { listing, loading, error } = useListing(resolvedParams.id);
  
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

  const formatSquareFeet = (sqft: number) => {
    return new Intl.NumberFormat('en-US').format(sqft);
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

  const nextImage = () => {
    if (listing?.images && listing.images.length > 0) {
      setSelectedImage((prev) => (prev + 1) % listing.images.length);
    }
  };

  const prevImage = () => {
    if (listing?.images && listing.images.length > 0) {
      setSelectedImage((prev) => (prev - 1 + listing.images.length) % listing.images.length);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Property Not Found</h1>
            <p className="text-gray-600 mb-8">The property you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <Button onClick={handleBack} className="bg-blue-600 hover:bg-blue-700">
              Back to Listings
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (loading || !listing) {
    return (
      <div className="min-h-screen bg-gray-50">
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

  const validImages = listing.images.filter(img => img && img.trim() !== '');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={handleBack} 
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Listings
            </Button>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handleShare} className="text-gray-600 hover:text-gray-900">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleFavorite} className="text-gray-600 hover:text-gray-900">
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-2 h-[600px]">
            {/* Main Image */}
            <div className="col-span-8 relative">
              {validImages.length > 0 ? (
                <div className="relative w-full h-full">
                  <Image
                    src={validImages[selectedImage]}
                    alt={`${listing.address} - ${listing.city}`}
                    fill
                    className="object-cover"
                    priority
                  />
                  {validImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}
                  <div className="absolute bottom-4 right-4">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="bg-white/90 hover:bg-white"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      View All Photos
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Home className="h-16 w-16 mx-auto mb-4" />
                    <p className="text-lg">No Photos Available</p>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Grid */}
            <div className="col-span-4 grid grid-cols-2 gap-2">
              {validImages.slice(1, 5).map((image, index) => (
                <div
                  key={index + 1}
                  className="relative aspect-square cursor-pointer overflow-hidden hover:opacity-80 transition-opacity"
                  onClick={() => setSelectedImage(index + 1)}
                >
                  <Image
                    src={image}
                    alt={`${listing.address} - View ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                  {index === 3 && validImages.length > 5 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold">
                      +{validImages.length - 5} more
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Price and Basic Info */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {formatPrice(listing.price)}
                  </h1>
                  <div className="flex items-center gap-4 text-lg text-gray-600 mb-2">
                    <span className="flex items-center gap-1">
                      <Bed className="h-5 w-5" />
                      {listing.bedrooms} beds
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="h-5 w-5" />
                      {listing.bathrooms} baths
                    </span>
                    <span className="flex items-center gap-1">
                      <Square className="h-5 w-5" />
                      {formatSquareFeet(listing.squareFeet)} sqft
                    </span>
                  </div>
                  <p className="text-gray-600 flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {listing.address}, {listing.city}, {listing.state} {listing.zipCode}
                  </p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="mb-2">
                    {listing.status}
                  </Badge>
                  {listing.mlsNumber && (
                    <p className="text-sm text-gray-500">
                      MLS# {listing.mlsNumber}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="bg-blue-600 hover:bg-blue-700 flex-1">
                  Contact Agent
                </Button>
                <Button variant="outline" className="flex-1">
                  Schedule Tour
                </Button>
              </div>
            </div>

            {/* Property Description */}
            {listing.description && (
              <Card>
                <CardHeader>
                  <CardTitle>About This Home</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{listing.description}</p>
                </CardContent>
              </Card>
            )}

            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property Type</span>
                      <span className="font-medium">{listing.propertyType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Year Built</span>
                      <span className="font-medium">{listing.yearBuilt || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lot Size</span>
                      <span className="font-medium">{listing.lotSize ? `${formatSquareFeet(listing.lotSize)} sqft` : 'N/A'}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bedrooms</span>
                      <span className="font-medium">{listing.bedrooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bathrooms</span>
                      <span className="font-medium">{listing.bathrooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Square Feet</span>
                      <span className="font-medium">{formatSquareFeet(listing.squareFeet)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Price Estimate */}
            <Card>
              <CardHeader>
                <CardTitle>Price Estimate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-900 font-semibold">Estimated Value</span>
                      <span className="text-2xl font-bold text-blue-900">{formatPrice(listing.price * 0.95)}</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <p className="text-sm text-blue-700 mt-2">Based on comparable properties in the area</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-gray-600">Low</p>
                      <p className="font-semibold">{formatPrice(listing.price * 0.9)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Mid</p>
                      <p className="font-semibold">{formatPrice(listing.price * 0.95)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">High</p>
                      <p className="font-semibold">{formatPrice(listing.price * 1.05)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cost of Ownership */}
            <Card>
              <CardHeader>
                <CardTitle>Cost of Ownership</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">${Math.round(listing.price * 0.004).toLocaleString()}/mo</span>
                    <span className="text-sm text-gray-600">30-year fixed, 7.5% interest</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-600 rounded"></div>
                        <span className="text-gray-700">Principal & Interest</span>
                      </div>
                      <span className="font-medium">${Math.round(listing.price * 0.0035).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded"></div>
                        <span className="text-gray-700">Property Taxes</span>
                      </div>
                      <span className="font-medium">${Math.round(listing.price * 0.0005).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                        <span className="text-gray-700">Home Insurance</span>
                      </div>
                      <span className="font-medium">${Math.round(listing.price * 0.0002).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded"></div>
                        <span className="text-gray-700">Utilities & Maintenance</span>
                      </div>
                      <span className="font-medium">${Math.round(listing.price * 0.0002).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map Section */}
            <Card>
              <CardHeader>
                <CardTitle>Around This Home</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center text-gray-500">
                    <MapPin className="h-12 w-12 mx-auto mb-2" />
                    <p>Interactive map coming soon</p>
                    <p className="text-sm">{listing.city}, {listing.state}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Nearby Elementary School</span>
                    <span className="font-medium">Rating: 8/10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Nearby Middle School</span>
                    <span className="font-medium">Rating: 7/10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Nearby High School</span>
                    <span className="font-medium">Rating: 9/10</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Contact Form & Similar Homes */}
          <div className="space-y-6">
            {/* Contact Agent Card */}
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    TH
                  </div>
                  <div>
                    <p className="font-semibold">The Hume Group</p>
                    <p className="text-sm text-gray-600">Real Estate Agent</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Agent
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <div className="text-center text-sm text-gray-600">
                  <p>Get expert insights, market trends, and vacation tips for buyers and sellers.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Homes */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nearby Similar Homes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={validImages[0] || '/placeholder-house.jpg'}
                    alt={`Similar property ${index}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="font-bold text-lg mb-1">{formatPrice(listing.price + (index * 50000) - 100000)}</div>
                  <div className="text-gray-600 text-sm mb-2">
                    {listing.bedrooms} beds • {listing.bathrooms} baths • {formatSquareFeet(listing.squareFeet + (index * 200))} sqft
                  </div>
                  <div className="text-gray-700 text-sm">
                    {listing.city}, {listing.state}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="bg-slate-900 text-white py-16 mt-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Buy or Sell with Confidence</h2>
              <p className="text-slate-300 mb-6">
                Get expert insights, market trends, and vacation tips for buyers and sellers.
                We make the right decisions.
              </p>
              <div className="flex gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Get Started
                </Button>
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-slate-900">
                  Buy With Us
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur rounded-lg p-8">
                <h3 className="text-xl font-semibold mb-4">Stay Informed on Tacoma Real Estate</h3>
                <p className="text-slate-300 mb-4">
                  Get expert insights, market trends, and vacation tips for buyers and sellers.
                </p>
                <NewsletterSubscribe 
                  variant="inline"
                  source="Listing Detail CTA"
                  inputClassName="bg-white/20 border border-white/30 text-white placeholder:text-slate-300"
                  buttonClassName="bg-blue-600 hover:bg-blue-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}