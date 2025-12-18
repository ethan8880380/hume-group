import { BBWidget } from "@/components/ui/bb-widget";
import Link from "next/link";
import { NewsletterSubscribe } from "@/components/newsletter-subscribe";

const footerLinks = {
  resources: [
    { name: "Selling", href: "/selling" },
    { name: "Buying", href: "/buying" },
    { name: "Our Listings", href: "/listings" },
    { name: "Home Search", href: "/listing-results" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
  ],
  neighborhoods: [
    { name: "Hilltop/Downtown", href: "/neighborhoods/hilltop-downtown" },
    { name: "West End", href: "/neighborhoods/west-end" },
    { name: "6th Ave", href: "/neighborhoods/6th-ave" },
    { name: "North Slope", href: "/neighborhoods/north-slope" },
    { name: "Proctor", href: "/neighborhoods/proctor" },
    { name: "All Neighborhoods", href: "/neighborhoods" },
  ],
  company: [
    { name: "About The Team", href: "/about" },
    { name: "Schedule a Call", href: "/contact" },
    { name: "Email Us", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary mt-8 md:mt-12">
      {/* Newsletter Section */}
      <section className="bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-12">
            <div className="flex-1">
              <h2 className="text-lg md:text-xl font-medium mb-2">
                Stay Informed on Tacoma Real Estate
              </h2>
              <p className="text-white/80 text-base md:text-lg">
                Get expert insights, market trends, and valuable tips for buyers and sellers.
              </p>
            </div>
            <div className="w-full lg:max-w-md">
              <NewsletterSubscribe 
                variant="inline"
                source="Footer Newsletter"
                inputClassName="bg-white text-gray-900 border-0 focus:ring-2 focus:ring-white/40 !h-11"
                buttonClassName="border border-white/20 hover:border-white/40"
                buttonSize="lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer Content */}
      <div className="bg-black/10 text-white">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 md:gap-12">
            {/* Company Info */}
            <div className="sm:col-span-2 lg:col-span-3">
              <div className="flex items-center gap-2 mb-4 md:mb-6">
                <svg 
                  width="61" 
                  height="22" 
                  viewBox="0 0 61 22" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 md:h-5 w-auto transition-colors duration-300"
                >
                  <path d="M1 22V12L7.5 5.5L14 12V21H20V1H30.5V17H35L43.5 10L51.5 16.5V12H56.5V19L59.5 21" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span className="text-lg md:text-xl font-medium">The Hume Group</span>
              </div>
              <p className="text-blue-200 text-sm md:text-base leading-relaxed max-w-md">
                The Hume Group is a full-service real estate team based in Tacoma, WA. We specialize in buying and selling homes in the greater Tacoma area.
              </p>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-base md:text-lg font-medium mb-4 md:mb-6">Resources</h3>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-sm md:text-base text-blue-200 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Neighborhoods */}
            <div>
              <h3 className="text-base md:text-lg font-medium mb-4 md:mb-6">Neighborhoods</h3>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.neighborhoods.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-sm md:text-base text-blue-200 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* The Hume Group */}
            <div>
              <h3 className="text-base md:text-lg font-medium mb-4 md:mb-6">The Hume Group</h3>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-sm md:text-base text-blue-200 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-black/10">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-blue-200 text-sm">
                © The Hume Group. All rights reserved.
              </p>
              
            </div>
          </div>
        </div>
        
        {/* MLS Disclaimer - BuyingBuddy Widget */}
        <div className="border-t border-black/10 bg-black/10">
          <div className="container mx-auto px-4 py-4">
            <BBWidget dataType="Disclaimer" />
          </div>
        </div>
      </div>
    </footer>
  );
}
