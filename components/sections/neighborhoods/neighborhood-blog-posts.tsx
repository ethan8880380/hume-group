import { getPostsByTag } from '@/lib/ghost';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BlogCard } from '@/components/ui/blog-card';

interface NeighborhoodBlogPostsProps {
  neighborhoodName: string;
  neighborhoodSlug: string;
  limit?: number;
}

export async function NeighborhoodBlogPosts({ 
  neighborhoodName,
  neighborhoodSlug,
  limit = 3 
}: NeighborhoodBlogPostsProps) {
  // Fetch posts tagged with this neighborhood
  const posts = await getPostsByTag(neighborhoodSlug, limit);

  // Don't render section if no posts found
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="py-10 md:pb-24 md:pt-0">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h2 className="text-xl md:text-3xl font-medium text-foreground">
              Latest from {neighborhoodName}
            </h2>
          </div>
          <Link href={`/blog?tag=${neighborhoodSlug}`} className="shrink-0">
            <Button size="default" className="w-full sm:w-auto md:size-lg">
              View All Articles
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
