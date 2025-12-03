"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";

interface TeamMember {
  name: string;
  image: string;
  phone: string;
  email: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Matt Hume",
    image: "/images/team/matt.png",
    phone: "(253) 555-0101",
    email: "matt@humegroup.com",
  },
  {
    name: "Tom Hume",
    image: "/images/team/tom.png",
    phone: "(253) 555-0102",
    email: "tom@humegroup.com",
  },
  {
    name: "David Gala",
    image: "/images/team/david.jpg",
    phone: "(253) 555-0103",
    email: "david@humegroup.com",
  },
];

function ContactAgentCard({ member }: { member: TeamMember }) {
  const [isHovered, setIsHovered] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);
  const [contactHeight, setContactHeight] = useState(0);

  useEffect(() => {
    if (contactRef.current) {
      setContactHeight(contactRef.current.scrollHeight);
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
              marginBottom: isHovered ? 0 : -(contactHeight + 8),
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <h3 className="text-xl font-medium text-white mb-2">{member.name}</h3>

            {/* Contact Info - measured and hidden with exact negative margin */}
            <motion.div
              ref={contactRef}
              animate={{
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-2"
            >
              <a
                href={`tel:${member.phone}`}
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                {member.phone}
              </a>
              <a
                href={`mailto:${member.email}`}
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                {member.email}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function ContactAgents() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-left mb-16">
          <h2 className="text-3xl font-medium mb-4">Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Get in touch with any of our experienced agents directly. We're here to help with all your real estate needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <ContactAgentCard key={index} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}


