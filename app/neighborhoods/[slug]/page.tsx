import { getNeighborhoodBySlug, getAllNeighborhoodSlugs, getRelatedNeighborhoods } from "@/lib/neighborhoods-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Home, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/sections/navigation/footer";

interface NeighborhoodPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllNeighborhoodSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: NeighborhoodPageProps): Promise<Metadata> {
  const { slug } = await params;
  const neighborhood = getNeighborhoodBySlug(slug);

  if (!neighborhood) {
    return {
      title: "Neighborhood Not Found - The Hume Group",
    };
  }

  return {
    title: `${neighborhood.name} - Tacoma Neighborhoods | The Hume Group`,
    description: neighborhood.description,
    openGraph: {
      title: `${neighborhood.name} - Tacoma Neighborhoods`,
      description: neighborhood.description,
      images: neighborhood.heroImage ? [neighborhood.heroImage] : [],
    },
  };
}

export default async function NeighborhoodPage({ params }: NeighborhoodPageProps) {
  const { slug } = await params;
  const neighborhood = getNeighborhoodBySlug(slug);

  if (!neighborhood) {
    notFound();
  }

  const relatedNeighborhoods = getRelatedNeighborhoods(slug, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="bg-primary px-4 sm:px-6 lg:px-8 mb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-48 -mt-24">
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-medium text-background mb-6 leading-tight">
              {neighborhood.name}
            </h1>

            <p className="text-xl text-background/80 mb-12 leading-relaxed max-w-3xl">
              {neighborhood.description}
            </p>

            <div className="h-[1px] bg-background/10 w-12 mb-12"></div>

            {/* Hero Image */}
            <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-8">
              <Image
                src={neighborhood.heroImage}
                alt={neighborhood.name}
                fill
                className="object-cover"
                quality={100}
                priority
              />
            </div>

            {/* Highlights */}
            {neighborhood.highlights && neighborhood.highlights.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-background/90 mb-4">Neighborhood Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {neighborhood.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-2 text-background/80">
                      <div className="w-1.5 h-1.5 bg-background/60 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Stats Section */}
      {neighborhood.stats && neighborhood.stats.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {neighborhood.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-lg text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Content Sections */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {neighborhood.sections.map((section, index) => (
          <div
            key={index}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 last:mb-0 ${
              section.imagePosition === "left" ? "lg:grid-flow-dense" : ""
            }`}
          >
            {/* Text Content */}
            <div className={section.imagePosition === "left" ? "lg:col-start-2" : ""}>
              <h2 className="text-3xl font-bold mb-4 text-foreground">
                {section.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {section.content}
              </p>
            </div>

            {/* Image */}
            {section.image && (
              <div className={`relative h-[400px] rounded-lg overflow-hidden shadow-lg ${
                section.imagePosition === "left" ? "lg:col-start-1 lg:row-start-1" : ""
              }`}>
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Homes in Neighborhood Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">
              Homes in {neighborhood.name}
            </h2>
            <Link href="/listings">
              <Button variant="outline">View All Homes</Button>
            </Link>
          </div>

          {/* Placeholder for listing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="relative h-64 bg-gray-200">
                  <Image
                    src={`/images/house.png`}
                    alt={`Home ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Home className="w-4 h-4" />
                    <span className="text-sm font-medium">Coming Soon</span>
                  </div>
                  <div className="text-2xl font-bold mb-2">$XXX,XXX</div>
                  <p className="text-sm text-muted-foreground mb-2">
                    X beds • X baths • X,XXX sqft
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {neighborhood.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Related Neighborhoods */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-foreground">
            Explore Other Neighborhoods
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedNeighborhoods.map((related) => (
              <Link key={related.slug} href={`/neighborhoods/${related.slug}`}>
                <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={related.heroImage}
                      alt={related.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {related.name}
                      </h3>
                      <p className="text-sm text-white/90">
                        {related.shortDescription}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Will a Price Change Help?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            If the price on your dream home changes, we'll get you drop alerts on your email address.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-white h-12"
            />
            <Button size="lg" variant="secondary" className="text-primary whitespace-nowrap h-12">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Sidebar Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <Mail className="w-12 h-12 p-3 border rounded-md bg-background text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-2">Stay Informed on Tacoma Real Estate</h3>
                <p className="text-muted-foreground mb-6">
                  Get expert insights, market trends, and valuable tips for buyers and sellers delivered to your inbox.
                </p>
                <div className="flex flex-col gap-4">
                  <Input type="email" placeholder="Enter your email" className="bg-background" />
                  <Button className="w-full">Subscribe</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

