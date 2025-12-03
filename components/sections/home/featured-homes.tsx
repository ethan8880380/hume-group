import { Button } from "../../ui/button";
import { BBWidget } from "../../ui/bb-widget";
import Link from "next/link";

export default function FeaturedHomes() {
  return (
    <div className="bg-background pb-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-medium text-foreground text-left mb-4">Featured Homes</h2>
        <p className="text-lg text-muted-foreground text-left mb-8">Discover the latest properties in Tacoma and surrounding areas.</p>
        
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="w-auto">
            {/* Optional: Add filters or tabs here */}
          </div>
          
          <Link href="/listing-results">
            <Button size="lg" className="group">
              View All Listings
            </Button>
          </Link>
        </div>
        
        {/* Official BuyingBuddy Widget - Shows MLS Listings */}
        <div className="rounded-lg overflow-hidden min-h-[600px]">
          <BBWidget dataType="ListingResults" />
        </div>
      </div>
    </div>
  );
}