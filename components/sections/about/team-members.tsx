"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Youtube } from "lucide-react";

interface TeamMemberLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface TeamMember {
  name: string;
  image: string;
  description: string;
  link?: TeamMemberLink;
}

const teamMembers: TeamMember[] = [
  {
    name: "Matt Hume",
    image: "/images/team/matt.png",
    description:
      "A seasoned Tacoma Realtor. Unmatched local knowledge has made Matt and The Hume Group one of Tacoma's top Realtors or teams, Matt combines strategic guidance with a confident approach. He's a savvy negotiator and a trusted advocate who consistently helps buyers and sellers achieve exceptional results.",
  },
  {
    name: "Tom Hume",
    image: "/images/team/tom.png",
    description:
      "Known for his calm, approachable style and deep market expertise, Tom brings creativity and clear communication to every home journey. Clients love his responsiveness, attention to detail, and genuine commitment to helping them make smart real estate decisions. Tom is among Pierce County's best brokers due to a reputation built on trust. Check out Tacoma Real Estate Talk with Tom Hume on YouTube!",
    link: {
      label: "Tacoma Real Estate Talk with Tom Hume",
      href: "https://youtube.com/@tacomarealestatetalk",
      icon: <Youtube className="w-4 h-4" />,
    },
  },
  {
    name: "David Gala",
    image: "/images/team/david.jpg",
    description:
      "David is the definition of professional — proactive, prepared, and laser-focused on helping his clients realize their dreams. It would be hard not to connect with David. He is genuine and sincere at every turn and cares deeply about his clients. David has always been one of the best real estate professionals in Tacoma.",
  },
];

export default function TeamMembers() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-left mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
            Meet the Team
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Decades of local expertise, personalized service, and unmatched
            professionalism to guide you through your real estate journey.
          </p>
        </motion.div>

        <div className="space-y-16">
          {teamMembers.map((member, index) => {
            const isReversed = index % 2 === 1;

            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center"
              >
                <div
                  className={`lg:col-span-3 relative rounded-xl overflow-hidden aspect-[4/3] ${
                    isReversed ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={member.image}
                    alt={`${member.name} - Tacoma Real Estate Agent at The Hume Group`}
                    fill
                    className="object-cover"
                  />
                </div>

                <div
                  className={`lg:col-span-2 ${
                    isReversed ? "lg:order-1" : ""
                  }`}
                >
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                    {member.name}
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {member.description}
                  </p>
                  {member.link && (
                    <a
                      href={member.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex items-center gap-2.5 rounded-lg border border-primary/15 bg-primary/[0.04] px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/[0.08]"
                    >
                      {member.link.icon}
                      {member.link.label}
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
