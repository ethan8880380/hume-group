import SoldListingsMap from "@/components/ui/sold-listings-map";

export default function ProvenTrackRecord() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-left mb-12">
          <h2 className="text-3xl font-medium mb-4">
            Proven Track Record
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Hundreds of homes sold and successfully closed right here in your area. We offer consistently ultimate expertise and proven results.
          </p>
        </div>

        <div className="relative">
          <SoldListingsMap />
        </div>
      </div>
    </section>
  );
}

