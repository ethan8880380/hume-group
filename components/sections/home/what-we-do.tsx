import { Sparkle } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../../ui/card";

const whatWeDo = [
  {
    title: "Local Market Expertise",
    description: "With deep local expertise and up-to-the-minute market knowledge, committed to finding your match.",
    icon: Sparkle,
  },
  {
    title: "Personalized Guidance", 
    description: "Trusted advice that keeps you moving confidently through every step of your home journey.",
    icon: Sparkle,
  },
  {
    title: "Proven Results",
    description: "Consistently successful sales, excellent happy clients, and a reputation built on trust and results.",
    icon: Sparkle,
  },
];

export default function WhatWeDo() {
  return (
    <div className="bg-primary/10 py-24">
      <div className="container mx-auto px-6">
        <p className="text-primary text-sm font-bold text-center mb-2">The Hume Group</p>
        <h2 className="text-3xl font-medium text-foreground text-center mb-4">Everything You Need to Sell With Confidence</h2>
        <p className="text-lg text-muted-foreground text-center mb-12">We help Tacoma homeowners sell faster, smarter, and with less stress.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whatWeDo.map((item) => (
            <Card key={item.title} className="bg-gradient-to-b from-transparent to-background border-none shadow-none">
              <CardHeader className="flex flex-col items-left gap-4">
                <item.icon className="w-10 h-10 text-white bg-primary rounded-md p-3 mb-12" />
                <CardTitle className="font-medium text-lg">{item.title}</CardTitle>
                <CardDescription>
                  {item.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}