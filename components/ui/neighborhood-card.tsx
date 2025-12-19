"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface NeighborhoodCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  href: string;
  compact?: boolean;
}

export function NeighborhoodCard({ 
  id,
  name, 
  description, 
  image, 
  href,
  compact = false 
}: NeighborhoodCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection Observer for mobile scroll-into-view
  useEffect(() => {
    if (!isMobile || !cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of card is visible
        rootMargin: '-50px 0px', // Add some offset for better timing
      }
    );

    observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, [isMobile]);

  // Show buttons if hovered (desktop) or in view (mobile)
  const showButtons = isHovered || (isMobile && isInView);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <Card className={`relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-lg ${compact ? 'h-64' : 'h-96'}`}>
        {/* Background Image */}
        <Image
          src={image}
          alt={`${name} neighborhood in Tacoma, WA - homes and community`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Content positioned at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {/* Title and description - animated */}
          <motion.div 
            animate={{
              y: showButtons ? -16 : 0,
              marginBottom: showButtons ? 16 : -24
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <h3 className={`font-medium text-white mb-2 ${compact ? 'text-xl' : 'text-2xl'}`}>
              {name}
            </h3>
            <p className="text-white/90 text-sm line-clamp-2">
              {description}
            </p>
          </motion.div>
          
          {/* Buttons - animated */}
          <motion.div 
            className="flex gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: showButtons ? 1 : 0,
              y: showButtons ? 0 : 20
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Link href={`/listing-results/${id}`}>
              <Button variant="outline" size={compact ? "sm" : "default"}>
                View Homes
              </Button>
            </Link>
            <Link href={href}>
              <Button variant="outline" size={compact ? "sm" : "default"}>
                Explore Neighborhood
              </Button>
            </Link>
          </motion.div>
        </div>
      </Card>
    </div>
  );
}

