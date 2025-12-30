import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/sections/navigation/header";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://thehumegroup.com'),
  title: {
    default: 'The Hume Group | Tacoma Real Estate Experts',
    template: '%s | The Hume Group'
  },
  description: "The Hume Group is a full-service real estate team based in Tacoma, WA. We specialize in buying and selling homes in the greater Tacoma area, including University Place, Proctor, Stadium District, and North Slope neighborhoods.",
  keywords: [
    'Tacoma real estate',
    'Tacoma homes for sale',
    'Tacoma realtors',
    'buy home Tacoma WA',
    'sell home Tacoma WA',
    'Pierce County real estate',
    'University Place homes',
    'Proctor District Tacoma',
    'North Slope Tacoma',
    'Stadium District Tacoma',
    'Tacoma real estate agents',
    'The Hume Group',
  ],
  authors: [{ name: 'The Hume Group', url: 'https://thehumegroup.com' }],
  creator: 'The Hume Group',
  publisher: 'The Hume Group',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://thehumegroup.com',
    siteName: 'The Hume Group',
    title: 'The Hume Group | Tacoma Real Estate Experts',
    description: 'The Hume Group is a full-service real estate team based in Tacoma, WA. We specialize in buying and selling homes in the greater Tacoma area.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Hume Group - Tacoma Real Estate Experts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Hume Group | Tacoma Real Estate Experts',
    description: 'The Hume Group is a full-service real estate team based in Tacoma, WA specializing in buying and selling homes.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://thehumegroup.com',
  },
  category: 'real estate',
};

// JSON-LD Structured Data for Local Business
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  '@id': 'https://thehumegroup.com/#organization',
  name: 'The Hume Group',
  description: 'The Hume Group is a full-service real estate team based in Tacoma, WA specializing in buying and selling homes in the greater Tacoma area.',
  url: 'https://thehumegroup.com',
  logo: 'https://thehumegroup.com/logo.svg',
  image: 'https://thehumegroup.com/images/og-image.jpg',
  telephone: '+1-253-318-1005', // Update with actual phone number
  email: 'tom@thehumegroup.com', // Update with actual email
  address: {
    '@type': 'PostalAddress',
    streetAddress: '2212 Mildred St W, Tacoma, WA 98466', // Update with actual address
    addressLocality: 'Tacoma',
    addressRegion: 'WA',
    postalCode: '98466', // Update with actual zip
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 47.2529, // Tacoma coordinates
    longitude: -122.4443,
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Tacoma',
      sameAs: 'https://en.wikipedia.org/wiki/Tacoma,_Washington',
    },
    {
      '@type': 'City',
      name: 'University Place',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Pierce County',
    },
  ],
  sameAs: [
    // Add social media URLs
    // 'https://www.facebook.com/thehumegroup',
    // 'https://www.instagram.com/thehumegroup',
    // 'https://www.youtube.com/@thehumegroup',
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '10:00',
      closes: '16:00',
    },
  ],
  priceRange: '$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '66', // Update with actual review count
    bestRating: '5',
    worstRating: '5',
  },
  employee: [
    {
      '@type': 'Person',
      name: 'Matt Hume',
      jobTitle: 'Real Estate Agent',
    },
    {
      '@type': 'Person',
      name: 'Tom Hume',
      jobTitle: 'Real Estate Agent',
    },
    {
      '@type': 'Person',
      name: 'David Gala',
      jobTitle: 'Real Estate Agent',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Analytics />
        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${outfit.variable} antialiased font-sans`}
      >
        {/* Google Maps API - load first for map functionality */}
        <Script
          src="https://maps.googleapis.com/maps/api/js?callback=mbbMapLoaded&libraries=places"
          strategy="beforeInteractive"
        />
        
        {/* Buying Buddy configuration */}
        <Script
          id="mbb-config"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var MBB = {seo : "false",data:{ acid : "ghEb9eob" } };
              function mbbMapLoaded(){ MBB.googleMaps = true; };
            `,
          }}
        />
        
        {/* Buying Buddy plugin v5.02 - load after config */}
        <Script
          src="https://www.mbb2.com/version3/css/theme/acid/ghEb9eob"
          strategy="afterInteractive"
        />
        <Script
          src="https://d2w6u17ngtanmy.cloudfront.net/scripts/my-buying-buddy.5.0.js.gz"
          strategy="afterInteractive"
        />

        <Header />
        {children}
      </body>
    </html>
  );
}
