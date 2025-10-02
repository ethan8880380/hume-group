import Image from "next/image";
import { Card } from "@/components/ui/card";

interface TeamMember {
  name: string;
  image: string;
  description: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Matt Hume",
    image: "/images/team/matt.png",
    description: "Matt has been advising his community on smart real estate since 2006 and is known for his analytical approach and fierce negotiating skills for his clients. Whether you're buying or selling, Matt's expert insight and deep local knowledge ensure you get the best outcome possible.",
  },
  {
    name: "Tom Hume",
    image: "/images/team/tom.png",
    description: "Tom founded The Hume Group and has been a licensed real estate agent in Tacoma since 1999. Known for his exceptional client service and market expertise, Tom brings three decades of experience to your corner to guide you through every step of the process.",
  },
  {
    name: "David Gala",
    image: "/images/team/david.png",
    description: "David is a third-party risk specialist deeply involved in our team's due diligence and analytical support. His extensive experience in transaction integrity helps our clients rest easier knowing every angle is covered in their favor.",
  },
];

export default function TeamMembers() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-left mb-16">
          <h2 className="text-3xl font-medium mb-4">
            Team Members
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            The Hume Group combines decades of local expertise, personalized service, and unmatched professionalism to guide you seamlessly through your real estate journey.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="space-y-24">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className={`grid grid-cols-1 lg:grid-cols-3 gap-12 items-center bg-primary/[0.03] border border-primary/10 p-6 rounded-lg ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div
                className={`relative rounded-sm overflow-hidden lg:col-span-2 aspect-[4/3] ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <h3 className="text-3xl font-semibold mb-4">{member.name}</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

