import { NextRequest, NextResponse } from 'next/server';
import { idxService } from '@/lib/idx-service';

// Types for real estate listings
export interface Listing {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  lotSize: number;
  propertyType: string;
  status: 'active' | 'pending' | 'sold';
  images: string[];
  description: string;
  yearBuilt: number;
  mlsNumber: string;
  latitude?: number;
  longitude?: number;
  features: string[];
  createdAt: string;
  updatedAt: string;
}

// Mock data for development - replace with actual IDX API calls
const mockListings: Listing[] = [
  {
    id: '1',
    address: '1234 Tacoma Ave',
    city: 'Tacoma',
    state: 'WA',
    zipCode: '98402',
    price: 425000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1850,
    lotSize: 0.25,
    propertyType: 'Single Family',
    status: 'active',
    images: [
      'https://placekitten.com/800/600',
      'https://placekitten.com/800/601',
      'https://placekitten.com/800/602'
    ],
    description: 'Beautiful home in the heart of Tacoma with stunning views and modern amenities.',
    yearBuilt: 1995,
    mlsNumber: 'MLS123456',
    latitude: 47.2529,
    longitude: -122.4443,
    features: ['Hardwood Floors', 'Updated Kitchen', 'Fenced Yard', 'Garage'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    address: '5678 Ruston Way',
    city: 'Tacoma',
    state: 'WA',
    zipCode: '98402',
    price: 550000,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2200,
    lotSize: 0.3,
    propertyType: 'Single Family',
    status: 'active',
    images: [
      'https://placekitten.com/800/603',
      'https://placekitten.com/800/604',
      'https://placekitten.com/800/605'
    ],
    description: 'Spacious family home with water views and plenty of room to grow.',
    yearBuilt: 2000,
    mlsNumber: 'MLS123457',
    latitude: 47.2530,
    longitude: -122.4444,
    features: ['Water View', 'Master Suite', 'Deck', 'Fireplace'],
    createdAt: '2024-01-14T10:00:00Z',
    updatedAt: '2024-01-14T10:00:00Z'
  },
  {
    id: '3',
    address: '9012 Proctor St',
    city: 'Tacoma',
    state: 'WA',
    zipCode: '98407',
    price: 375000,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1400,
    lotSize: 0.2,
    propertyType: 'Townhouse',
    status: 'active',
    images: [
      'https://placekitten.com/800/606',
      'https://placekitten.com/800/607',
      'https://placekitten.com/800/608'
    ],
    description: 'Charming townhouse in a quiet neighborhood with low maintenance living.',
    yearBuilt: 2010,
    mlsNumber: 'MLS123458',
    latitude: 47.2531,
    longitude: -122.4445,
    features: ['HOA', 'Patio', 'Storage', 'Modern Appliances'],
    createdAt: '2024-01-13T10:00:00Z',
    updatedAt: '2024-01-13T10:00:00Z'
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');
    const status = searchParams.get('status') || 'active';
    const minPrice = parseInt(searchParams.get('minPrice') || '0');
    const maxPrice = parseInt(searchParams.get('maxPrice') || '999999999');
    const bedrooms = parseInt(searchParams.get('bedrooms') || '0');
    const propertyType = searchParams.get('propertyType') || undefined;
    const city = searchParams.get('city') || undefined;
    const state = searchParams.get('state') || undefined;

    // Use SimplyRETS service if API key is configured, otherwise fall back to mock data
    if (process.env.SIMPLYRETS_API_KEY) {
      try {
        const result = await idxService.fetchListings({
          limit,
          offset,
          status,
          minPrice,
          maxPrice,
          bedrooms,
          propertyType,
          city,
          state,
        });
        
        return NextResponse.json(result);
      } catch (error) {
        console.error('SimplyRETS API error:', error);
        // Fall back to mock data if SimplyRETS fails
      }
    }
    
    // Fall back to mock data for development or if SimplyRETS fails
    {
      // Fall back to mock data for development
      const filteredListings = mockListings.filter(listing => {
        if (status && listing.status !== status) return false;
        if (listing.price < minPrice || listing.price > maxPrice) return false;
        if (bedrooms && listing.bedrooms < bedrooms) return false;
        if (propertyType && listing.propertyType !== propertyType) return false;
        if (city && listing.city.toLowerCase() !== city.toLowerCase()) return false;
        if (state && listing.state.toLowerCase() !== state.toLowerCase()) return false;
        return true;
      });

      // Apply pagination
      const paginatedListings = filteredListings.slice(offset, offset + limit);

      return NextResponse.json({
        listings: paginatedListings,
        total: filteredListings.length,
        limit,
        offset,
        hasMore: offset + limit < filteredListings.length
      });
    }
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      { status: 500 }
    );
  }
} 