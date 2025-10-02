import Image from "next/image";

const stats = [
  {
    value: "#1",
    label: "Top Producing Team",
    description: "Consistently ranked as one of the top real estate teams in the Tacoma area.",
  },
  {
    value: "85%",
    label: "List-to-Sale Ratio",
    description: "Our homes sell for an average of 85% of list price, well above the market average.",
  },
  {
    value: "12",
    label: "Average Days to Sale",
    description: "We sell homes 40% faster than the typical agent in our market.",
  },
  {
    value: "97%",
    label: "Avg. Sale-to-List Price",
    description: "Our strategic pricing and negotiation gets you top dollar every time.",
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
            With a proven track record of successful sales, we&apos;re not just here to list your home—we&apos;re here to get you results that exceed expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Image */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="/images/selling/track.jpg"
              alt="Modern waterfront home"
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


