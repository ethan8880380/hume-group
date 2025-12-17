import { Footer } from "@/components/sections/navigation/footer";
import { Button } from "@/components/ui/button";
import CTA from "@/components/sections/home/cta";

export default function ListingResultsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="flex flex-col items-center justify-center w-full pt-24">
        <div className="flex flex-col items-start gap-4 text-left w-full container mx-auto px-6 mb-8">
          <h1 className="text-5xl mb-2 font-medium text-foreground">
            Search Results
          </h1>
          <p className="text-lg max-w-3xl text-foreground/80">
            Browse properties matching your search criteria. If you see something you like, contact us to schedule a showing.
          </p>
          <div className="w-8 h-[1px] my-4 bg-primary/10"></div>
          <div className="flex gap-4">
            <Button asChild size="lg">
              <a href="/contact">Contact Us</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="/listings">View All Listings</a>
            </Button>
          </div>
        </div>
      </div>

      {/* BuyingBuddy ListingResults Widget */}
      <div className="container mx-auto px-6 py-12">
        <div dangerouslySetInnerHTML={{
          __html: `<bb-widget data-type="ListingResults" data-filter="mls_id:wa555+listing_status:active+city:tacoma"></bb-widget>`,
        }} />
      </div>

      <CTA />
      <Footer />
    </div>
  );
}
