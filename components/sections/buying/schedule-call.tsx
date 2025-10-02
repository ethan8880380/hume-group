"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";

export default function ScheduleCall() {
  const [phone, setPhone] = useState("");

  const handleSchedule = () => {
    console.log("Scheduling call for:", phone);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Form */}
          <div>
            <h2 className="text-4xl md:text-5xl font-medium mb-6">
              Schedule a call
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Ready to start your home search? Schedule a free consultation with one of our expert buyer&apos;s agents to discuss your needs and goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-white border-gray-300 focus:border-blue-600 focus:ring-blue-600 h-12"
              />
              <Button
                size="lg"
                onClick={handleSchedule}
                className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap h-12"
              >
                Find Your Dream Home
              </Button>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/images/house.png"
              alt="Beautiful Tacoma home"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

