import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SoldListingsMap from "@/components/ui/sold-listings-map";

export default function SalesMapSection() {
  return (
    <section className="pb-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="relative">
          <SoldListingsMap />

          
          {/* Overlay Card */}
          <div className="absolute top-8 right-8 z-10">
            <Card className="w-80 bg-white/95 backdrop-blur-sm shadow-2xl">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Our Recent Sales
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  View every home we&apos;ve sold and see why our clients trust us to deliver exceptional results.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Get Top Dollar — Book a Call Now
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Location badge */}
          <div className="absolute bottom-6 left-6 z-10">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg">
              <div className="font-semibold text-gray-900 text-sm mb-0.5">Tacoma & Surrounding Areas</div>
              <div className="text-xs text-muted-foreground">Hundreds of homes sold in the last year</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


