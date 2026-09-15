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
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <Button asChild size="lg" variant="outline" className="w-full md:w-auto">
              <Link href="/listings">Our Listings</Link>
            </Button>
            <Button asChild size="lg" className="w-full md:w-auto">
              <Link href="/listing-results">View All Listings</Link>
            </Button>
          </div>
        </div>
        
        {/* Official BuyingBuddy Widget - Shows MLS Listings */}
        <div className="featured-homes-widget overflow-hidden">
        <div
          dangerouslySetInnerHTML={{
          __html: `<bb-widget data-type="FeaturedGallery" data-filter="agent_id:31230+listing_status:active,coming-soon+login-panel:false+header-menu:false+more-listings:false+limit:4+order:create_dt desc"></bb-widget>`,
           }}
        />
        </div>
      </div>
    </div>
  );
}