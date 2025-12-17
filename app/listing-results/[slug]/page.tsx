import { Footer } from "@/components/sections/navigation/footer";
import { Button } from "@/components/ui/button";
import CTA from "@/components/sections/home/cta";
import Link from "next/link";
import { notFound } from "next/navigation";
import { neighborhoodsData } from "@/lib/neighborhoods-data";

// BuyingBuddy widget configurations for each neighborhood
const neighborhoodWidgets: Record<string, string> = {
  "hilltop-downtown": `<bb-widget data-type="FeaturedGallery" data-filter="mls_id:wa555+listing_status:active+shapesearch:47.235536622580675 -122.46424431929252,47.23343857867518 -122.45960946211478,47.236002843279344 -122.43094201216361,47.25464830769823 -122.43334527144096,47.26757974287268 -122.43986840376517,47.25592994226891 -122.4635576737847,47.235536622580675 -122.46424431929252+login-panel:false+header-menu:false"></bb-widget>`,
  
  "west-end-tacoma": `<bb-widget data-type="FeaturedGallery" data-filter="shapesearch:47.2432393417196 -122.50528519175293,47.24304794016512 -122.56355797628231,47.28372894168888 -122.5386687355254,47.315452022833014 -122.55250530177473,47.32301616808247 -122.5511320107591,47.31126218410197 -122.50083522731184,47.29449950726866 -122.49826030665754,47.29065731189398 -122.49499874049543,47.29065731189398 -122.50478343898176,47.2432393417196 -122.50528519175293+mls_id:wa555+listing_status:active+login-panel:false+header-menu:false"></bb-widget>`,
  
  "university-place-fircrest": `<bb-widget data-type="FeaturedGallery" data-filter="mls_id:wa555+listing_status:active+city:university place+limit:12+order:price+login-panel:false+header-menu:false"></bb-widget>`,
  
  "6th-ave-district": `<bb-widget data-type="FeaturedGallery" data-filter="mls_id:wa555+listing_status:active+city:tacoma+shapesearch:47.25547362111762 -122.5127777683652,47.25576489988592 -122.46291013836031,47.242655769085424 -122.46308179973727,47.24283057883831 -122.5043663608945,47.25244422694683 -122.51346441387301,47.25547362111762 -122.5127777683652+login-panel:false+header-menu:false"></bb-widget>`,
  
  "ups-tacoma-north-slope": `<bb-widget data-type="FeaturedGallery" data-filter="mls_id:wa555+listing_status:active+shapesearch:47.2640288485492 -122.44743347167969,47.25637492768781 -122.46251411595699,47.25870507330938 -122.46860809483883,47.27099489437857 -122.46817894139645,47.2640288485492 -122.44743347167969+limit:12+order:price+login-panel:false+header-menu:false"></bb-widget>`,
  
  "proctor-district": `<bb-widget data-type="FeaturedGallery" data-filter="shapesearch:47.267357617206294 -122.49617833216753,47.26729055213527 -122.48391151428223,47.27478305822999 -122.48390454371538,47.27501599638781 -122.49617833216753,47.267357617206294 -122.49617833216753+mls_id:wa555+listing_status:active+limit:12+order:price+login-panel:false+header-menu:false"></bb-widget>`,
  
  "old-town-tacoma-to-ruston": `<bb-widget data-type="FeaturedGallery" data-filter="shapesearch:47.27451121732492 -122.47784699641133,47.26746431720069 -122.47819031916524,47.267755530005836 -122.4677189751711,47.26612471766092 -122.46445740900899,47.27503532943048 -122.45844926081563,47.304758852916876 -122.50351037226582,47.30167407429793 -122.51561249934102,47.287004362355525 -122.51552666865254,47.285257697006124 -122.49621476374531,47.27485262583984 -122.49621476374531,47.27451121732492 -122.47784699641133+mls_id:wa555+listing_status:active+limit:12+order:price+login-panel:false+header-menu:false"></bb-widget>`,
  
  "stadium-district": `<bb-widget data-type="FeaturedGallery" data-filter="shapesearch:47.26207689821636 -122.45101675304967,47.25753330863655 -122.449815123411,47.25922263747673 -122.43968710217077,47.26877506907307 -122.44329199108678,47.27419123087325 -122.45485854431634,47.26749374542705 -122.46756148621087,47.26207689821636 -122.45101675304967+mls_id:wa555+listing_status:active+limit:12+order:price+login-panel:false+header-menu:false"></bb-widget>`,
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function NeighborhoodListingsPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Find neighborhood data
  const neighborhood = neighborhoodsData.find((n) => n.slug === slug);
  const widgetHtml = neighborhoodWidgets[slug];
  
  // Return 404 if neighborhood not found
  if (!neighborhood || !widgetHtml) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="flex flex-col items-center justify-center w-full pt-24">
        <div className="flex flex-col items-start gap-4 text-left w-full container mx-auto px-6 mb-8">
          <Link 
            href="/neighborhoods" 
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to Neighborhoods
          </Link>
          <h1 className="text-5xl mb-2 font-medium text-foreground">
            Homes in {neighborhood.name}
          </h1>
          <p className="text-lg max-w-3xl text-foreground/80">
            {neighborhood.shortDescription}. Browse available listings below and contact us to schedule a showing.
          </p>
          <div className="w-8 h-[1px] my-4 bg-primary/10"></div>
          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={`/neighborhoods/${slug}`}>Learn About {neighborhood.name}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* BuyingBuddy Widget */}
      <div className="container mx-auto px-6 py-12">
        <div dangerouslySetInnerHTML={{ __html: widgetHtml }} />
      </div>

      <CTA />
      <Footer />
    </div>
  );
}

// Generate static params for all neighborhoods
export async function generateStaticParams() {
  return neighborhoodsData.map((neighborhood) => ({
    slug: neighborhood.slug,
  }));
}

