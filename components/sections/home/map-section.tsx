"use client";

import { useState } from "react";
import Map, { NavigationControl } from "react-map-gl/mapbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "pk.eyJ1IjoiZXRoYW4wMzgwIiwiYSI6ImNtZHZ5NWQwdjF5eGQya3B6NTgzeHZ0OGYifQ.n7xwqIjTcfHMZ6BcrUlKYQ";

export default function MapSection() {
  const [viewState, setViewState] = useState({
    longitude: -122.4449,
    latitude: 47.2529,
    zoom: 11
  });

  return (
    <div className="container mx-auto px-6">
      <section className="relative h-[600px] bg-gray-100 rounded-lg overflow-hidden">
        <div className="absolute inset-0">
        <Map
          {...viewState}
          onMove={(evt: any) => setViewState(evt.viewState)}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        >
          <NavigationControl />
        </Map>
      </div>
      
      <div className="absolute top-8 left-8 z-10">
        <Card className="w-80 bg-white/60 backdrop-blur-sm shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Our Recent Sales
            </h3>
            <p className="text-gray-600 mb-4">
              Over 200 Sales in the last month!
            </p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Get Top Dollar — Book a Call Now
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="absolute bottom-4 left-4 z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 text-sm text-gray-600">
          <div className="font-medium text-gray-800 mb-1">Tacoma Area</div>
          <div className="text-xs text-gray-500">
            Explore our service area
          </div>
        </div>
      </div>
      </section>
    </div>
  );
}