"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface TeamMember {
  name: string;
  image: string;
  description: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Matt Hume",
    image: "/images/team/matt.png",
    description: "A seasoned Tacoma Realtor. Unmatched local knowledge has made Matt and The Hume Group one of Tacoma&apos;s top Realtors or teams, Matt combines strategic guidance with a confident approach. He&apos;s a savvy negotiator and a trusted advocate who consistently helps buyers and sellers achieve exceptional results."
  },
  {
    name: "Tom Hume", 
    image: "/images/team/tom.png",
    description: "Known for his calm, approachable style and deep market expertise, Tom brings creativity and clear communication to every home journey. Clients love his responsiveness, attention to detail, and genuine commitment to helping them make smart real estate decisions. Check out Tacoma Real Estate Talk with Tom Hume on YouTube! Tom is among Pierce County's best brokers due to a reputation built on trust."
  },
  {
    name: "David Gala",
    image: "/images/team/david.jpg", 
    description: "David is the definition of professional — proactive, prepared, and laser-focused on helping his clients realize their dreams. It would be hard not to connect with David. He is genuine and sincere at every turn and cares deeply about his clients. David has always been one of the best real estate professionals in Tacoma."
  }
];

function TeamMemberCard({ member }: { member: TeamMember }) {
  const [isHovered, setIsHovered] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [descHeight, setDescHeight] = useState(0);

  useEffect(() => {
    if (descriptionRef.current) {
      setDescHeight(descriptionRef.current.scrollHeight);
    }
  }, []);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <div className="relative aspect-square overflow-hidden border-0 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
        {/* Background Image */}
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        
        {/* Content positioned at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <motion.div 
            animate={{
              y: isHovered ? -16 : 0,
              marginBottom: isHovered ? 0 : -(descHeight + 8)
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <h3 className="text-xl font-medium text-white mb-2">
              {member.name}
            </h3>
            
            {/* Description - measured and hidden with exact negative margin */}
            <motion.div
              ref={descriptionRef}
              animate={{
                opacity: isHovered ? 1 : 0
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <p className="text-white/70 text-sm leading-relaxed">
                {member.description}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <div className="pb-12 md:pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-left mb-8 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-medium mb-3 md:mb-4">
            Meet your Tacoma Real Estate Experts
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mb-6 md:mb-12">
            At The Hume Group, we blend deep local knowledge with unparalleled dedication to exceed your expectations in buying and selling.
          </p>
          <Link href="/about">
            <Button 
              variant="default" 
              size="lg"
              className="w-full sm:w-auto"
            >
              Learn About Our Team
            </Button> 
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
}
