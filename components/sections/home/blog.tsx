import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'
import { getPosts, GhostPost } from '@/lib/ghost'
import { format } from 'date-fns'

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

export async function Blog() {
  // Get latest 3 posts from Ghost
  const posts = await getPosts(3);

  return (
    <section className="py-16 px-6 container mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
            Latest Around Tacoma
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Get expert insights, market trends, and valuable tips for buyers and sellers.
          </p>
        </div>
        <Link href="/blog">
          <Button 
            variant="default" 
            size="lg"
          >
            View all posts
          </Button>
        </Link>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))
        ) : (
          // Fallback content when no posts are available
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              No blog posts available yet.
            </p>
            <p className="text-sm text-muted-foreground">
              Check back soon for the latest insights and updates.
            </p>
          </div>
        )}
      </div>
    </section>
  )
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
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-background border text-sm font-medium text-gray-700">
              <span className={`w-2 h-2 rounded-full mr-2 ring-2 ring-current/20 ${getCategoryDotColor(primaryTag?.name || 'default')}`}></span>
              {primaryTag?.name || 'Blog'}
            </span>
            <span className="text-sm text-gray-500">
              {post.reading_time ? `${post.reading_time} min read` : format(publishedDate, 'MMM dd')}
            </span>
          </div>

          {/* Title with Arrow */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-medium text-foreground transition-colors line-clamp-2">
              {post.title}
            </h3>
            <ArrowUpRight className="w-5 h-5 text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0 ml-2" />
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed line-clamp-3">
            {post.excerpt || 'Read more to discover insights and tips from The Hume Group team.'}
          </p>
        </div>
      </article>
    </Link>
  )
}
