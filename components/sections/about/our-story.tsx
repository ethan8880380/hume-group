import Image from "next/image";

export default function OurStory() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div>
            <h2 className="text-4xl md:text-5xl font-medium mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                The Hume Group was born in Tacoma as the solution for homeowners who want more than your average agent experience. We&apos;re a team obsessed with local knowledge, personalized attention, and giving you an unfair advantage in the market.
              </p>
              <p>
                With decades of combined real estate experience and a track record of hundreds of successful transactions, we&apos;ve built a reputation for guiding our clients through the often complex process of buying and selling with ease, transparency, and care.
              </p>
              <p>
                We believe real estate isn&apos;t just about selling homes—it&apos;s about understanding people, building relationships, and making smart decisions that deliver lasting value. That&apos;s the promise we make to every client, and it&apos;s what sets us apart from the rest.
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/images/hero.png"
              alt="Tacoma cityscape with Mount Rainier"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

