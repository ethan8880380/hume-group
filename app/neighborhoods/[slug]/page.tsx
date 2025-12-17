import { getNeighborhoodBySlug, getAllNeighborhoodSlugs, getRelatedNeighborhoods } from "@/lib/neighborhoods-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/sections/navigation/footer";
import { NeighborhoodListings } from "@/components/sections/neighborhoods/neighborhood-listings";
import { NeighborhoodCard } from "@/components/ui/neighborhood-card";
import { NeighborhoodBlogPosts } from "@/components/sections/neighborhoods/neighborhood-blog-posts";
import CTA from "@/components/sections/home/cta";
import { YouTubeEmbed } from "@/components/ui/youtube-embed";
import Link from "next/link";

interface NeighborhoodPageProps {
  params: Promise<{
    slug: string;
  }>;
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

  const relatedNeighborhoods = getRelatedNeighborhoods(slug, 4);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="px-6 mb-8">
        <div className="container mx-auto px-6 pb-12 pt-24">
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-medium text-foreground mb-6 leading-tight">
              {neighborhood.name}
            </h1>

            <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-5xl">
              {neighborhood.description}
            </p>

            <div className="h-[1px] bg-muted-foreground/10 w-12 mb-12"></div>

            <div className="flex gap-4 mb-12">
              <Button asChild size="lg">
                <Link href={`/listing-results/${slug}`}>View All Homes in {neighborhood.name}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>

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

            {/* Highlights 
            {neighborhood.highlights && neighborhood.highlights.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-muted-foreground mb-4">Neighborhood Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {neighborhood.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-2 text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-background/60 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}*/}
          </div>
        </div>
      </header>

      {/* Stats Section 
      {neighborhood.stats && neighborhood.stats.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {neighborhood.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
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
      )}*/}

      {/* Content Sections */}
      <div className="container mx-auto px-6">
        {neighborhood.sections.map((section, index) => (
          <div
            key={index}
            className={`grid grid-cols-1 lg:grid-cols-3 gap-6 items-center mb-24 last:mb-0 p-6 bg-primary/[0.03] border border-primary/10 rounded-lg ${
              section.imagePosition === "left" ? "lg:grid-flow-dense" : ""
            }`}
          >
            {/* Text Content */}
            <div className={section.imagePosition === "left" ? "lg:col-start-3 lg:col-span-1" : "lg:col-span-1"}>
              <h2 className="text-2xl font-medium mb-1 text-foreground">
                {section.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {section.content}
              </p>
            </div>

            {/* Media */}
            {(section.youtubeUrl || section.image) && (
              <div className={`relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg ${
                section.imagePosition === "left" ? "lg:col-start-1 lg:row-start-1 lg:col-span-2" : "lg:col-span-2"
              }`}>
                {section.youtubeUrl ? (
                  <YouTubeEmbed
                    videoUrl={section.youtubeUrl}
                    title={section.title}
                    className="w-full h-full"
                  />
                ) : section.image ? (
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover"
                  />
                ) : null}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Video Section - Only shown if heroYoutubeUrl exists */}
      {neighborhood.heroYoutubeUrl && (
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-medium mb-4 text-foreground text-center">
                Explore {neighborhood.name}
              </h2>
              <p className="text-lg text-muted-foreground text-center mb-8">
                Take a closer look at what makes this neighborhood special.
              </p>
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
                <YouTubeEmbed
                  videoUrl={neighborhood.heroYoutubeUrl}
                  title={`${neighborhood.name} neighborhood video`}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Homes in Neighborhood Section */}
      <NeighborhoodListings 
        neighborhoodName={neighborhood.name} 
        neighborhoodSlug={slug}
        limit={3}
      />

      {/* Neighborhood Blog Posts */}
      <NeighborhoodBlogPosts
        neighborhoodName={neighborhood.name}
        limit={3}
      />

      {/* Related Neighborhoods */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-medium mb-8 text-foreground">
            Explore Other Neighborhoods
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedNeighborhoods.map((related) => (
              <NeighborhoodCard
                key={related.slug}
                id={related.slug}
                name={related.name}
                description={related.shortDescription}
                image={related.heroImage}
                href={`/neighborhoods/${related.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA />

      <Footer />
    </div>
  );
}
