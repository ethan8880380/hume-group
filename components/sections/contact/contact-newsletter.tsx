"use client";

import { NewsletterSubscribe } from "@/components/newsletter-subscribe";

export default function ContactNewsletter() {
  return (
    <section className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Text Content */}
          <div>
            <h3 className="text-xl font-semibold text-foreground">
              Join 2,000+ subscribers
            </h3>
            <p className="text-muted-foreground mt-1">
              Stay in the loop with everything you need to know.
            </p>
          </div>

          {/* Subscribe Form */}
          <div className="flex flex-col items-start md:items-end gap-2">
            <NewsletterSubscribe 
              source="Contact Page"
              className="w-full md:w-auto"
              inputClassName="w-full md:w-[280px] h-11 bg-white border-border"
              buttonClassName="whitespace-nowrap"
              buttonSize="default"
            />
            <p className="text-xs text-muted-foreground">
              We care about your data in our{" "}
              <a href="/privacy" className="underline hover:text-foreground">
                privacy policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


