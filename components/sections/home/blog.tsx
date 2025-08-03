import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  description: string
  category: string
  readTime: string
  image: string
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Will a Price Change Help?',
    description: "If your house isn't selling, should you drop the price? Will a price change help? Will a price drop make you look desperate?",
    category: 'Market Updates',
    readTime: '8 min read',
    image: '/images/hero.png'
  },
  {
    id: '2',
    title: 'Will a Price Change Help?',
    description: "If your house isn't selling, should you drop the price? Will a price change help? Will a price drop make you look desperate?",
    category: 'Sellers',
    readTime: '8 min read',
    image: '/images/hero.png'
  },
  {
    id: '3',
    title: 'What to Expect When Buying',
    description: "If your house isn't selling, should you drop the price? Will a price change help? Will a price drop make you look desperate?",
    category: 'Buyers',
    readTime: '8 min read',
    image: '/images/hero.png'
  }
]

function getCategoryDotColor(category: string) {
  switch (category.toLowerCase()) {
    case 'market updates':
      return 'bg-blue-600'
    case 'sellers':
      return 'bg-green-600'
    case 'buyers':
      return 'bg-purple-600'
    default:
      return 'bg-gray-600'
  }
}

export function Blog() {
  return (
    <section className="py-16 px-6 container mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
            Lastest Around Tacoma
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Get expert insights, market trends, and valuable tips for buyers and sellers.
          </p>
        </div>
        <Button 
          variant="default" 
          size="lg"
        >
          View all posts
        </Button>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <article 
            key={post.id} 
            className="group cursor-pointer bg-white overflow-hidden transition-all duration-300"
          >
            {/* Image */}
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="pt-6">
              {/* Category and Read Time */}
              <div className="flex items-center gap-2 p-0.5 pr-2 border w-fit rounded-lg mb-3">
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-background border text-sm font-medium text-gray-700">
                  <span className={`w-2 h-2 rounded-full mr-2 ring-2 ring-current/20 ${getCategoryDotColor(post.category)}`}></span>
                  {post.category}
                </span>
                <span className="text-sm text-gray-500">{post.readTime}</span>
              </div>

              {/* Title with Arrow */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-medium text-foreground transition-colors">
                  {post.title}
                </h3>
                <ArrowUpRight className="w-5 h-5 text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0 ml-2" />
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {post.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
