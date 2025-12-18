import Image from "next/image";

interface TeamMember {
  name: string;
  image: string;
  description: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Matt Hume",
    image: "/images/team/matt.png",
    description: "A seasoned Tacoma Realtor. Unmatched local knowledge has made Matt and The Hume Group one of Tacoma's top Realtors or teams, Matt combines strategic guidance with a confident approach. He's a savvy negotiator and a trusted advocate who consistently helps buyers and sellers achieve exceptional results.",
  },
  {
    name: "Tom Hume",
    image: "/images/team/tom.png",
    description: "Known for his calm, approachable style and deep market expertise, Tom brings creativity and clear communication to every home journey. Clients love his responsiveness, attention to detail, and genuine commitment to helping them make smart real estate decisions. Check out Tacoma Real Estate Talk with Tom Hume on YouTube! Tom is among Pierce County's best brokers due to a reputation built on trust.",
  },
  {
    name: "David Gala",
    image: "/images/team/david.jpg",
    description: "David is the definition of professional — proactive, prepared, and laser-focused on helping his clients realize their dreams. It would be hard not to connect with David. He is genuine and sincere at every turn and cares deeply about his clients. David has always been one of the best real estate professionals in Tacoma.",
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
          The Hume Group combines decades of local expertise, personalized service, and unmatched professionalism to guide you seamlessly through your real estate journey.          </p>
        </div>

        {/* Team Members Grid */}
        <div className="space-y-24">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-primary/[0.03] border border-primary/10 p-6 rounded-lg ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div
                className={`relative rounded-sm overflow-hidden aspect-[4/3] ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={member.image}
                  alt={`${member.name} - Tacoma Real Estate Agent at The Hume Group`}
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

