import { Metadata } from "next";
import { Footer } from "@/components/sections/navigation/footer";
import { BBWidget } from "@/components/ui/bb-widget";

export const metadata: Metadata = {
  title: "Communities | Explore Tacoma Area Neighborhoods",
  description: "Explore communities and neighborhoods throughout the Tacoma area. Find detailed information about local amenities, schools, and real estate in Pierce County communities.",
  keywords: [
    'Tacoma communities',
    'Pierce County neighborhoods',
    'Tacoma area communities',
    'Tacoma suburbs',
    'communities near Tacoma',
  ],
  openGraph: {
    title: 'Tacoma Area Communities | The Hume Group',
    description: 'Explore communities and neighborhoods throughout the Tacoma area.',
    url: 'https://thehumegroup.com/communities',
  },
  alternates: {
    canonical: 'https://thehumegroup.com/communities',
  },
};

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
