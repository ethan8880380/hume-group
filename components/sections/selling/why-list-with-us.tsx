import { CheckCircle2, TrendingUp, Users, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const benefits = [
  {
    title: "Local Market Expertise",
    description: "We know the Tacoma market inside and out. Our deep local knowledge helps price your home competitively.",
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
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium mb-4">
            Why List With Us?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Selling your home isn&apos;t just a transaction—it&apos;s one of the biggest financial decisions you&apos;ll ever make. That&apos;s why we go the extra mile to get you the best possible outcome.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Benefits List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="p-6 border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
                <div className="mb-4">
                  <benefit.icon className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </Card>
            ))}
          </div>

          {/* Image with Arrow Pointing */}
          <div className="relative">
            <div className="relative h-[600px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/cta.png"
                alt="Beautiful modern home interior"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative Arrow - you can customize this */}
            <div className="absolute -left-12 top-20 hidden lg:block">
              <svg width="100" height="100" viewBox="0 0 100 100" className="text-gray-400">
                <path 
                  d="M10,50 Q30,20 50,50 T90,50" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  fill="none"
                  strokeDasharray="5,5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


