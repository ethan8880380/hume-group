"use client";

import { useState } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl/mapbox";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "pk.eyJ1IjoiZXRoYW4wMzgwIiwiYSI6ImNtZHZ5NWQwdjF5eGQya3B6NTgzeHZ0OGYifQ.n7xwqIjTcfHMZ6BcrUlKYQ";

// Sample sales data points around Tacoma
const salesLocations = Array.from({ length: 150 }, (_, i) => ({
  id: i,
  latitude: 47.2529 + (Math.random() - 0.5) * 0.2,
  longitude: -122.4443 + (Math.random() - 0.5) * 0.3,
  price: Math.floor(Math.random() * 500000) + 300000,
}));

export default function ProvenTrackRecord() {
  const [viewState, setViewState] = useState({
    longitude: -122.4443,
    latitude: 47.2529,
    zoom: 11,
  });

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-medium mb-4">
            Proven Track Record
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Over a hundred of homes sold and successfully sold right here in your area. We offer the consistently ultimate expertise.
          </p>
        </div>

        <div className="relative h-[600px] bg-gray-100 rounded-lg overflow-hidden shadow-xl">
          <Map
            {...viewState}
            onMove={(evt: any) => setViewState(evt.viewState)}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/light-v11"
            mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
          >
            <NavigationControl position="top-right" />
            
            {/* Sales markers */}
            {salesLocations.map((location) => (
              <Marker
                key={location.id}
                longitude={location.longitude}
                latitude={location.latitude}
                anchor="center"
              >
                <div className="w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow-md hover:scale-150 transition-transform cursor-pointer" />
              </Marker>
            ))}
          </Map>

          {/* Overlay Card */}
          <div className="absolute top-8 right-8 z-10">
            <Card className="w-80 bg-white shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Our Recent Sales
                </h3>
                <p className="text-gray-600 mb-4">
                  View every home we've sold and see why our clients trust us to deliver results.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Get Top Dollar — Book a Call Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

