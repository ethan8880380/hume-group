import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getPosts } from '@/lib/ghost'
import { BlogCard } from '@/components/ui/blog-card'

export async function Blog() {
  // Get latest 3 posts from Ghost
  const posts = await getPosts(3);

  return (
    <section className="pb-12 md:pb-24 px-4 md:px-6 container mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 md:mb-12 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-3 md:mb-4">
            Latest Around Tacoma
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
            Get expert insights, market trends, and valuable tips for buyers and sellers.
          </p>
        </div>
        <Link href="/blog" className="w-full sm:w-auto">
          <Button 
            variant="default" 
            size="lg"
            className="w-full sm:w-auto"
          >
            View all posts
          </Button>
        </Link>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))
        ) : (
          // Fallback content when no posts are available
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground text-base md:text-lg mb-4">
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
