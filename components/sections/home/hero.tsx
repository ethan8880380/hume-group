import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center w-full pt-24 pb-24">
      <div className="flex flex-col items-start gap-4 text-left w-full container mx-auto px-6 mb-12">
        <h1 className="text-5xl mb-2 font-medium text-foreground">Smart Strategy. Faster Sales. Better Returns.</h1>
        <p className="text-lg max-w-3xl text-foreground/80">
          The Hume Group combines decades of local expertise, personalized service, and unmatched professionalism to guide you seamlessly through your real estate journey.
        </p>
        <div className="w-8 h-[1px] my-4 bg-primary/10"></div>
        <div className="flex gap-4">
          <Button size="lg" className="text-background cursor-pointer">Get Top Dollar - Book a Call Now</Button>
          <Button size="lg" variant="ghost" className="text-foreground cursor-pointer hover:bg-primary/[0.03]">Search Homes</Button>
        </div>
      </div>
      <div className="container mx-auto px-6 relative">
        <div className="relative w-[100v] overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full rounded-lg object-cover"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-y-0 left-full w-full bg-foreground"></div>
        </div>
      </div>
    </div>
  );
}