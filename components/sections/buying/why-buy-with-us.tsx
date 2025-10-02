import { Home, Shield, Key, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const benefits = [
  {
    title: "Deep Local Knowledge",
    description: "We know every neighborhood, school district, and hidden gem in the Tacoma area to help you find the perfect fit.",
    icon: Home,
  },
  {
    title: "Buyer Advocacy",
    description: "We work exclusively for you, protecting your interests and negotiating the best possible terms on your behalf.",
    icon: Shield,
  },
  {
    title: "Access to Listings",
    description: "Get early access to new listings, off-market opportunities, and exclusive properties before they hit the market.",
    icon: Key,
  },
  {
    title: "Personalized Service",
    description: "From your first search to closing day, we're with you every step of the way with dedicated, white-glove service.",
    icon: Heart,
  },
];

export default function WhyBuyWithUs() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium mb-4">
            Why Buy With Us?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Buying a home is one of life's biggest decisions. Our experienced team ensures you have the knowledge, resources, and support to make the right choice with confidence.
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

