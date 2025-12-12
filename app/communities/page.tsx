import { Footer } from "@/components/sections/navigation/footer";
import { BBWidget } from "@/components/ui/bb-widget";

export default function CommunitiesPage() {

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-white mb-2">Communities</h1>
          <p className="text-white/80 text-lg">
            Explore neighborhoods and communities in the Tacoma area
          </p>
        </div>
      </div>

      {/* BuyingBuddy Communities Widget - OPTIONAL Foundation Page */}
      <div className="container mx-auto px-6 py-8">
        <BBWidget dataType="Communities" />
      </div>

      <Footer />
    </div>
  );
}

