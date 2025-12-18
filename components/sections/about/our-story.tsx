"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

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

const imageVariants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function OurStory() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="relative w-full h-full"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <Image
              src="/images/hero.png"
              alt="Tacoma cityscape with Mount Rainier"
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlays for depth and readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 py-24 md:py-32">
          <motion.div
            className="max-w-3xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-foreground leading-[1.1] mb-8"
            >
              Tacoma Natives.
              <br />
              <span className="text-primary">Real Estate Experts.</span>
            </motion.h1>

            {/* Hero Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-foreground/80 leading-relaxed"
            >
              We&apos;re a small team with big experience, blending decades of
              local Tacoma insight, creative marketing, and straight-shooting
              informed advice to give our clients a real edge.
            </motion.p>
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

      {/* Full Story Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-10">
              Our Story
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column - Text (spans 2 columns) */}
            <div className="lg:col-span-2 space-y-6">
              <motion.p
                className="text-lg md:text-xl text-foreground/80 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
              >
                The Hume Group are Tacoma natives. We know these neighborhoods
                like the back of our hands, dating back to when the three of us
                attended Skyline Elementary together and delivered The Tacoma
                News Tribune to north Tacoma neighborhood homes in the 1980s!
                We&apos;re a small team with big experience, blending decades of
                local Tacoma insight, creative marketing, and straight-shooting
                informed advice to give our clients a real edge.
              </motion.p>

              <motion.p
                className="text-lg md:text-xl text-foreground/80 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
              >
                The connections we form with our clients are valued
                relationships. We are committed to honesty and integrity. We
                build these client connections on a foundation of trust,
                beginning with listening carefully, then focusing intently on
                meeting our clients&apos; goals, with clear communication every
                step of the way. Since getting licensed in the mid 1990s, we
                have consistently delivered great results for our clients.
              </motion.p>
            </div>

            {/* Right Column - Callout */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.7,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
            >
              <div className="bg-primary/[0.05] border border-primary/10 rounded-xl p-6 md:p-8 h-full flex flex-col justify-center">
                <Heart className="w-8 h-8 text-primary mb-4" />
                <p className="text-2xl md:text-3xl font-medium text-foreground leading-tight mb-3">
                  90%
                </p>
                <p className="text-base md:text-lg text-foreground/90 leading-relaxed font-medium mb-2">
                  Repeat & Referral Clients
                </p>
                <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                  We are proud of that and we think it affirms our commitment to
                  getting terrific outcomes for our clients.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
