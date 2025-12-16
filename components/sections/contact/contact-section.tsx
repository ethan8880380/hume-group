import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function ContactSection() {
  return (
    <section className="w-full pb-12 md:pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden bg-primary/[0.03] border border-primary/10 rounded-lg">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Left Section - Image */}
            <div className="col-span-2 p-4 lg:pr-2 order-2 lg:order-1">
              <div className="relative aspect-[4/3] border border-primary/10 rounded-md">
                <Image
                  src="/images/selling/hero.jpg"
                  alt="Beautiful home"
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            </div>

            {/* Right Section - Text and Button */}
            <div className="px-6 py-8 md:px-12 md:py-0 order-1 lg:order-2">
              <div className="flex flex-col justify-center h-full">
                <h2 className="text-2xl md:text-3xl font-medium mb-2 md:mb-1 leading-tight">
                  Start Your Real Estate Journey With Us
                </h2>
                <p className="text-muted-foreground text-base md:text-lg mb-6 md:mb-12 leading-relaxed">
                  Connect with trusted local experts. Share your goals, and let us guide you to a successful home sale or purchase.
                </p>
                <Button asChild size="lg" className="w-full sm:w-fit text-background cursor-pointer">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
