import { Footer } from "@/components/sections/navigation/footer";
import { BBWidget } from "@/components/ui/bb-widget";

export default function ListingResultsPage() {

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-white mb-2">Search Results</h1>
          <p className="text-white/80 text-lg">
            Browse properties matching your search criteria
          </p>
        </div>
      </div>

      {/* BuyingBuddy ListingResults Widget - REQUIRED Foundation Page */}
      <div className="container mx-auto px-6 py-8">
      <div
      dangerouslySetInnerHTML={{
        __html: `<bb-widget data-type="SearchForm" data-filter="mls_id:wa555+listing_status:active+city:tacoma"></bb-widget>`,
      }}
    />
      </div>

      <Footer />
    </div>
  );
}

