"use client";

import SoldListingsMap from "@/components/ui/sold-listings-map";
import { motion } from "framer-motion";

export default function ProvenTrackRecord() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-left mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
            Proven Track Record
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Hundreds of homes sold and successfully closed right here in your
            area. Consistent expertise and proven results.
          </p>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <SoldListingsMap />
        </motion.div>
      </div>
    </section>
  );
}
