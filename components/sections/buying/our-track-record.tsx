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
    <section className="">
      <div className="container mx-auto px-6">
        <div className="text-left mb-8">
          <h2 className="text-3xl font-medium mb-4">
            Our Track Record
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            With proven expertise in helping buyers find and secure their dream homes, we&apos;re committed to delivering exceptional results and peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Image */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="/images/buying/track.jpg"
              alt="Beautiful Tacoma home"
              fill
              className="object-cover"
            />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col justify-between text-left h-full bg-primary/[0.03] border rounded-lg shadow-none border-primary/10 p-6">
                <div className="text-4xl text-primary font-medium mb-2">
                  {stat.value}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-xl font-medium">
                    {stat.label}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

