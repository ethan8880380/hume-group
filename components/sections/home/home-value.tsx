"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";

export function HomeValueSection() {
  const [address, setAddress] = useState("");

  const handleValuation = () => {
    // Handle valuation logic here
    console.log("Getting valuation for:", address);
  };

  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden bg-primary/10 rounded-2xl shadow-lg">
          <div className="flex flex-col lg:flex-row justify-between">
            {/* Left Section - Text and Input */}
            <div className="px-16 py-24">
              <div className="">
                <h2 className="text-3xl lg:text-5xl font-medium mb-4 leading-tight">
                  How Much is Your Tacoma
                  <br />
                  Home Worth?
                </h2>
                <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
                  Get a quick and accurate estimate of your
                  <br />
                  home's value in today's market.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    type="text"
                    placeholder="Home Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-white border-gray-300 focus:border-blue-600 focus:ring-blue-600 h-10"
                  />
                  <Button
                    size="lg"
                    onClick={handleValuation}
                  >
                    Get Your Free Valuation
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Section - House Image */}
            <div className="absolute right-0 top-0 w-full h-full bottom-0 -z-10">
              <div className="absolute inset-0"></div>
              <div className="relative h-full w-full">
                {/* Victorian House Image */}
                <Image src="/images/house.png" alt="Victorian House" fill className="object-contain object-right" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
