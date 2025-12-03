import Image from "next/image";

export default function OurStory() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div>
            <h2 className="text-3xl font-medium mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                The Hume Group are Tacoma natives. We know these neighborhoods like the back of our hands, dating back to when the three of us attended Skyline Elementary together and delivered The Tacoma News Tribune to north Tacoma neighborhood homes in the 1980s! We&apos;re a small team with big experience, blending decades of local Tacoma insight, creative marketing, and straight-shooting informed advice to give our clients a real edge.
              </p>
              <p>
                The connections we form with our clients are valued relationships. We are committed to honesty and integrity. We build these client connections on a foundation of trust, beginning with listening carefully, then focusing intently on meeting our clients&apos; goals, with clear communication every step of the way. Since getting licensed in in mid 1990s, we have consistently delivered great results for our clients.
              </p>
              <p>
                Nearly 90% of our real estate clients each year are repeat or referral. We are proud of that and we think it affirms that we are committed to our clients and getting terrific outcomes for them.
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative h-[500px] rounded-lg overflow-hidden border border-primary/10">
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

