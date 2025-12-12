"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export function HomeValueSection() {

  return (
    <section className="w-full pb-12 md:pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden bg-primary/[0.03] border border-primary/10 rounded-lg">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Left Section - Text and Input */}
            <div className="px-6 py-8 md:px-12 md:py-0 order-2 lg:order-1">
              <div className="flex flex-col justify-center h-full">
                <h2 className="text-2xl md:text-3xl font-medium mb-2 md:mb-1 leading-tight">
                  How Much is Your Tacoma Home Worth?
                </h2>
                <p className="text-muted-foreground text-base md:text-lg mb-6 md:mb-12 leading-relaxed">
                  Get a quick and accurate estimate of your home&apos;s value in today&apos;s market.
                </p>
                <Button size="lg" className="w-full sm:w-fit text-background cursor-pointer">Get Your Free Valuation</Button>
                
              </div>
            </div>

            {/* Right Section - House Image */}
            <div className="col-span-2 p-4 lg:pl-2 order-1 lg:order-2">
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
