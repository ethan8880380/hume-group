import { Metadata } from "next";
import { Footer } from "@/components/sections/navigation/footer";
import { BBWidget } from "@/components/ui/bb-widget";

interface ListingDetailsPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({ params }: ListingDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const listingPath = slug.join('/');
  
  // Extract a readable address from the slug if possible
  // Format: wa555_2437494--7606-37th-Street-W-Unit-B3-University-Place-WA-98466
  const parts = listingPath.split('--');
  const addressPart = parts[1] || listingPath;
  const readableAddress = addressPart.replace(/-/g, ' ');

  return {
    title: `${readableAddress} | Property Details`,
    description: `View details, photos, and schedule a showing for this property. Contact The Hume Group for expert buyer representation.`,
    keywords: [
      'Tacoma home for sale',
      'property listing',
      'Pierce County real estate',
      'home for sale',
    ],
    openGraph: {
      title: `Property Details | The Hume Group`,
      description: `View this property listing. Contact The Hume Group for a showing.`,
      url: `https://thehumegroup.com/listing-details/${listingPath}`,
    },
    alternates: {
      canonical: `https://thehumegroup.com/listing-details/${listingPath}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ListingDetailsPage({ params }: ListingDetailsPageProps) {
  const { slug } = await params;
  const listingPath = slug.join('/');

  // JSON-LD for Real Estate Listing
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    '@id': `https://thehumegroup.com/listing-details/${listingPath}`,
    url: `https://thehumegroup.com/listing-details/${listingPath}`,
    name: `Property Listing`,
    description: 'Real estate listing',
    broker: {
      '@type': 'RealEstateAgent',
      name: 'The Hume Group',
      url: 'https://thehumegroup.com',
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* BuyingBuddy SearchDetails Widget - Reads listing ID from URL */}
      <div className="pt-16">
        <BBWidget dataType="SearchDetails" />
      </div>

      <Footer />
    </div>
  );
}

