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

// No mock data - using BuyingBuddy widgets exclusively

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

    // Use IDX service (BuyingBuddy or SimplyRETS) if API key is configured
    if (process.env.BUYINGBUDDY_API_KEY || process.env.SIMPLYRETS_API_KEY) {
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
        console.error('IDX API error:', error);
        return NextResponse.json(
          { 
            error: 'IDX service unavailable. Please configure BuyingBuddy widgets.',
            listings: [],
            total: 0,
            limit,
            offset,
            hasMore: false
          },
          { status: 503 }
        );
      }
    }
    
    // No IDX service configured - return empty results
    return NextResponse.json({
      error: 'Please configure BuyingBuddy credentials in .env.local',
      listings: [],
      total: 0,
      limit,
      offset,
      hasMore: false
    });
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      { status: 500 }
    );
  }
} 