import { getPosts } from '@/lib/ghost';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BlogCard } from '@/components/ui/blog-card';

interface NeighborhoodBlogPostsProps {
  neighborhoodName: string;
  limit?: number;
}

export async function NeighborhoodBlogPosts({ 
  neighborhoodName,
  limit = 3 
}: NeighborhoodBlogPostsProps) {
  // Fetch recent posts
  const posts = await getPosts(limit);

  // Don't render section if no posts found
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-medium text-foreground mb-2">
              Latest news and updates about {neighborhoodName}
            </h2>
          </div>
          <Link href="/blog">
            <Button size="lg">View All {neighborhoodName} Articles</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

