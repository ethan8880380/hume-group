import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface TeamMember {
  name: string;
  image: string;
  description: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Matt Hume",
    image: "/images/hero.png",
    description: "Quick Couple Sentence Description about who you are and what you bring to the table."
  },
  {
    name: "Tom Hume", 
    image: "/images/hero.png",
    description: "Quick Couple Sentence Description about who you are and what you bring to the table."
  },
  {
    name: "David Gala",
    image: "/images/hero.png", 
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
          <Button 
            variant="default" 
            size="lg"
          >
            Learn About Our Team
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index} className="relative aspect-square overflow-hidden border-0 shadow-lg">
              <div className="absolute inset-0">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              <CardContent className="relative h-full flex flex-col justify-end p-3 px-6 text-left">
                <h3 className="text-xl font-medium text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-200 leading-relaxed text-left">
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
