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
    <section className="py-24 bg-primary text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium mb-4">
            Our Track Record
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            With a proven track record of successful sales, we&apos;re not just here to list your home—we&apos;re here to get you results that exceed expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="/images/hero.png"
              alt="Modern waterfront home"
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


