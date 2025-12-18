import { Metadata } from "next";
import { Footer } from "@/components/sections/navigation/footer";
import ContactForm from "@/components/sections/contact/contact-form";
import ContactAgents from "@/components/sections/contact/contact-agents";

export const metadata: Metadata = {
  title: "Contact Us | Tacoma Real Estate Experts",
  description: "Get in touch with The Hume Group. Contact Matt Hume, Tom Hume, or David Gala for expert real estate guidance in Tacoma, WA. We're here to help with buying, selling, or any real estate questions.",
  keywords: [
    'contact Tacoma realtor',
    'Tacoma real estate contact',
    'The Hume Group contact',
    'Matt Hume contact',
    'Tom Hume contact',
    'Tacoma real estate consultation',
  ],
  openGraph: {
    title: 'Contact The Hume Group | Tacoma Real Estate',
    description: 'Get in touch with The Hume Group for expert real estate guidance in Tacoma, WA.',
    url: 'https://thehumegroup.com/contact',
  },
  alternates: {
    canonical: 'https://thehumegroup.com/contact',
  },
};

// JSON-LD for Contact Page
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact The Hume Group',
  description: 'Contact page for The Hume Group real estate team in Tacoma, WA.',
  url: 'https://thehumegroup.com/contact',
  mainEntity: {
    '@type': 'RealEstateAgent',
    name: 'The Hume Group',
    url: 'https://thehumegroup.com',
    telephone: '+1-253-XXX-XXXX', // Update with actual phone
    email: 'info@thehumegroup.com', // Update with actual email
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tacoma',
      addressRegion: 'WA',
      addressCountry: 'US',
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="pt-8 md:pt-16 pb-8">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-left max-w-4xl">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Contact us
              </span>
              <h1 className="text-4xl md:text-5xl font-semibold text-foreground mt-3 mb-4">
                We&apos;d love to hear from you
              </h1>
              <p className="text-lg text-muted-foreground">
                Our friendly team is always here to chat.
              </p>
            </div>
          </div>
        </section>


        {/* Agent Cards Section */}
        <ContactAgents />

        {/* Contact Form Section */}
        <ContactForm />

      </main>
      <Footer />
    </>
  );
}
