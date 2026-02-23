"use client";

import { Home, Search, TrendingUp, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

const services: Service[] = [
  {
    title: "Home Buying",
    description:
      "Trusted advisors to navigate the market and find your dream home.",
    icon: Home,
  },
  {
    title: "Property Search",
    description:
      "Strategic searching to uncover the best opportunities.",
    icon: Search,
  },
  {
    title: "Investment Strategy",
    description:
      "Expert guidance to maximize property investments.",
    icon: TrendingUp,
  },
  {
    title: "Neighborhood Expertise",
    description:
      "Comprehensive local knowledge for informed decisions.",
    icon: MapPin,
  },
];

export default function OurServices() {
  return (
    <section className="py-24 bg-primary/[0.02]">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-left mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            From your first showing to closing day, we provide the insight and
            support you need at every step.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group rounded-xl border border-primary/10 bg-background p-6 transition-colors hover:border-primary/20"
            >
              <div className="mb-4 w-11 h-11 bg-primary rounded-lg flex items-center justify-center">
                <service.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="font-medium text-lg text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
