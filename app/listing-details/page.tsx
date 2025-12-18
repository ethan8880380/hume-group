import { Footer } from "@/components/sections/navigation/footer";
import { BBWidget } from "@/components/ui/bb-widget";

export default function ListingDetailsPage() {

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-medium text-white mb-2">Property Details</h1>
          <p className="text-white/80 text-lg">
            View detailed information about this property
          </p>
        </div>
      </div>

      {/* BuyingBuddy SearchDetails Widget - REQUIRED Foundation Page */}
      <div className="container mx-auto px-6 py-8">
        <BBWidget dataType="SearchDetails" />
      </div>

      <Footer />
    </div>
  );
}

