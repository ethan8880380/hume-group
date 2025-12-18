import { CheckCircle2, TrendingUp, Users, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const benefits = [
  {
    title: "Local Market Expertise",
    description: "We know the Tacoma neighborhoods, the people and the nuances of this market on the Puget Sound like no other agent or team.",
    icon: Award,
  },
  {
    title: "Award-Winning Strategy",
    description: "Our proven marketing approach consistently delivers faster sales and higher prices for our clients.",
    icon: TrendingUp,
  },
  {
    title: "White-Glove Listings",
    description: "Professional photography, staging guidance, and premium marketing materials that make your home shine.",
    icon: CheckCircle2,
  },
  {
    title: "Skilled Negotiations",
    description: "Expert negotiation skills that protect your interests and maximize your final sale price.",
    icon: Users,
  },
];

export default function WhyListWithUs() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-left mb-8">
          <h2 className="text-3xl font-medium mb-4">
            Why List With Us?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Selling your home isn&apos;t just a transaction! It&apos;s one of the biggest financial decisions you&apos;ll ever make. We take that seriously! Our clients trust us to apply our experience and strategic thinking to getting the best outcome.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Benefits List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="p-6 bg-primary/[0.03] border-primary/10 justify-between shadow-none">
                <div className="mb-4">
                  <benefit.icon className="w-10 h-10 text-white bg-primary rounded-md p-2" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-medium">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Image with Arrow Pointing */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/selling/why.jpg"
                alt="Professional real estate photography of a Tacoma home listing"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


