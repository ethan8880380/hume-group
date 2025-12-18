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
    <section className="pb-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Benefits List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full order-2">
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
          <div className="relative order-1">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/selling/why.jpg"
                alt="Staged Tacoma home ready for sale by The Hume Group"
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


