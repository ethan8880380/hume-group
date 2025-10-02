import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function CTA() {
  return (
    <section className="w-full pb-16">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden bg-primary/[0.03] border border-primary/10 rounded-lg">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Left Section - Image */}
            <div className="col-span-2 p-4 pr-2">
              <div className="relative aspect-[4/3] border border-primary/10 rounded-md">
                <Image
                  src="/images/cta.jpg"
                  alt="Beautiful home"
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            </div>

            {/* Right Section - Text and Buttons */}
            <div className="px-12">
              <div className="flex flex-col justify-center h-full">
                <h2 className="text-3xl font-medium mb-1 leading-tight">
                  Buy or Sell with Confidence
                </h2>
                <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
                  Whether buying or selling, we provide the insights, resources, and expertise you need to make the right decisions.
                </p>
                <div className="flex gap-3">
                  <Button size="lg" className="w-fit text-background cursor-pointer">Sell With Us</Button>
                  <Button size="lg" variant="ghost" className="w-fit cursor-pointer">Buy With Us</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}