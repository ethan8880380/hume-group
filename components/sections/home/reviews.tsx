import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, ExternalLink } from "lucide-react";
import { getGoogleReviews } from "@/lib/google-places";
import Link from "next/link";

interface Review {
  text: string;
  name: string;
  location?: string;
  image?: string;
  rating?: number;
  relativeTime?: string;
  authorUrl?: string;
}

interface ReviewsProps {
  reviews?: Review[];
}

async function fetchGoogleReviews(): Promise<{
  reviews: Review[];
  rating: number | null;
  totalReviews: number | null;
  googleUrl: string | null;
}> {
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!placeId || !process.env.GOOGLE_PLACES_API_KEY) {
    return { reviews: defaultReviews, rating: null, totalReviews: null, googleUrl: null };
  }

  try {
    const placeDetails = await getGoogleReviews(placeId);

    if (!placeDetails || !placeDetails.reviews) {
      return { reviews: defaultReviews, rating: null, totalReviews: null, googleUrl: null };
    }

    const reviews: Review[] = placeDetails.reviews.map((review) => ({
      text: review.text,
      name: review.author_name,
      image: review.profile_photo_url,
      rating: review.rating,
      relativeTime: review.relative_time_description,
      authorUrl: review.author_url,
    }));

    return {
      reviews,
      rating: placeDetails.rating,
      totalReviews: placeDetails.user_ratings_total,
      googleUrl: placeDetails.url,
    };
  } catch (error) {
    console.error("Error fetching Google reviews:", error);
    return { reviews: defaultReviews, rating: null, totalReviews: null, googleUrl: null };
  }
}

export async function Reviews({ reviews: propReviews }: ReviewsProps) {
  const { reviews, rating, totalReviews, googleUrl } = propReviews 
    ? { reviews: propReviews, rating: null, totalReviews: null, googleUrl: null }
    : await fetchGoogleReviews();

  const displayRating = rating ?? 5;
  const displayTotal = totalReviews ?? "Hundreds";

  return (
    <section className="py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex gap-1 mb-2 md:mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 md:w-5 md:h-5 mb-2 md:mb-3 ${
                  i < Math.floor(displayRating)
                    ? "text-primary fill-primary"
                    : i < displayRating
                    ? "text-primary fill-primary/50"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <h2 className="text-2xl md:text-3xl font-medium text-gray-foreground mb-3 md:mb-4">
            The Best Sellers in Tacoma
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
            {typeof displayTotal === "number" 
              ? `${displayTotal.toLocaleString()} 5-star reviews confirm there's no one better to sell your home.`
              : "Hundreds of 5-star reviews confirm there's no one better to sell your home."}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {reviews.slice(0, 3).map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>

        {/* View All Link */}
        {googleUrl && (
          <div className="text-center mt-8">
            <Link
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              View all reviews on Google
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const initials = review.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="border border-primary/10 bg-primary/[0.03] shadow-none h-full">
      <CardContent className="flex flex-col justify-between h-full">
        {/* Rating stars for individual review */}
        {review.rating && (
          <div className="flex gap-0.5 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating! ? "text-primary fill-primary" : "text-gray-300"
                }`}
              />
            ))}
          </div>
        )}
        
        <p className="text-gray-700 leading-relaxed mb-4 line-clamp-6">
          {review.text}
        </p>
        
        <div className="flex items-center gap-3 mt-auto">
          <Avatar className="h-12 w-12">
            <AvatarImage src={review.image} alt={review.name} />
            <AvatarFallback className="bg-blue-900 text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            {review.authorUrl ? (
              <Link
                href={review.authorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gray-900 hover:text-primary"
              >
                {review.name}
              </Link>
            ) : (
              <p className="font-semibold text-gray-900">{review.name}</p>
            )}
            {review.relativeTime && (
              <p className="text-sm text-gray-500">{review.relativeTime}</p>
            )}
            {review.location && !review.relativeTime && (
              <p className="text-sm text-gray-500">{review.location}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Default review data (fallback when Google API is not configured)
const defaultReviews: Review[] = [
  {
    text: "I contacted Matt Hume to help me buy my north Tacoma home and I could not be any happier! Matt helped guide me through the entire process. He showed me many homes and we found the right one. He negotiated on my behalf and had good referrals from home inspectors to lenders and even contractors post closing.",
    name: "John and Lisa",
    location: "Proctor District",
    image: "https://placekitten.com/100/100",
  },
  {
    text: "Working with The Hume Group was easy, and they made my home-buying dreams come true! We directly worked with Tom, a personable and friendly individual who demonstrated a genuine desire to help us achieve our goals. Tom is attentive, easy to get in touch with, and on top of the market - more agile and caring than some of the larger firms I've worked with.",
    name: "John and Lisa",
    location: "Proctor District",
    image: "https://placekitten.com/101/101",
  },
  {
    text: "Best Realtor EVER! Matt Hume's expertise and negotiation skills are truly top notch. His knowledge of North Tacoma and the University Of Puget Sound area are also top notch. His guidance throughout the process made our listing nothing short of exceptional. We are truly grateful for the great and super smooth experience we've had with The Hume Group.",
    name: "John and Lisa",
    location: "Proctor District",
    image: "https://placekitten.com/102/102",
  },
  {
    text: "I contacted Matt Hume to help me buy my north Tacoma home and I could not be any happier! Matt helped guide me through the entire process. He showed me many homes and we found the right one. He negotiated on my behalf and had good referrals from home inspectors to lenders and even contractors post closing.",
    name: "John and Lisa",
    location: "Proctor District",
    image: "https://placekitten.com/103/103",
  },
  {
    text: "Working with The Hume Group was easy, and they made my home-buying dreams come true! We directly worked with Tom, a personable and friendly individual who demonstrated a genuine desire to help us achieve our goals. Tom is attentive, easy to get in touch with, and on top of the market - more agile and caring than some of the larger firms I've worked with.",
    name: "John and Lisa",
    location: "Proctor District",
    image: "https://placekitten.com/104/104",
  },
  {
    text: "Best Realtor EVER! Matt Hume's expertise and negotiation skills are truly top notch. His knowledge of North Tacoma and the University Of Puget Sound area are also top notch. His guidance throughout the process made our listing nothing short of exceptional. We are truly grateful for the great and super smooth experience we've had with The Hume Group.",
    name: "John and Lisa",
    location: "Proctor District",
    image: "https://placekitten.com/105/105",
  },
];
