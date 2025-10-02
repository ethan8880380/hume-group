import { getPosts } from '@/lib/ghost';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { ArrowUpRight } from 'lucide-react';
import { GhostPost } from '@/lib/ghost';
import { Button } from '@/components/ui/button';

interface NeighborhoodBlogPostsProps {
  neighborhoodName: string;
  limit?: number;
}

function getCategoryDotColor(category: string) {
  switch (category.toLowerCase()) {
    case 'market updates':
      return 'bg-blue-600'
    case 'sellers':
      return 'bg-green-600'
    case 'buyers':
      return 'bg-purple-600'
    case 'real estate':
      return 'bg-orange-600'
    case 'tips':
      return 'bg-teal-600'
    default:
      return 'bg-gray-600'
  }
}

function BlogPostCard({ post }: { post: GhostPost }) {
  const publishedDate = new Date(post.published_at);
  const primaryTag = post.tags?.[0];

  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group cursor-pointer bg-white overflow-hidden transition-all duration-300">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden rounded-lg">
          {post.feature_image ? (
            <Image
              src={post.feature_image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <span className="text-gray-500 text-lg font-medium">
                The Hume Group
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="pt-6">
          {/* Category and Read Time */}
          <div className="flex items-center gap-2 p-0.5 pr-2 border w-fit rounded-lg mb-3">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-background border text-sm font-medium text-foreground">
              <span className={`w-2 h-2 rounded-full mr-2 ring-2 ring-current/20 ${getCategoryDotColor(primaryTag?.name || 'default')}`}></span>
              {primaryTag?.name || 'Blog'}
            </span>
            <span className="text-sm text-foreground/70">
              {post.reading_time ? `${post.reading_time} min read` : format(publishedDate, 'MMM dd')}
            </span>
          </div>

          {/* Title with Arrow */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-2xl font-semibold text-foreground transition-colors line-clamp-2">
              {post.title}
            </h3>
            <ArrowUpRight className="w-5 h-5 text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0 ml-2" />
          </div>

          {/* Description */}
          <p className="text-base text-foreground/70 leading-relaxed line-clamp-3">
            {post.excerpt || 'Read more to discover insights and tips from The Hume Group team.'}
          </p>
        </div>
      </article>
    </Link>
  )
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

