"use client";

import { Footer } from "@/components/sections/navigation/footer";
import { useEffect } from "react";

export default function CommunitiesPage() {
  useEffect(() => {
    // Load BuyingBuddy widget script
    const script = document.createElement('script');
    script.src = 'https://cdn.buyingbuddy.com/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

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
        <bb-widget data-type="Communities"></bb-widget>
      </div>

      <Footer />
    </div>
  );
}

