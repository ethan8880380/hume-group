import { Home, Search, TrendingUp, MapPin } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    title: "Home Buying",
    description: "Trusted advisors to navigate the market and find your dream home.",
    icon: Home,
  },
  {
    title: "Property Search",
    description: "Strategic searching to uncover the best opportunities.",
    icon: Search,
  },
  {
    title: "Investment Strategy",
    description: "Expert guidance to maximize property investments.",
    icon: TrendingUp,
  },
  {
    title: "Neighborhood Expertise",
    description: "Comprehensive local knowledge for informed decisions.",
    icon: MapPin,
  },
];

export default function OurServices() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-left mb-16">
          <h2 className="text-3xl font-medium mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            The Hume Group combines decades of local expertise, personalized service, and unmatched professionalism to guide you seamlessly through your real estate journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card
              key={service.title}
              className="bg-primary/[0.03] border-primary/10 shadow-none"
            >
              <CardHeader className="text-left pb-0">
                <div className="mb-4 w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="font-medium text-lg">{service.title}</CardTitle>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

