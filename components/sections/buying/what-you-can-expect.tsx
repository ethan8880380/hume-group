import { Search, FileSearch, Home, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const steps = [
  {
    title: "Initial Consultation",
    description: "We'll discuss your needs, budget, and timeline to create a personalized home search strategy.",
    icon: Search,
  },
  {
    title: "Tailored Home Tours",
    description: "View carefully curated properties that match your criteria, with expert insights on each home's value and potential.",
    icon: Home,
  },
  {
    title: "Offer & Negotiation",
    description: "We'll help you craft a competitive offer and negotiate terms that protect your interests and fit your budget.",
    icon: FileSearch,
  },
  {
    title: "Smooth Closing",
    description: "From inspection to final walkthrough, we coordinate every detail to ensure a seamless closing experience.",
    icon: CheckCircle,
  },
];

export default function WhatYouCanExpect() {
  return (
    <section className="pb-24">
      <div className="container mx-auto px-6">
        <div className="text-left mb-4">
          <h2 className="text-3xl font-medium mb-4">
            What You Can Expect
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Buying a home shouldn&apos;t be stressful or confusing. We&apos;ll guide you through every step with clarity, expertise, and support when you need it most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
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

