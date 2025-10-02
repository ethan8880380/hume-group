import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

const footerLinks = {
  resources: [
    { name: "Selling", href: "/selling" },
    { name: "Buying", href: "/buying" },
    { name: "Home Valuation", href: "/home-valuation" },
    { name: "Why Us?", href: "/why-us" },
    { name: "Market Updates", href: "/market-updates" },
    { name: "Recent Sales", href: "/recent-sales" },
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
    <footer className="bg-primary mt-12">
      {/* Newsletter Section */}
      <section className="bg-primary text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-row justify-between">
            <div>
              <h2 className="text-xl font-medium mb-2">
                Stay Informed on Tacoma Real Estate
              </h2>
              <p className="text-white/80 text-lg">
                Get expert insights, market trends, and valuable tips for buyers and sellers.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white text-gray-900 border-0 focus:ring-2 focus:ring-white/40 h-10"
              />
              <Button 
                className="border border-white/20 hover:border-white/40"
                size="lg"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer Content */}
      <div className="bg-black/10 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-2 mb-6">
                <svg 
                  width="61" 
                  height="22" 
                  viewBox="0 0 61 22" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-auto transition-colors duration-300"
                >
                  <path d="M1 22V12L7.5 5.5L14 12V21H20V1H30.5V17H35L43.5 10L51.5 16.5V12H56.5V19L59.5 21" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span className="text-xl font-medium">The Hume Group</span>
              </div>
              <p className="text-blue-200 leading-relaxed max-w-sm">
                Design amazing digital experiences that create more happy in the world.
              </p>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-medium mb-6">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-blue-200 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Neighborhoods */}
            <div>
              <h3 className="text-lg font-medium mb-6">Neighborhoods</h3>
              <ul className="space-y-3">
                {footerLinks.neighborhoods.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-blue-200 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* The Hume Group */}
            <div>
              <h3 className="text-lg font-medium mb-6">The Hume Group</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-blue-200 hover:text-white transition-colors"
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
        <div className="border-t border-blue-800">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-blue-200 text-sm">
                © The Hume Group. All rights reserved.
              </p>
              
              {/* Social Media Icons */}
              <div className="flex gap-4">
                <Link 
                  href="https://twitter.com/humegroup" 
                  className="text-blue-200 hover:text-white transition-colors"
                  aria-label="Follow us on Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </Link>
                <Link 
                  href="https://facebook.com/humegroup" 
                  className="text-blue-200 hover:text-white transition-colors"
                  aria-label="Follow us on Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
