import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface TeamMember {
  name: string;
  image: string;
  description: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Matt Hume",
    image: "/images/team/matt.png",
    description: "Quick Couple Sentence Description about who you are and what you bring to the table."
  },
  {
    name: "Tom Hume", 
    image: "/images/team/tom.png",
    description: "Quick Couple Sentence Description about who you are and what you bring to the table."
  },
  {
    name: "David Gala",
    image: "/images/team/david.png", 
    description: "Quick Couple Sentence Description about who you are and what you bring to the table."
  }
];

export default function Team() {
  return (
    <div className="pb-24">
      <div className="container mx-auto px-6">
        <div className="text-left mb-16">
          <h2 className="text-3xl font-medium mb-4">
            Meet your Tacoma Real Estate Experts
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mb-12">
            At The Hume Group, we blend deep local knowledge with unparalleled dedication to exceed your expectations in buying and selling.
          </p>
          <Link href="/about">  <Button 
            variant="default" 
            size="lg"
          >
            Learn About Our Team
          </Button> 
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index} className="relative aspect-square overflow-hidden border-0">
              <div className="absolute inset-0">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 top-50 bg-gradient-to-t from-black/90 to-transparent" />
              </div>
              <CardContent className="relative h-full flex flex-col justify-end p-3 px-6 text-left">
                <h3 className="text-xl font-medium text-white">
                  {member.name}
                </h3>
                <p className="text-white/70 leading-relaxed text-left">
                  {member.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
