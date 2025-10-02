import { getPosts, getAllTags, GhostPost, GhostTag } from '@/lib/ghost';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { BlogContent } from './blog-content';
import { Footer } from '@/components/sections/navigation/footer';
import CTA from '@/components/sections/home/cta';

export const metadata = {
  title: 'Blog - Tacoma Real Estate Insights | The Hume Group',
  description: 'Find the latest market trends, seller tips, and neighborhood insights—straight from Tacoma natives.',
};

// Revalidate every hour
export const revalidate = 3600;

export default async function BlogPage() {
  // Fetch all data server-side
  const [posts, tags] = await Promise.all([
    getPosts('all'),
    getAllTags()
  ]);

  const latestPost = posts[0]; // Most recent post for hero image

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center w-full pt-24">
        <div className="flex flex-col items-start gap-4 text-left w-full container mx-auto px-6 mb-12">
          <h1 className="text-5xl mb-2 font-medium leading-tight text-foreground">
            Tacoma Real Estate Insights<br />& Neighborhood Highlights
          </h1>
          <p className="text-lg max-w-3xl text-muted-foreground leading-relaxed">
            Find the latest market trends, seller tips, and neighborhood insights—straight from Tacoma natives. Stay informed with expert analysis, local market updates, and insider knowledge to help you make smarter real estate decisions.
          </p>
        </div>
        <div className="container mx-auto px-6 relative">
          <div className="relative w-[100v] overflow-hidden rounded-lg">
            {latestPost?.feature_image ? (
              <Image 
                src={latestPost.feature_image} 
                alt={latestPost.title || "Latest blog post"} 
                width={1000} 
                height={600} 
                quality={100}
                priority
                className="w-full object-cover aspect-[2/1]" 
              />
            ) : (
              <div className="w-full aspect-video bg-white/10 flex items-center justify-center">
                <div className="text-muted-foreground text-center">
                  <h3 className="text-2xl font-medium mb-2">Will a Price Change Help?</h3>
                  <p>If your house isn't selling, should you drop the price? How big a change helps? Will a price drop make you look desperate?</p>
                </div>
              </div>
            )}
            <div className="absolute inset-y-0 left-full w-full bg-primary"></div>
            {/* Overlay text on image */}
            {latestPost && (
              <div className="absolute bottom-0 right-0 left-0 text-background p-6 bg-gradient-to-t from-foreground to-transparent pt-64">
                <h3 className="text-3xl font-bold mb-2">{latestPost.title}</h3>
                {latestPost.excerpt && (
                  <p className="text-base text-background/80 mb-4 max-w-3xl">{latestPost.excerpt?.split('.').slice(0,2).join('.')}.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Blog Content with Tabs */}
      <BlogContent posts={posts} tags={tags} featuredPostId={latestPost?.id} />
      <CTA />
      {/* Newsletter Section */}
      <Footer />
    </div>
  );
}
