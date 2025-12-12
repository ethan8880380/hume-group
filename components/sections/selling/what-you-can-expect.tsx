import { Camera, DollarSign, FileText, UserCheck, Shield, Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const steps = [
  {
    title: "White Glove Listings",
    description: "Top shelf photography and video, staging and prep guidance and premium marketing help our listings stand out.",
    icon: Camera,
  },
  {
    title: "Skilled Negotiations",
    description: "Our vast experience means we bring calm heads and sharp strategy to safeguard your interests every step of the way.",
    icon: UserCheck,
  },
  {
    title: "Custom Pricing Strategy",
    description: "We analyze comparable sales AND current competing inventory to help you price to attract serious buyers.",
    icon: DollarSign,
  },
  {
    title: "Professional Marketing",
    description: "Eye-catching photography, virtual tours and targeted digital advertising showcases your property in its best light!",
    icon: Star,
  },
  {
    title: "Active Communication",
    description: "Real time updates on showing feedback and market activity helps you make informed decisions.",
    icon: FileText,
  },
  {
    title: "Honesty and Integrity",
    description: "We will give it to you straight so that you are always well informed.",
    icon: Shield,
  },
];

export default function WhatYouCanExpect() {
  return (
    <section className="pb-24">
      <div className="container mx-auto px-6">
        <div className="text-left mb-4">
          <h2 className="text-3xl font-medium mb-4">
            Strategy
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Our approach to marketing homes and negotiating on behalf of clients consistently gets higher prices and a smooth process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {steps.map((step) => (
            <Card key={step.title} className="bg-primary/[0.03] border-primary/10 shadow-none">
              <CardHeader>
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <step.icon className="text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-medium">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}


