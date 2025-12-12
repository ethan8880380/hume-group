import { NextRequest, NextResponse } from 'next/server';
import { idxService } from '@/lib/idx-service';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Listing ID is required' },
        { status: 400 }
      );
    }

    let listing = null;
    
    try {
      listing = await idxService.fetchListingById(id);
    } catch (error) {
      console.error('Error fetching listing from IDX service:', error);
      // If IDX service fails, the service will fall back to mock data internally
      // This is a temporary fallback - in production you'd want proper error handling
    }

    if (!listing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(listing);
  } catch (error) {
    console.error('Error fetching listing:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listing' },
      { status: 500 }
    );
  }
} 