import { getPosts } from '@/lib/ghost';
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
  // Fetch all posts server-side
  const posts = await getPosts('all');

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="w-full pt-8 md:pt-16 md:pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              The Hume Group Blog
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] text-foreground tracking-tight">
              Life, Homes & Neighborhoods in Tacoma
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Market trends, seller tips, and neighborhood insights—straight from Tacoma natives.
            </p>
          </div>
        </div>
      </div>

      {/* Blog Content with Sidebar */}
      <BlogContent posts={posts} />
      <CTA />
      <Footer />
    </div>
  );
}
