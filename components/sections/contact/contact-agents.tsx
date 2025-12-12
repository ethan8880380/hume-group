"use client";

import Image from "next/image";
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
    email: "matt@thehumegroup.com",
  },
  {
    name: "Tom Hume",
    image: "/images/team/tom.png",
    phone: "(253) 318-1005",
    email: "tom@thehumegroup.com",
  },
  {
    name: "David Gala",
    image: "/images/team/david.jpg",
    phone: "(253) 555-0103",
    email: "david@thehumegroup.com",
  },
];

function ContactAgentCard({ member }: { member: TeamMember }) {
  return (
    <div className="group">
      <div className="relative aspect-square overflow-hidden border-0 rounded-xl transition-all duration-300">
        {/* Background Image */}
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Content positioned at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div>
            <h3 className="text-xl font-medium text-white mb-2">{member.name}</h3>
            {/* Contact Info - always visible */}
            <div className="space-y-2">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactAgents() {
  return (
    <section className="">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
          {teamMembers.map((member, index) => (
            <ContactAgentCard key={index} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
