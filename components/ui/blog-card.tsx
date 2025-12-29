import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { GhostPost } from '@/lib/ghost';

interface BlogCardProps {
  post: GhostPost;
}

// Tags to hide from display (internal/system tags)
const HIDDEN_TAG_SLUGS = ['tom-thehumegroup-com'];

function isHiddenTag(slug: string): boolean {
  return HIDDEN_TAG_SLUGS.some(hs => slug.toLowerCase().includes(hs.toLowerCase()));
}

export function BlogCard({ post }: BlogCardProps) {
  // Get the first visible tag (skip hidden tags)
  const primaryTag = post.tags?.find(tag => !isHiddenTag(tag.slug));

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="relative h-full flex flex-col bg-white rounded-xl overflow-hidden border border-primary/5 hover:border-primary/20 transition-all duration-300">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden flex-shrink-0">
          {post.feature_image ? (
            <Image
              src={post.feature_image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
              <span className="text-muted-foreground">The Hume Group</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Tag & Reading Time */}
          <div className="flex items-center gap-3 mb-3">
            {primaryTag && (
              <span className="text-sm font-medium text-muted-foreground">
                {primaryTag.name}
              </span>
            )}
            {post.reading_time && (
              <>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/40"></span>
                <span className="text-sm text-muted-foreground">
                  {post.reading_time} min read
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg md:text-xl font-medium text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-grow">
            {post.excerpt || 'Read more to discover insights and tips from The Hume Group team.'}
          </p>

          {/* Read More Link */}
          <div className="flex items-center gap-2 text-sm font-medium text-primary mt-4">
            Read article
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </div>
      </article>
    </Link>
  );
}
