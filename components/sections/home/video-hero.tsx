"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Compass, Trophy } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const teamMembers = [
  { name: "Tom Hume", image: "/images/team/tom.png" },
  { name: "Matt Hume", image: "/images/team/matt.png" },
  { name: "David Hume", image: "/images/team/david.jpg" },
];

const infoCards = [
  {
    title: "Local Market Expertise",
    description:
      "With deep local expertise and up-to-the-minute market knowledge, committed to finding your match.",
    icon: MapPin,
  },
  {
    title: "Personalized Guidance",
    description:
      "Trusted advice that keeps you moving confidently through every step of your home journey.",
    icon: Compass,
  },
  {
    title: "Proven Results",
    description:
      "Consistently successful sales, excellent happy clients, and a reputation built on trust and results.",
    icon: Trophy,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const gridItemVariants = {
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

export default function VideoHero() {
  const gridItems = [
    { type: "image", data: teamMembers[0], order: "order-1" },
    { type: "card", data: infoCards[0], order: "order-2" },
    { type: "image", data: teamMembers[1], order: "order-4 md:order-3" },
    { type: "card", data: infoCards[1], order: "order-3 md:order-4" },
    { type: "image", data: teamMembers[2], order: "order-5" },
    { type: "card", data: infoCards[2], order: "order-6" },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Video Hero Section */}
      <section className="relative flex items-center overflow-hidden min-h-[55vh]">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover will-change-transform [transform:translateZ(0)] [backface-visibility:hidden]"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          {/* Gradient Overlays for depth and readability */}
          <div className="block md:hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30" />
          </div>
          <div className="hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-background/0" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-background/30" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 py-24 md:py-32">
          <motion.div
            className="max-w-3xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-widest">
                <span className="w-8 h-px bg-primary" />
                The Hume Group
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-foreground leading-[1.1] mb-8"
            >
              Meet your Tacoma
              <br />
              <span className="text-primary">Real Estate Experts</span>
            </motion.h1>

            {/* Hero Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-8"
            >
              The Hume Group combines decades of local expertise, personalized
              service, and unmatched professionalism to guide you seamlessly
              through your real estate journey.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="text-background cursor-pointer">
                  Contact Us
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-foreground cursor-pointer hover:bg-primary/[0.03]"
                >
                  About Us
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        {/* Subtle geometric accent */}
        <motion.div
          className="absolute top-1/4 right-[10%] w-64 h-64 rounded-full border border-primary/5 hidden lg:block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1.2 }}
        />
        <motion.div
          className="absolute top-1/3 right-[15%] w-32 h-32 rounded-full border border-primary/10 hidden lg:block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1.2 }}
        />
      </section>

      {/* 3x2 Alternating Grid */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {gridItems.map((item, index) => (
              <motion.div
                key={index}
                variants={gridItemVariants}
                className={item.order}
              >
                {item.type === "image" ? (
                  <div className="relative overflow-hidden rounded-lg bg-muted aspect-[3/4] md:aspect-[4/3]">
                    <Image
                      src={(item.data as (typeof teamMembers)[0]).image}
                      alt={(item.data as (typeof teamMembers)[0]).name}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <Card className="bg-primary/[0.03] border-primary/10 shadow-none h-full aspect-[3/4] md:aspect-[4/3] py-0">
                    <CardHeader className="flex flex-col justify-between md:justify-center gap-4 h-full p-4 md:p-6">
                      {(() => {
                        const cardData = item.data as (typeof infoCards)[0];
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
      </section>
    </div>
  );
}

