import { Home, Search, TrendingUp, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The Hume Group combines decades of local expertise, personalized service, and unmatched professionalism to guide you seamlessly through your real estate journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card
              key={service.title}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white"
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {service.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

