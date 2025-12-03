'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { GhostPost, GhostTag } from '@/lib/ghost';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUpRight } from 'lucide-react';

interface BlogContentProps {
  posts: GhostPost[];
  tags: GhostTag[];
  featuredPostId?: string;
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

export function BlogContent({ posts, tags, featuredPostId }: BlogContentProps) {
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Filter posts based on selected tag and exclude featured post
  const filteredPosts = useMemo(() => {
    let filtered = posts;
    
    // Exclude the featured post
    if (featuredPostId) {
      filtered = filtered.filter(post => post.id !== featuredPostId);
    }
    
    // Filter by tag
    if (selectedTag !== 'all') {
      filtered = filtered.filter(post => 
        post.tags?.some(tag => tag.slug === selectedTag)
      );
    }
    
    return filtered;
  }, [posts, selectedTag, featuredPostId]);

  return (
    <div className="py-16">
      <div className="container mx-auto flex flex-col px-6">
        {/* Category Tabs */}
        <div className="mb-12 flex flex-col items-start sticky top-20 z-10">
          <Tabs value={selectedTag} onValueChange={setSelectedTag} className="w-full">
            <div className="flex justify-start">
              <TabsList className="bg-[#FAFBFD]/70 border-primary/10 border backdrop-blur-sm">
                <TabsTrigger value="all" className="px-6 py-2">
                  All Posts
                </TabsTrigger>
                {tags.slice(0, 6).map((tag) => (
                  <TabsTrigger key={tag.slug} value={tag.slug} className="px-6 py-2">
                    {tag.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </Tabs>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              No posts found
            </h2>
            <p className="text-foreground/70">
              {selectedTag === 'all' 
                ? 'Check back soon for our latest insights and updates.'
                : `No posts found for the selected category.`
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 col-span-4 gap-8 mx-auto">
            {filteredPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
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
