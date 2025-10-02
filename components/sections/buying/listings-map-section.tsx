"use client";

import { useState } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl/mapbox";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "pk.eyJ1IjoiZXRoYW4wMzgwIiwiYSI6ImNtZHZ5NWQwdjF5eGQya3B6NTgzeHZ0OGYifQ.n7xwqIjTcfHMZ6BcrUlKYQ";

// Sample available listings around Tacoma
const listingLocations = Array.from({ length: 150 }, (_, i) => ({
  id: i,
  latitude: 47.2529 + (Math.random() - 0.5) * 0.25,
  longitude: -122.4443 + (Math.random() - 0.5) * 0.35,
}));

export default function ListingsMapSection() {
  const [viewState, setViewState] = useState({
    longitude: -122.4443,
    latitude: 47.2529,
    zoom: 11,
  });

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="relative h-[600px] bg-gray-100 rounded-lg overflow-hidden shadow-xl">
          <Map
            {...viewState}
            onMove={(evt: { viewState: typeof viewState }) => setViewState(evt.viewState)}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/light-v11"
            mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
            scrollZoom={false}
          >
            <NavigationControl position="top-right" />
            
            {/* Listing markers */}
            {listingLocations.map((location) => (
              <Marker
                key={location.id}
                longitude={location.longitude}
                latitude={location.latitude}
                anchor="center"
              >
                <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-white shadow-sm hover:scale-150 transition-transform cursor-pointer" />
              </Marker>
            ))}
          </Map>

          {/* Overlay Card */}
          <div className="absolute top-8 right-8 z-10">
            <Card className="w-80 bg-white/95 backdrop-blur-sm shadow-2xl">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Available Listings
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Explore our curated selection of homes available throughout Tacoma and surrounding areas.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Start Your Home Search
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Location badge */}
          <div className="absolute bottom-6 left-6 z-10">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg">
              <div className="font-semibold text-gray-900 text-sm mb-0.5">Tacoma & Surrounding Areas</div>
              <div className="text-xs text-gray-600">150+ active listings available now</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

