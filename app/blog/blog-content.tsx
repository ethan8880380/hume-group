'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { GhostPost, GhostTag } from '@/lib/ghost';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface BlogContentProps {
  posts: GhostPost[];
  tags: GhostTag[];
}

export function BlogContent({ posts, tags }: BlogContentProps) {
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Filter posts based on selected tag
  const filteredPosts = useMemo(() => {
    if (selectedTag === 'all') {
      return posts;
    }
    return posts.filter(post => 
      post.tags?.some(tag => tag.slug === selectedTag)
    );
  }, [posts, selectedTag]);

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        {/* Category Tabs */}
        <div className="mb-12">
          <Tabs value={selectedTag} onValueChange={setSelectedTag} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-fit grid-cols-auto bg-white shadow-sm">
                <TabsTrigger value="all" className="px-6 py-2">
                  View all
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
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              No posts found
            </h2>
            <p className="text-gray-600">
              {selectedTag === 'all' 
                ? 'Check back soon for our latest insights and updates.'
                : `No posts found for the selected category.`
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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

  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 border border-gray-100">
      {post.feature_image && (
        <Link href={`/blog/${post.slug}`}>
          <div className="relative h-64 w-full">
            <Image
              src={post.feature_image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
      )}
      
      <div className="p-6">
        {/* Category and Date */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          {post.tags && post.tags.length > 0 && (
            <span className="text-primary font-medium">
              {post.tags[0].name}
            </span>
          )}
          <time dateTime={post.published_at}>
            {format(publishedDate, 'MMM dd, yyyy')}
          </time>
        </div>

        <Link href={`/blog/${post.slug}`} className="group">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>

        {post.excerpt && (
          <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed">
            {post.excerpt}
          </p>
        )}

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors text-sm"
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
