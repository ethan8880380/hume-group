"use client";

import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ImageProps {
  src: string;
  alt?: string;
}

interface Testimonial {
  numberOfStars: number;
  quote: string;
  image: ImageProps;
  name: string;
  position: string;
  companyName: string;
  logo: ImageProps;
}

interface ReviewsProps {
  testimonials: Testimonial[];
}

export function Reviews({ testimonials }: ReviewsProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="overflow-hidden container mx-auto px-6 py-12">
      <div className="container">
        <Carousel
          setApi={setApi}
          opts={{
            loop: true,
            align: "start",
          }}
          className="overflow-hidden"
        >
          <div className="relative pt-20 md:pb-20 md:pt-0">
            <CarouselContent className="ml-0">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-0">
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute top-0 flex w-full items-start justify-between md:bottom-0 md:top-auto md:items-end">
              <div className="mt-2.5 flex w-full items-start justify-start md:mb-2.5 md:mt-0">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={cn("mx-[3px] inline-block size-2 rounded-full", {
                      "bg-black": current === index + 1,
                      "bg-neutral-300": current !== index + 1,
                    })}
                  />
                ))}
              </div>
              <div className="flex items-end justify-end gap-2 md:gap-4">
                <CarouselPrevious className="static right-0 top-0 size-12 -translate-y-0" />
                <CarouselNext className="static right-0 top-0 size-12 -translate-y-0" />
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-0">
        <div className="grid w-full auto-cols-fr grid-cols-1 items-center justify-center gap-12 md:grid-cols-2 md:gap-10 lg:gap-x-20">
          <div className="order-last md:order-last">
            <img
              src={testimonial.image.src}
              alt={testimonial.image.alt}
              className="aspect-square w-full object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col items-start">
            <div className="mb-6 flex md:mb-8">
              {Array(testimonial.numberOfStars)
                .fill(null)
                .map((_, starIndex) => (
                  <Star key={starIndex} className="size-6 fill-yellow-400 text-yellow-400" />
                ))}
            </div>
            <blockquote className="text-xl font-medium md:text-3xl">{testimonial.quote}</blockquote>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Default testimonial data
const testimonial = {
  numberOfStars: 5,
  quote:
    '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."',
  image: {
    src: "/images/hero.png",
    alt: "Testimonial image 1",
  },
  name: "Name Surname",
  position: "Position",
  companyName: "Company name",
  logo: {
    src: "/images/hero.png",
    alt: "Company logo 1",
  },
};

export const defaultTestimonials: Testimonial[] = [testimonial, testimonial];
