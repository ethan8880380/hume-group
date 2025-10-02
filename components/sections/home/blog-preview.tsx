import { getFeaturedPosts, GhostPost } from '@/lib/ghost';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

export default async function BlogPreview() {
  const featuredPosts = await getFeaturedPosts(3);

  // If no featured posts, get the latest 3 posts
  const posts = featuredPosts.length > 0 ? featuredPosts : [];

  if (posts.length === 0) {
    return null; // Don't render anything if no posts
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay up to date with the latest market trends, industry insights, and company updates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post) => (
            <BlogPostPreview key={post.id} post={post} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/blog">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              View All Articles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function BlogPostPreview({ post }: { post: GhostPost }) {
  const publishedDate = new Date(post.published_at);

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {post.feature_image && (
        <Link href={`/blog/${post.slug}`}>
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={post.feature_image}
              alt={post.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
      )}
      
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <time dateTime={post.published_at}>
            {format(publishedDate, 'MMM dd, yyyy')}
          </time>
          {post.reading_time && (
            <>
              <span className="mx-2">•</span>
              <span>{post.reading_time} min read</span>
            </>
          )}
        </div>

        <Link href={`/blog/${post.slug}`} className="group">
          <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>

        {post.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag.id}
                className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
        >
          Read more
          <svg
            className="ml-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}