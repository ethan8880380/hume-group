import { NextResponse } from "next/server";
import { getGoogleReviews, type PlaceDetails } from "@/lib/google-places";

// Cache the response for 24 hours
export const revalidate = 86400;

export async function GET() {
  try {
    const placeId = process.env.GOOGLE_PLACE_ID;

    if (!placeId) {
      console.error("GOOGLE_PLACE_ID is not configured");
      return NextResponse.json(
        { error: "Google Place ID not configured" },
        { status: 500 }
      );
    }

    const placeDetails = await getGoogleReviews(placeId);

    if (!placeDetails) {
      return NextResponse.json(
        { error: "Failed to fetch reviews from Google" },
        { status: 500 }
      );
    }

    // Transform to a cleaner format for the frontend
    const reviews = placeDetails.reviews?.map((review) => ({
      text: review.text,
      name: review.author_name,
      rating: review.rating,
      image: review.profile_photo_url,
      relativeTime: review.relative_time_description,
      authorUrl: review.author_url,
    })) || [];

    return NextResponse.json({
      success: true,
      data: {
        businessName: placeDetails.name,
        rating: placeDetails.rating,
        totalReviews: placeDetails.user_ratings_total,
        googleUrl: placeDetails.url,
        reviews,
      },
    });
  } catch (error) {
    console.error("Error in reviews API:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}


