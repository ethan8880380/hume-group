'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { GhostPost, GhostTag } from '@/lib/ghost';
import { BlogCard } from '@/components/ui/blog-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
} as const;

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24,
    },
  },
  exit: { 
    opacity: 0, 
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};

const featuredVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.98,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 20,
    },
  },
  exit: { 
    opacity: 0, 
    y: -30,
    scale: 0.98,
    transition: {
      duration: 0.25,
    },
  },
};

interface BlogContentProps {
  posts: GhostPost[];
}

// Neighborhood tag slugs to group together
const NEIGHBORHOOD_SLUGS = [
  '6th-ave-district',
  'proctor-district',
  'north-tacoma',
  'old-town-to-ruston',
  'hilltop-downtown',
  'hilltop',
  'downtown',
  'north-slope-neighborhood',
  'north-slope',
];

const POSTS_PER_PAGE = 11;

function isNeighborhoodTag(slug: string): boolean {
  return NEIGHBORHOOD_SLUGS.some(ns => slug.toLowerCase().includes(ns.toLowerCase()) || ns.toLowerCase().includes(slug.toLowerCase()));
}

// Featured post card - large image with text overlay for hero
function FeaturedPostCard({ post }: { post: GhostPost }) {
  const primaryTag = post.tags?.[0];
  
  return (
    <motion.div
      variants={featuredVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Link href={`/blog/${post.slug}`} className="group block">
        <article className="relative overflow-hidden rounded-2xl">
          <div className="relative aspect-[3/4] md:aspect-[21/9] w-full overflow-hidden rounded-xl">
            {post.feature_image ? (
              <Image
                src={post.feature_image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="100vw"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5" />
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Featured badge */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6">
              <span className="px-3 py-1.5 text-xs font-semibold bg-primary text-primary-foreground rounded-md">
                Featured
              </span>
            </div>
            
            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
              <div className="flex items-center gap-3 mb-3">
                {primaryTag && (
                  <span className="px-3 py-1 text-xs font-medium bg-white/90 text-foreground rounded-md">
                    {primaryTag.name}
                  </span>
                )}
                {post.reading_time && (
                  <span className="px-3 py-1 text-xs font-medium bg-white/20 text-white rounded-md backdrop-blur-sm">
                    {post.reading_time} min read
                  </span>
                )}
              </div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-medium text-white leading-tight mb-2 group-hover:text-white/90 transition-colors">
                {post.title}
              </h3>
              <p className="text-sm md:text-base text-white/80 leading-relaxed line-clamp-2 max-w-3xl">
                {post.excerpt || 'Read more to discover insights and tips from The Hume Group team.'}
              </p>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

// Category sidebar item
function CategoryItem({ 
  name, 
  isActive, 
  onClick 
}: { 
  name: string; 
  isActive: boolean; 
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-3 py-2 text-sm transition-all duration-200 border-l-4 border-transparent",
        isActive 
          ? "text-primary font-medium border-l-4 border-primary hover:border-primary/50" 
          : "text-muted-foreground hover:border-primary/50 hover:text-primary/80 cursor-pointer"
      )}
    >
      {name}
    </button>
  );
}

export function BlogContent({ posts }: BlogContentProps) {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Extract unique primary tags from all posts (the first tag of each post)
  const { regularTags, hasNeighborhoods } = useMemo(() => {
    const tagMap = new Map<string, GhostTag>();
    const neighborhoodMap = new Map<string, GhostTag>();
    
    posts.forEach(post => {
      const primaryTag = post.tags?.[0];
      if (primaryTag) {
        if (isNeighborhoodTag(primaryTag.slug)) {
          if (!neighborhoodMap.has(primaryTag.slug)) {
            neighborhoodMap.set(primaryTag.slug, primaryTag);
          }
        } else {
          if (!tagMap.has(primaryTag.slug)) {
            tagMap.set(primaryTag.slug, primaryTag);
          }
        }
      }
    });
    
    return {
      regularTags: Array.from(tagMap.values()),
      hasNeighborhoods: neighborhoodMap.size > 0
    };
  }, [posts]);

  // Filter posts based on selected tag
  const filteredPosts = useMemo(() => {
    if (selectedTag === 'neighborhoods') {
      return posts.filter(post => 
        post.tags?.some(tag => isNeighborhoodTag(tag.slug))
      );
    } else if (selectedTag !== 'all') {
      return posts.filter(post => 
        post.tags?.some(tag => tag.slug === selectedTag)
      );
    }
    return posts;
  }, [posts, selectedTag]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  // Featured post - most recent post (always first from original posts, doesn't change with filters)
  const mostRecentPost = posts[0];
  // Featured post for desktop - changes with category filter
  const filteredFeaturedPost = paginatedPosts[0];

  // Reset to page 1 when filter changes
  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  // Get the display label for the selected tag
  const getSelectedLabel = () => {
    if (selectedTag === 'all') return 'View all Posts';
    if (selectedTag === 'neighborhoods') return 'Neighborhoods';
    const tag = regularTags.find(t => t.slug === selectedTag);
    return tag?.name || 'View all';
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('ellipsis');
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) pages.push(i);
      
      if (currentPage < totalPages - 2) pages.push('ellipsis');
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="py-10 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Sidebar - Desktop Only */}
          <aside className="hidden lg:block lg:w-56 flex-shrink-0">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Desktop Category List */}
              <div>
                <p className="text-sm font-medium text-primary mb-3">Blog categories</p>
                <div className="space-y-1">
                  <CategoryItem 
                    name="View all" 
                    isActive={selectedTag === 'all'} 
                    onClick={() => handleTagChange('all')} 
                  />
                  {regularTags.map((tag) => (
                    <CategoryItem
                      key={tag.slug}
                      name={tag.name}
                      isActive={selectedTag === tag.slug}
                      onClick={() => handleTagChange(tag.slug)}
                    />
                  ))}
                  {hasNeighborhoods && (
                    <CategoryItem 
                      name="Neighborhoods" 
                      isActive={selectedTag === 'neighborhoods'} 
                      onClick={() => handleTagChange('neighborhoods')} 
                    />
                  )}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {filteredPosts.length === 0 ? (
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  No posts found
                </h2>
                <p className="text-muted-foreground">
                  {selectedTag === 'all' 
                    ? 'Check back soon for our latest insights and updates.'
                    : 'No posts found for the selected category.'
                  }
                </p>
              </motion.div>
            ) : (
              <>
                {/* Featured post on first page - mobile shows most recent, desktop shows filtered */}
                {currentPage === 1 && (
                  <>
                    {/* Mobile: Always show most recent post */}
                    <AnimatePresence mode="wait">
                      {mostRecentPost && (
                        <div key={`mobile-featured-${mostRecentPost.id}`} className="mb-6 lg:hidden">
                          <FeaturedPostCard post={mostRecentPost} />
                        </div>
                      )}
                    </AnimatePresence>
                    {/* Desktop: Show filtered featured post */}
                    <AnimatePresence mode="wait">
                      {filteredFeaturedPost && (
                        <div key={`desktop-featured-${filteredFeaturedPost.id}`} className="mb-6 hidden lg:block">
                          <FeaturedPostCard post={filteredFeaturedPost} />
                        </div>
                      )}
                    </AnimatePresence>
                  </>
                )}

                {/* Mobile Category Select - Below featured post */}
                <div className="lg:hidden mb-6">
                  <Select value={selectedTag} onValueChange={handleTagChange}>
                    <SelectTrigger className="w-full bg-background border-primary/10">
                      <SelectValue placeholder="Select category">{getSelectedLabel()}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">View all Posts</SelectItem>
                      {regularTags.map((tag) => (
                        <SelectItem key={tag.slug} value={tag.slug}>
                          {tag.name}
                        </SelectItem>
                      ))}
                      {hasNeighborhoods && (
                        <SelectItem value="neighborhoods">Neighborhoods</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {/* Blog Posts Grid - 2 columns */}
                {/* Mobile: Show all filtered posts (featured is always most recent, separate from filter) */}
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={`mobile-grid-${selectedTag}-${currentPage}`}
                    className="grid grid-cols-1 gap-6 lg:hidden"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {paginatedPosts.map((post) => (
                      <motion.div key={post.id} variants={cardVariants}>
                        <BlogCard post={post} />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
                {/* Desktop: Exclude first post on page 1 since it's shown as featured */}
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={`desktop-grid-${selectedTag}-${currentPage}`}
                    className="hidden lg:grid lg:grid-cols-2 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {(currentPage === 1 ? paginatedPosts.slice(1) : paginatedPosts).map((post) => (
                      <motion.div key={post.id} variants={cardVariants}>
                        <BlogCard post={post} />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav className="flex items-center justify-between mt-16 pt-8 border-t border-primary/10">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors",
                        currentPage === 1
                          ? "text-muted-foreground border-primary/10 cursor-not-allowed"
                          : "text-foreground border-primary/20 hover:bg-primary/5"
                      )}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Previous
                    </button>

                    <div className="hidden sm:flex items-center gap-1">
                      {getPageNumbers().map((page, idx) => (
                        page === 'ellipsis' ? (
                          <span key={`ellipsis-${idx}`} className="px-3 py-2 text-muted-foreground">
                            ...
                          </span>
                        ) : (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={cn(
                              "w-10 h-10 text-sm font-medium rounded-lg transition-colors",
                              currentPage === page
                                ? "bg-primary/10 text-foreground border border-primary/20"
                                : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                            )}
                          >
                            {page}
                          </button>
                        )
                      ))}
                    </div>

                    <span className="sm:hidden text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </span>

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors",
                        currentPage === totalPages
                          ? "text-muted-foreground border-primary/10 cursor-not-allowed"
                          : "text-foreground border-primary/20 hover:bg-primary/5"
                      )}
                    >
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </nav>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
