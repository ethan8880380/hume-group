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
          onMove={(evt: { viewState: typeof viewState }) => setViewState(evt.viewState)}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
          scrollZoom={false}
        >
          <NavigationControl />
        </Map>
      </div>
      
      <div className="absolute top-3 left-3 z-10">
        <Card className="w-80 rounded-md bg-white/10 backdrop-blur-xs border-primary/10 shadow-lg">
          <CardContent>
            <h3 className="text-xl font-medium text-foreground mb-1">
              Our Recent Sales
            </h3>
            <p className="text-foreground/80 mb-6">
              Over 200 Sales in the last month!
            </p>
            <Button size="lg" className="w-full cursor-pointer">
              Get Top Dollar — Book a Call Now
            </Button>
          </CardContent>
        </Card>
      </div>
      </section>
    </div>
  );
}