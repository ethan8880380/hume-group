import Hero from "@/components/sections/home/hero";
import OurStory from "@/components/sections/about/our-story";
import TeamMembers from "@/components/sections/about/team-members";
import OurServices from "@/components/sections/about/our-services";
import ProvenTrackRecord from "@/components/sections/about/proven-track-record";
import CTA from "@/components/sections/home/cta";
import { Footer } from "@/components/sections/navigation/footer";

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