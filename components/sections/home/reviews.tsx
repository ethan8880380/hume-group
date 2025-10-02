import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface Review {
  text: string;
  name: string;
  location: string;
  image?: string;
}

interface ReviewsProps {
  reviews?: Review[];
}

export function Reviews({ reviews = defaultReviews }: ReviewsProps) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-primary mb-3 fill-primary" />
            ))}
          </div>
          <h2 className="text-3xl font-medium text-gray-foreground mb-4">
            The Best Sellers in Tacoma
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Hundreds of 5 start reviews confirm there&apos;s no one better to sell your home.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
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
        <p className="text-gray-700 leading-relaxed mb-6">
          {review.text}
        </p>
        
        <div className="flex items-center gap-3 mt-auto">
          <Avatar className="h-12 w-12">
            <AvatarImage src={review.image} alt={review.name} />
            <AvatarFallback className="bg-blue-900 text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-gray-900">{review.name}</p>
            <p className="text-sm text-gray-500">{review.location}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Default review data
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
