import GhostContentAPI from '@tryghost/content-api';

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: process.env.GHOST_API_URL || 'https://demo.ghost.io',
  key: process.env.GHOST_CONTENT_API_KEY || '22444f78447824223cefc48062',
  version: 'v6.0'
});

// Define types for Ghost content
export interface GhostPost {
  id: string;
  title: string;
  slug: string;
  html: string;
  feature_image?: string;
  excerpt?: string;
  published_at: string;
  reading_time?: number;
  tags?: GhostTag[];
  authors?: GhostAuthor[];
}

export interface GhostTag {
  id: string;
  name: string;
  slug: string;
}

export interface GhostAuthor {
  id: string;
  name: string;
  slug: string;
  bio?: string;
  profile_image?: string;
}

// Fetch all posts
export async function getPosts(limit: number | 'all' = 15): Promise<GhostPost[]> {
  try {
    const posts = await api.posts.browse({
      include: ['tags', 'authors'] as const,
      limit: limit,
      order: 'published_at DESC'
    });
    return posts as GhostPost[];
  } catch (err) {
    console.error('Error fetching posts:', err);
    return [];
  }
}

// Fetch a single post by slug
export async function getSinglePost(slug: string): Promise<GhostPost | null> {
  try {
    const post = await api.posts.read(
      { slug },
      { include: ['tags', 'authors'] as const }
    );
    return post as GhostPost;
  } catch (err) {
    console.error(`Error fetching post ${slug}:`, err);
    return null;
  }
}

// Fetch all post slugs for static generation
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const allPostSlugs: string[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const posts = await api.posts.browse({
        limit: 100,
        page,
        fields: 'slug',
      });

      if (posts && posts.length > 0) {
        allPostSlugs.push(...posts.map((item: { slug: string }) => item.slug));
        // Check if there are more pages
        const meta = (posts as { meta?: { pagination?: { next: number | null } } }).meta;
        hasMore = meta?.pagination?.next !== null;
        page = meta?.pagination?.next || page + 1;
      } else {
        hasMore = false;
      }
    }

    return allPostSlugs;
  } catch (err) {
    console.error('Error fetching post slugs:', err);
    return [];
  }
}

// Fetch featured posts
export async function getFeaturedPosts(limit: number = 3): Promise<GhostPost[]> {
  try {
    const posts = await api.posts.browse({
      include: ['tags', 'authors'] as const,
      limit: limit,
      filter: 'featured:true',
      order: 'published_at DESC'
    });
    return posts as GhostPost[];
  } catch (err) {
    console.error('Error fetching featured posts:', err);
    return [];
  }
}

// Fetch posts by tag
export async function getPostsByTag(tagSlug: string, limit: number = 10): Promise<GhostPost[]> {
  try {
    const posts = await api.posts.browse({
      include: ['tags', 'authors'] as const,
      limit: limit,
      filter: `tag:${tagSlug}`,
      order: 'published_at DESC'
    });
    return posts as GhostPost[];
  } catch (err) {
    console.error(`Error fetching posts for tag ${tagSlug}:`, err);
    return [];
  }
}

// Fetch all tags
export async function getAllTags(): Promise<GhostTag[]> {
  try {
    const tags = await api.tags.browse({
      limit: 'all',
      order: 'name ASC'
    });
    return tags as GhostTag[];
  } catch (err) {
    console.error('Error fetching tags:', err);
    return [];
  }
}

export default api;