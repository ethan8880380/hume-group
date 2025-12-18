import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function CTA() {
  return (
    <section className="w-full pb-12 md:pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden bg-primary/[0.03] border border-primary/10 rounded-lg">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Left Section - Image */}
            <div className="col-span-2 p-4 lg:pr-2 order-1">
              <div className="relative aspect-[4/3] border border-primary/10 rounded-md">
                <Image
                  src="/images/cta.jpg"
                  alt="Beautiful Tacoma home exterior - Buy or sell with The Hume Group"
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            </div>

            {/* Right Section - Text and Buttons */}
            <div className="px-6 py-8 md:px-12 md:py-0 order-2">
              <div className="flex flex-col justify-center h-full">
                <h2 className="text-2xl md:text-3xl font-medium mb-2 md:mb-1 leading-tight">
                  Buy or Sell with Confidence
                </h2>
                <p className="text-muted-foreground text-base md:text-lg mb-6 md:mb-12 leading-relaxed">
                  Whether buying or selling, we provide the insights, resources, and expertise you need to make the right decisions.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild size="lg" className="w-full sm:w-fit text-background cursor-pointer">
                    <a href="/selling">Sell With Us</a>
                  </Button>
                  <Button asChild size="lg" variant="ghost" className="w-full sm:w-fit cursor-pointer">
                    <a href="/buying">Buy With Us</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}