import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function CTA() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 bg-primary/10 rounded-lg">
          <div className="w-full md:w-2/3 relative h-64 md:h-128">
            <Image
              src="/images/cta.png"
              alt="Beautiful home"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/3 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-medium mb-6">
              Buy or Sell with Confidence
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto md:mx-0 mb-8">
              Whether buying or selling, we provide the insights, resources, and expertise you need to make the right decisions.
            </p>
            <div className="flex flex-col md:flex-row gap-3">
              <Button size="lg">Sell With Us</Button>
              <Button size="lg" variant="ghost">Buy With Us</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}