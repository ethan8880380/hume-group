import { Button } from "../../ui/button";
import { BBWidget } from "../../ui/bb-widget";
import Link from "next/link";

export default function FeaturedHomes() {
  return (
    <div className="bg-background pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8 gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl md:text-3xl font-medium text-foreground text-left">
              Featured Homes
            </h2>
            <p className="text-base md:text-lg text-muted-foreground text-left">
              Discover the latest properties in Tacoma and surrounding areas.
            </p>
          </div>
          <Link href="/listing-results" className="w-full md:w-auto shrink-0">
            <Button size="lg" className="group w-full md:w-auto">
              View All Listings
            </Button>
          </Link>
        </div>
        
        {/* Official BuyingBuddy Widget - Shows MLS Listings */}
        <div className="overflow-hidden">
        <div
          dangerouslySetInnerHTML={{
          __html: `<bb-widget data-type="FeaturedGallery" data-filter="agent_id:31230+listing_status:active+login-panel:false+header-menu:false+limit:4+order:price"></bb-widget>`,
           }}
        />
        </div>
      </div>
    </div>
  );
}