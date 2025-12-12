"use client";

import { Mail, MapPin, Phone } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    description: "Our friendly team is here to help.",
    value: "info@humegroup.com",
    href: "mailto:info@humegroup.com",
  },
  {
    icon: MapPin,
    title: "Office",
    description: "Come say hello at our office HQ.",
    value: "Tacoma, WA 98402",
    secondaryValue: "Pacific Northwest",
    href: "https://maps.google.com/?q=Tacoma,WA",
  },
  {
    icon: Phone,
    title: "Phone",
    description: "Mon-Fri from 8am to 5pm.",
    value: "(253) 555-1234",
    href: "tel:+12535551234",
  },
];

export default function ContactInfo() {
  return (
    <section className="pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto">
          {contactInfo.map((item) => (
            <div key={item.title} className="text-center">
              <div className="w-12 h-12 rounded-xl border border-border bg-white shadow-sm flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {item.description}
              </p>
              <a
                href={item.href}
                className="text-primary font-medium hover:underline text-sm"
                target={item.title === "Office" ? "_blank" : undefined}
                rel={item.title === "Office" ? "noopener noreferrer" : undefined}
              >
                {item.value}
                {item.secondaryValue && (
                  <>
                    <br />
                    {item.secondaryValue}
                  </>
                )}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

