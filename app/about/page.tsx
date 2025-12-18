import { Metadata } from "next";
import OurStory from "@/components/sections/about/our-story";
import TeamMembers from "@/components/sections/about/team-members";
import OurServices from "@/components/sections/about/our-services";
import ProvenTrackRecord from "@/components/sections/about/proven-track-record";
import CTA from "@/components/sections/home/cta";
import { Footer } from "@/components/sections/navigation/footer";

export const metadata: Metadata = {
  title: "About Us | Meet Your Tacoma Real Estate Team",
  description: "Meet Matt Hume, Tom Hume, and David Gala - The Hume Group. Tacoma's trusted real estate experts with decades of local experience helping buyers and sellers achieve exceptional results.",
  keywords: [
    'Tacoma real estate team',
    'Matt Hume realtor',
    'Tom Hume realtor',
    'David Gala realtor',
    'Tacoma real estate agents',
    'Pierce County realtors',
  ],
  openGraph: {
    title: 'About The Hume Group | Tacoma Real Estate Experts',
    description: 'Meet Matt Hume, Tom Hume, and David Gala - Tacoma\'s trusted real estate experts with decades of local experience.',
    url: 'https://thehumegroup.com/about',
    images: ['/images/team/matt.png'],
  },
  alternates: {
    canonical: 'https://thehumegroup.com/about',
  },
};

export default function AboutPage() {
  return (
    <div>
      <OurStory />
      <TeamMembers />
      <OurServices />
      <ProvenTrackRecord />
      <CTA />
      <Footer />
    </div>
  );
}
