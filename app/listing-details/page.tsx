import { Footer } from "@/components/sections/navigation/footer";
import { BBWidget } from "@/components/ui/bb-widget";

export default function ListingDetailsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* BuyingBuddy SearchDetails Widget - Reads listing ID from URL */}
      <div className="pt-16">
        <BBWidget dataType="SearchDetails" />
      </div>

      <Footer />
    </div>
  );
}

