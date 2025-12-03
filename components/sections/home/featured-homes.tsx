"use client";

import { Button } from "../../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import { BuyingBuddyWidget } from "../../ui/buyingbuddy-widget";

export default function FeaturedHomes() {

  const handleViewAll = () => {
    window.location.href = '/listings';
  };

  return (
    <div className="bg-background pb-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-medium text-foreground text-left mb-4">Featured Homes</h2>
        <p className="text-lg text-muted-foreground text-left mb-8">Discover the latest properties in Tacoma and surrounding areas.</p>
        
        <div className="flex items-center justify-between gap-4 mb-8">
          <Tabs defaultValue="all" className="w-auto">
            <TabsList>
              <TabsTrigger value="all">All Listings</TabsTrigger>
              <TabsTrigger value="north-tacoma">North Tacoma</TabsTrigger>
              <TabsTrigger value="south-tacoma">South Tacoma</TabsTrigger>
              <TabsTrigger value="gig-harbor">Gig Harbor</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button onClick={handleViewAll} size="lg" className="group">
            View All Listings
          </Button>
        </div>
        
        {/* BuyingBuddy Widget */}
        <BuyingBuddyWidget
          widgetType="featured"
          height="600px"
          filters={{
            city: 'Tacoma',
            state: 'WA',
          }}
          className="rounded-lg overflow-hidden"
        />
      </div>
    </div>
  );
}