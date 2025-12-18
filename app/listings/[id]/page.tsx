import { Metadata } from "next";
import ListingDetailClient from "./listing-detail-client";

interface ListingDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ListingDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  
  // For dynamic listing pages, we use a generic template
  // The actual listing data is fetched client-side
  return {
    title: `Property ${id} | Tacoma Home for Sale`,
    description: `View details, photos, and schedule a showing for this Tacoma property. Contact The Hume Group for expert buyer representation in Pierce County.`,
    keywords: [
      'Tacoma home for sale',
      'Tacoma property listing',
      'Pierce County real estate',
      'home for sale Tacoma WA',
    ],
    openGraph: {
      title: `Property Listing | The Hume Group`,
      description: `View this Tacoma property listing. Contact The Hume Group for a showing.`,
      url: `https://thehumegroup.com/listings/${id}`,
    },
    alternates: {
      canonical: `https://thehumegroup.com/listings/${id}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// JSON-LD for Real Estate Listing
function generateListingJsonLd(id: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    '@id': `https://thehumegroup.com/listings/${id}`,
    url: `https://thehumegroup.com/listings/${id}`,
    name: `Property Listing ${id}`,
    description: 'Real estate listing in Tacoma, WA',
    broker: {
      '@type': 'RealEstateAgent',
      name: 'The Hume Group',
      url: 'https://thehumegroup.com',
    },
    areaServed: {
      '@type': 'City',
      name: 'Tacoma',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'WA',
        addressCountry: 'US',
      },
    },
  };
}

export default async function ListingDetailPage({ params }: ListingDetailPageProps) {
  const { id } = await params;
  const jsonLd = generateListingJsonLd(id);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ListingDetailClient listingId={id} />
    </>
  );
}
