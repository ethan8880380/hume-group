import { Footer } from "@/components/sections/navigation/footer";
import ContactForm from "@/components/sections/contact/contact-form";
import ContactAgents from "@/components/sections/contact/contact-agents";

export default function ContactPage() {
  return (
    <>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-white pt-24 pb-12">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-medium text-foreground mb-6">
                Get in Touch
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Have questions about buying or selling in Tacoma? We&apos;re here to help. 
                Reach out to us and we&apos;ll get back to you as soon as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <ContactForm />

        {/* Contact Agents Section */}
        <ContactAgents />
      </main>
      <Footer />
    </>
  );
}


