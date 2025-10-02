import { Camera, DollarSign, FileText, UserCheck } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const steps = [
  {
    title: "Custom Pricing Strategy",
    description: "We analyze market data and comparable sales to price your home competitively and attract serious buyers.",
    icon: DollarSign,
  },
  {
    title: "Professional Marketing",
    description: "Eye-catching photography, virtual tours, and targeted digital advertising that showcases your home at its best.",
    icon: Camera,
  },
  {
    title: "Active Communication",
    description: "Real-time updates about showings, feedback, and market activity so you're never in the dark.",
    icon: FileText,
  },
  {
    title: "Confident Negotiations",
    description: "We handle all offers, counteroffers, and negotiations to get you the best possible deal with minimal stress.",
    icon: UserCheck,
  },
];

export default function WhatYouCanExpect() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-4">
          <p className="text-primary font-semibold text-sm mb-2">Selling with Us</p>
          <h2 className="text-4xl md:text-5xl font-medium mb-4">
            What You Can Expect
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Buying a home shouldn't be stressful or confusing. We'll guide you through every step with clarity, expertise, and support when you need it most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {steps.map((step) => (
            <Card key={step.title} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-b from-white to-gray-50">
              <CardHeader>
                <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <step.icon className="w-7 h-7 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}


