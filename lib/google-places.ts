// Google Places API service for fetching reviews

export interface GoogleReview {
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

export interface PlaceDetails {
  name: string;
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
  url: string;
}

export interface GooglePlacesResponse {
  result: PlaceDetails;
  status: string;
  error_message?: string;
}

export async function getGoogleReviews(placeId: string): Promise<PlaceDetails | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    console.error("GOOGLE_PLACES_API_KEY is not configured");
    return null;
  }

  if (!placeId) {
    console.error("Place ID is required");
    return null;
  }

  try {
    const fields = "name,rating,user_ratings_total,reviews,url";
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${apiKey}`;

    const response = await fetch(url, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!response.ok) {
      throw new Error(`Google Places API returned ${response.status}`);
    }

    const data: GooglePlacesResponse = await response.json();

    if (data.status !== "OK") {
      console.error("Google Places API error:", data.status, data.error_message);
      return null;
    }

    return data.result;
  } catch (error) {
    console.error("Error fetching Google reviews:", error);
    return null;
  }
}

// Helper to find your Place ID:
// Visit: https://developers.google.com/maps/documentation/places/web-service/place-id
// Or search: https://www.google.com/maps/search/?api=1&query=The+Hume+Group+Tacoma
// The Place ID will be in the URL after you click on the business


