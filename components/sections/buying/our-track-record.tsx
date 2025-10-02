import Image from "next/image";

const stats = [
  {
    value: "500+",
    label: "Homes Purchased",
    description: "We've helped hundreds of families find their perfect home in the Tacoma area.",
  },
  {
    value: "92%",
    label: "Offer Acceptance Rate",
    description: "Our strategic approach gets your offers accepted, even in competitive markets.",
  },
  {
    value: "$15K",
    label: "Avg. Savings",
    description: "On average, our buyers save $15,000 through expert negotiation and market knowledge.",
  },
  {
    value: "4.9/5",
    label: "Client Satisfaction",
    description: "Our buyers consistently rate us 5 stars for service, expertise, and results.",
  },
];

export default function OurTrackRecord() {
  return (
    <section className="py-24 bg-primary text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium mb-4">
            Our Track Record
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            With proven expertise in helping buyers find and secure their dream homes, we&apos;re committed to delivering exceptional results and peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="/images/hero.png"
              alt="Beautiful Tacoma home"
              fill
              className="object-cover"
            />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center sm:text-left">
                <div className="text-5xl md:text-6xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-xl font-semibold mb-2 text-white/90">
                  {stat.label}
                </div>
                <p className="text-white/70 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

