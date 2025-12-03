"use client";

import { useState } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl/mapbox";
import { getAllSoldListings } from "@/lib/sold-listings";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "pk.eyJ1IjoiZXRoYW4wMzgwIiwiYSI6ImNtZHZ5NWQwdjF5eGQya3B6NTgzeHZ0OGYifQ.n7xwqIjTcfHMZ6BcrUlKYQ";

interface SoldListingsMapProps {
  className?: string;
  height?: string;
}

export default function SoldListingsMap({ 
  className = "relative h-[600px] bg-gray-100 rounded-lg overflow-hidden border border-primary/10",
  height = "600px"
}: SoldListingsMapProps) {
  const [viewState, setViewState] = useState({
    longitude: -122.4449,
    latitude: 47.2529,
    zoom: 11
  });

  const salesLocations = getAllSoldListings();

  return (
    <div className={className} style={{ height }}>
      <Map
        {...viewState}
        onMove={(evt: { viewState: typeof viewState }) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        scrollZoom={false}
      >
        <NavigationControl />
        
        {/* Sales markers */}
        {salesLocations.map((location) => (
          <Marker
            key={location.id}
            longitude={location.longitude}
            latitude={location.latitude}
            anchor="bottom"
          >
            <div className="relative group cursor-pointer group-hover:scale-110 transition-transform">
              {/* SVG Map Pin */}
              <svg width="20" height="28" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                {/* Pin shape */}
                <path d="M12 0C5.373 0 0 5.373 0 12C0 18.627 12 32 12 32C12 32 24 18.627 24 12C24 5.373 18.627 0 12 0Z" fill="currentColor"/>
                {/* White center circle */}
                <circle cx="12" cy="12" r="6" fill="white"/>
              </svg>
            </div>
          </Marker>
        ))}
      </Map>
    </div>
  );
}
