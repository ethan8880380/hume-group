import { Footer } from "@/components/sections/navigation/footer";
import ContactForm from "@/components/sections/contact/contact-form";
import ContactAgents from "@/components/sections/contact/contact-agents";
import ContactInfo from "@/components/sections/contact/contact-info";
import ContactNewsletter from "@/components/sections/contact/contact-newsletter";

export default function ContactPage() {
  return (
    <>
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
