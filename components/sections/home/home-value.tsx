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
    <section className="w-full pb-24">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden bg-primary/[0.03] border border-primary/10 rounded-lg">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Left Section - Text and Input */}
            <div className="px-12">
              <div className="flex flex-col justify-center h-full">
                <h2 className="text-3xl font-medium mb-1 leading-tight">
                  How Much is Your Tacoma
                  <br />
                  Home Worth?
                </h2>
                <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
                  Get a quick and accurate estimate of your
                  <br />
                  home&apos;s value in today&apos;s market.
                </p>
                <Button size="lg" className="w-fit text-background cursor-pointer">Get Your Free Valuation</Button>
                
              </div>
            </div>

            {/* Right Section - House Image */}
            <div className="col-span-2 p-4 pl-2">
              <div className="relative aspect-[4/3] border border-primary/10 rounded-md">
              <Image src="/images/value.jpg" alt="Victorian House" fill className="object-cover rounded-md" />
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
