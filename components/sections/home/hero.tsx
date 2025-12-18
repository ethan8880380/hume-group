"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Compass, Trophy } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const teamMembers = [
  { name: "Tom Hume", image: "/images/team/tom.png" },
  { name: "Matt Hume", image: "/images/team/matt.png" },
  { name: "David Gala", image: "/images/team/david.jpg" },
];

const infoCards = [
  {
    title: "Local Market Expertise",
    description: "With deep local expertise and up-to-the-minute market knowledge, committed to finding your match.",
    icon: MapPin,
  },
  {
    title: "Personalized Guidance",
    description: "Trusted advice that keeps you moving confidently through every step of your home journey.",
    icon: Compass,
  },
  {
    title: "Proven Results",
    description: "Consistently successful sales, happy and satisfied clients, and a reputation built on trust and results.",
    icon: Trophy,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function Hero() {
  // Desktop: image, card, image, card, image, card (alternating)
  // Mobile: image, card, card, image, image, card
  const gridItems = [
    { type: "image", data: teamMembers[0], order: "order-1" },
    { type: "card", data: infoCards[0], order: "order-2" },
    { type: "image", data: teamMembers[1], order: "order-4 md:order-3" },
    { type: "card", data: infoCards[1], order: "order-3 md:order-4" },
    { type: "image", data: teamMembers[2], order: "order-5" },
    { type: "card", data: infoCards[2], order: "order-6" },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full pt-8 md:pt-24 pb-12 md:pb-24">
      {/* Text Content */}
      <div className="flex flex-col items-start gap-3 md:gap-4 text-left w-full container mx-auto px-4 md:px-6 mb-8 md:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl md:mb-2 font-medium text-foreground leading-tight">
          Meet your Tacoma Real Estate Experts
        </h1>
        <p className="text-base md:text-lg max-w-3xl text-foreground/80">
          David Gala and the Hume brothers combine decades of local expertise, personalized service, and unmatched professionalism to guide you seamlessly through your real estate journey.
        </p>
        <div className="w-8 h-[1px] my-4 md:my-4 bg-primary/10"></div>
        <div className="flex flex-row gap-3 md:gap-4">
          <Link href="/contact">
            <Button size="lg" className="text-background cursor-pointer">
              Contact Us
            </Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="outline" className="text-foreground cursor-pointer hover:bg-primary/[0.03]">
              About Us
            </Button>
          </Link>
        </div>
      </div>

      {/* 3x2 Alternating Grid */}
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {gridItems.map((item, index) => (
            <motion.div key={index} variants={itemVariants} className={item.order}>
              {item.type === "image" ? (
                <div className="relative overflow-hidden rounded-lg bg-muted aspect-[3/4] md:aspect-[4/3]">
                  <Image
                    src={(item.data as typeof teamMembers[0]).image}
                    alt={(item.data as typeof teamMembers[0]).name}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <Card className="bg-primary/[0.03] border-primary/10 shadow-none h-full aspect-[3/4] md:aspect-[4/3] py-0">
                  <CardHeader className="flex flex-col justify-between md:justify-center gap-4 h-full p-4 md:p-6">
                    {(() => {
                      const cardData = item.data as typeof infoCards[0];
                      const IconComponent = cardData.icon;
                      return (
                        <>
                          <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-primary shrink-0 md:mx-auto" />
                          <div className="flex flex-col gap-1 md:gap-2">
                            <CardTitle className="font-medium text-sm md:text-xl leading-tight md:text-center">
                              {cardData.title}
                            </CardTitle>
                            <CardDescription className="sm:text-xs md:text-lg leading-relaxed md:text-center">
                              {cardData.description}
                            </CardDescription>
                          </div>
                        </>
                      );
                    })()}
                  </CardHeader>
                </Card>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
