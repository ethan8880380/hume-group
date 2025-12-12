import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SoldListingsMap from "@/components/ui/sold-listings-map";

export default function MapSection() {
  return (
    <div className="container mx-auto px-4 md:px-6 pb-12 md:pb-0">
      <section className="relative">
        <SoldListingsMap className="h-[400px] md:h-[600px] bg-gray-100 rounded-lg overflow-hidden" />
        
        <div className="absolute bottom-2 left-2 md:top-3 md:left-3 z-10 w-[calc(100%-1rem)] md:w-80">
          <Card className="rounded-md bg-white/60 backdrop-blur-xs border-primary/10 shadow-lg py-0">
            <CardContent className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-medium text-foreground mb-1">
                Our Recent Sales
              </h3>
              <p className="text-sm md:text-base text-foreground/80 mb-4 md:mb-6">
                Hundreds of homes sold recently in Tacoma and surrounding areas.
              </p>
              <Button size="lg" className="w-full cursor-pointer text-sm md:text-base">
                Get in Touch
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}