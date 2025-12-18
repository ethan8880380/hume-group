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
    description: "Get access to brand new listings the moment they become available.",
    icon: Key,
  },
  {
    title: "Personalized Service",
    description: "From your first search to closing day, we&apos;re with you every step of the way with dedicated, white-glove service.",
    icon: Heart,
  },
];

export default function WhyBuyWithUs() {
  return (
    <section className="pb-24">
      <div className="container mx-auto px-4 md:px-6">

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

          {/* Image */}
          <div className="relative order-1">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/buying/why.jpg"
                alt="Tacoma home buyers touring a property with The Hume Group"
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

