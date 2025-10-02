import { getPosts, getAllTags, GhostPost, GhostTag } from '@/lib/ghost';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { BlogContent } from './blog-content';

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
      <div className="flex flex-col items-center justify-center w-full bg-primary pt-40 -mt-17 pb-24">
        <div className="flex flex-col items-start gap-4 text-left w-full container mx-auto px-6 mb-12">
          <h1 className="text-5xl mb-2 font-medium text-white">
            Tacoma Real Estate Insights<br />& Neighborhood Highlights
          </h1>
          <p className="text-lg max-w-3xl text-white/80">
            Find the latest market trends, seller tips, and neighborhood insights—straight from Tacoma natives.
          </p>
          <div className="w-8 h-[1px] my-4 bg-white/50"></div>
          <div className="flex gap-4">
            <Button size="lg" variant="secondary" className="text-primary">
              Get Top Dollar - Book a Call Now
            </Button>
            <Button size="lg">Free Home Valuation</Button>
          </div>
        </div>
        <div className="container mx-auto px-6 relative">
          <div className="relative w-[100v] overflow-hidden">
            {latestPost?.feature_image ? (
              <Image 
                src={latestPost.feature_image} 
                alt={latestPost.title || "Latest blog post"} 
                width={1000} 
                height={600} 
                quality={100}
                priority
                className="w-full rounded-lg object-cover h-[600px]" 
              />
            ) : (
              <div className="w-full h-[600px] bg-white/10 rounded-lg flex items-center justify-center">
                <div className="text-white/60 text-center">
                  <h3 className="text-2xl font-medium mb-2">Will a Price Change Help?</h3>
                  <p>If your house isn't selling, should you drop the price? How big a change helps? Will a price drop make you look desperate?</p>
                </div>
              </div>
            )}
            <div className="absolute inset-y-0 left-full w-full bg-primary"></div>
            
            {/* Overlay text on image */}
            {latestPost && (
              <div className="absolute bottom-8 left-8 text-white max-w-md">
                <h3 className="text-2xl font-bold mb-2">{latestPost.title}</h3>
                {latestPost.excerpt && (
                  <p className="text-white/90 text-sm">{latestPost.excerpt}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Blog Content with Tabs */}
      <BlogContent posts={posts} tags={tags} />

      {/* Newsletter Section */}
      <div className="bg-primary py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Informed on Tacoma Real Estate
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Get expert insights, market trends, and valuable tips for buyers and sellers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/20"
            />
            <Button variant="secondary" className="px-8 py-3 text-primary">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
