import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SoldListingsMap from "@/components/ui/sold-listings-map";
import { getAllSoldListings } from "@/lib/sold-listings";

// Get actual sold listings data
const salesLocations = getAllSoldListings();

export default function MapSection() {
  return (
    <div className="container mx-auto px-6">
      <section className="relative">
        <SoldListingsMap className="h-[600px] bg-gray-100 rounded-lg overflow-hidden" />
        
        <div className="absolute top-3 left-3 z-10">
          <Card className="w-80 rounded-md bg-white/10 backdrop-blur-xs border-primary/10 shadow-lg">
            <CardContent>
              <h3 className="text-xl font-medium text-foreground mb-1">
                Our Recent Sales
              </h3>
              <p className="text-foreground/80 mb-6">
                Hundreds of homes sold in the last year!
              </p>
              <Button size="lg" className="w-full cursor-pointer">
                Get Top Dollar — Book a Call Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}