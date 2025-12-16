"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HomeValuationDialog } from "@/components/home-valuation-dialog";

export default function SellingHero() {
  return (
    <div className="flex flex-col items-center justify-center w-full pt-24">
      <div className="flex flex-col items-start gap-4 text-left w-full container mx-auto px-6 mb-8">
        <h1 className="text-5xl mb-2 font-medium text-foreground">
          Sell Your Home With Confidence
        </h1>
        <p className="text-lg max-w-3xl text-foreground/80">
        Why List With Us? Selling your home isn&apos;t just a transaction! It&apos;s one of the biggest financial decisions you&apos;ll ever make. We take that seriously! Our clients trust us to apply our experience and strategic thinking to getting the best outcome. 
        </p>
        <div className="w-8 h-[1px] my-4 bg-primary/10"></div>
        <div className="flex gap-4">
          <Button size="lg">
            Contact Us
          </Button>
          <HomeValuationDialog 
            trigger={
              <Button size="lg" variant="outline">
                Free Home Valuation
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}


