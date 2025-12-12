import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/sections/navigation/header";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Hume Group",
  description: "The Hume Group is a full-service real estate team based in Tacoma, WA. We specialize in buying and selling homes in the greater Tacoma area.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} antialiased font-sans`}
      >
        {/* Buying Buddy plugin v5.02 - beforeInteractive strategy loads before page is interactive */}
        <Script
          src="https://www.mbb2.com/version3/css/theme/acid/ghEb9eob"
          strategy="beforeInteractive"
        />
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
        {/* NOTE: Add your Google Maps API Key by replacing YOUR_API_KEY_HERE below */}
        <Script
          src="https://maps.googleapis.com/maps/api/js?callback=mbbMapLoaded&libraries=places"
          strategy="beforeInteractive"
        />
        <Script
          src="https://d2w6u17ngtanmy.cloudfront.net/scripts/my-buying-buddy.5.0.js.gz"
          strategy="beforeInteractive"
        />
        {/* End Buying Buddy Plugin */}

        <Header />
        {children}
      </body>
    </html>
  );
}
