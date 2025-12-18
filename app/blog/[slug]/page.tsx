import { getSinglePost, getAllPostSlugs } from '@/lib/ghost';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import { MailIcon } from 'lucide-react';
import { Footer } from '@/components/sections/navigation/footer';
import CTA from '@/components/sections/home/cta';
import { format } from 'date-fns';
import { NewsletterSubscribe } from '@/components/newsletter-subscribe';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getSinglePost(slug);

  if (!post) {
    return {
      title: 'Post Not Found - The Hume Group',
    };
  }

  return {
    title: `${post.title}`,
    description: post.excerpt || `Read ${post.title} on The Hume Group blog - Tacoma real estate insights and tips.`,
    keywords: [
      'Tacoma real estate blog',
      'Tacoma housing market',
      'home buying tips Tacoma',
      'home selling tips Tacoma',
      ...(post.tags?.map(tag => tag.name) || []),
    ],
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt || `Read ${post.title} on The Hume Group blog`,
      url: `https://thehumegroup.com/blog/${slug}`,
      images: post.feature_image ? [
        {
          url: post.feature_image,
          width: 1200,
          height: 630,
          alt: post.feature_image_alt || post.title,
        }
      ] : [],
      publishedTime: post.published_at,
      authors: post.authors?.map(author => author.name) || ['The Hume Group'],
      tags: post.tags?.map(tag => tag.name) || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || `Read ${post.title} on The Hume Group blog`,
      images: post.feature_image ? [post.feature_image] : [],
    },
    alternates: {
      canonical: `https://thehumegroup.com/blog/${slug}`,
    },
  };
}

// Revalidate every hour
export const revalidate = 3600;

// Function to convert image links to actual img tags
function processImageLinks(html: string): string {
  // Convert links to images (jpg, jpeg, png, gif, webp) into img tags
  return html.replace(
    /<a\s+href="([^"]*\.(jpg|jpeg|png|gif|webp)(?:\?[^"]*)?)"[^>]*>([^<]*)<\/a>/gi,
    '<figure class="kg-card kg-image-card"><img src="$1" alt="$3" class="kg-image" loading="lazy" /></figure>'
  );
}


export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getSinglePost(slug);

  if (!post) {
    notFound();
  }

  const processedHtml = processImageLinks(post.html);

  // JSON-LD for Article
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || `Read ${post.title} on The Hume Group blog`,
    image: post.feature_image || '',
    datePublished: post.published_at,
    dateModified: post.published_at,
    author: post.authors?.map(author => ({
      '@type': 'Person',
      name: author.name,
      url: 'https://thehumegroup.com/about',
    })) || [{
      '@type': 'Organization',
      name: 'The Hume Group',
      url: 'https://thehumegroup.com',
    }],
    publisher: {
      '@type': 'Organization',
      name: 'The Hume Group',
      url: 'https://thehumegroup.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://thehumegroup.com/logo.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://thehumegroup.com/blog/${slug}`,
    },
    keywords: post.tags?.map(tag => tag.name).join(', ') || 'Tacoma real estate',
  };

  // JSON-LD for BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://thehumegroup.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://thehumegroup.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://thehumegroup.com/blog/${slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Article Header */}
      <header className="px-4 md:px-6">
        <div className="container mx-auto px-0 md:px-6 md:pb-8 pt-8 md:pt-16">
          <div className="text-left">
           <Breadcrumb className="mb-6">
             <BreadcrumbList>
               <BreadcrumbItem>
                 <BreadcrumbLink href="/">Home</BreadcrumbLink>
               </BreadcrumbItem>
               <BreadcrumbSeparator />
               <BreadcrumbItem>
                 <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
               </BreadcrumbItem>
               <BreadcrumbSeparator />
               <BreadcrumbItem>
                 <BreadcrumbPage>{post.title}</BreadcrumbPage>
               </BreadcrumbItem>
             </BreadcrumbList>
           </Breadcrumb>

           <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-4 leading-tight font-sans">
             {post.title}
           </h1>

           {post.feature_image_caption && (
             <div 
               className="text-lg text-muted-foreground mb-12 leading-relaxed [&_*]:not-italic"
               dangerouslySetInnerHTML={{ __html: post.feature_image_caption }}
             />
           )}

           {post.feature_image && (
             <>
               <div className="relative w-full aspect-[2/1] rounded-lg overflow-hidden mb-6">
                 <Image
                   src={post.feature_image}
                   alt={post.feature_image_alt || post.title}
                   fill
                   className="object-cover"
                   quality={100}
                   priority
                 />
               </div>
               
              {/* Tags and Date under image */}
              <div className="flex flex-row items-center justify-between md:justify-start gap-3">
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="inline-block border text-xs sm:text-sm px-2.5 sm:px-3 py-1 rounded-md"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}
                
                <time dateTime={post.published_at} className="text-sm border px-2.5 sm:px-3 py-1 rounded-md text-muted-foreground shrink-0">
                  {format(new Date(post.published_at), 'MMMM dd, yyyy')}
                </time>
              </div>
             </>
           )}

          {/* <div className="flex items-center justify-center text-gray-600 mb-8">
            <time dateTime={post.published_at}>
              {format(publishedDate, 'MMMM dd, yyyy')}
            </time>
            {post.reading_time && (
              <>
                <span className="mx-3">•</span>
                <span>{post.reading_time} min read</span>
              </>
            )}
          </div> */}

          {/* {post.authors && post.authors.length > 0 && (
            <div className="flex items-center justify-center mb-8">
              {post.authors.map((author, index) => (
                <div key={author.id} className="flex items-center">
                  {index > 0 && <span className="mx-2 text-gray-400">&</span>}
                  {author.profile_image && (
                    <Image
                      src={author.profile_image}
                      alt={author.name}
                      width={32}
                      height={32}
                      className="rounded-full mr-2"
                    />
                  )}
                  <span className="text-gray-700 font-medium">{author.name}</span>
                </div>
              ))}
            </div>
          )} */}
        </div>
        </div>
      </header>


      <div className="flex flex-col lg:flex-row gap-8 lg:gap-6 container mx-auto font-sans px-4 md:px-6">
      {/* Article Content */}
      <article className="max-w-4xl lg:mr-auto">
        <div 
          className="prose prose-base md:prose-lg prose-blue max-w-none font-sans
                     prose-headings:text-foreground prose-headings:font-medium prose-headings:leading-tight prose-headings:font-sans
                     prose-h1:!text-lg md:prose-h1:!text-xl prose-h1:!mt-6 md:prose-h1:!mt-8 prose-h1:!font-sans
                     prose-h2:!text-lg md:prose-h2:!text-xl prose-h2:!mt-6 md:prose-h2:!mt-8 prose-h2:!font-sans
                     prose-h3:!text-lg md:prose-h3:!text-xl prose-h3:!mt-5 md:prose-h3:!mt-6 prose-h3:!font-sans
                     prose-h4:!text-lg md:prose-h4:!text-xl prose-h4:!mt-4 prose-h4:!font-sans
                     prose-h5:!text-lg md:prose-h5:!text-xl prose-h5:!mt-4 prose-h5:!font-sans
                     prose-h6:!text-base prose-h6:!mb-2 prose-h6:!mt-4 prose-h6:!font-sans
                     prose-p:text-foreground/80 prose-p:text-base md:prose-p:text-lg prose-p:leading-relaxed prose-p:font-sans
                     prose-a:text-primary prose-a:underline hover:prose-a:underline prose-a:font-sans prose-a:break-words
                     prose-strong:!text-foreground prose-strong:font-medium prose-strong:font-sans
                     prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:rounded prose-code:font-mono prose-code:text-sm md:prose-code:text-base prose-code:break-words
                     prose-pre:bg-foreground prose-pre:text-background prose-pre:font-mono prose-pre:overflow-x-auto prose-pre:text-sm md:prose-pre:text-base
                     prose-blockquote:border-primary prose-blockquote:text-foreground/70 prose-blockquote:font-sans
                     prose-img:rounded-lg prose-img:shadow-md
                     prose-ul:text-foreground/80 prose-ul:text-base md:prose-ul:text-xl prose-ol:text-foreground/80 prose-ol:text-base md:prose-ol:text-xl
                     prose-li:text-foreground/80 prose-li:text-base md:prose-li:text-xl
                     [&>h1]:!text-lg md:[&>h1]:!text-xl [&>h1]:!font-medium [&>h1]:!mb-4 md:[&>h1]:!mb-6 [&>h1]:!mt-6 md:[&>h1]:!mt-8 [&>h1]:!font-sans [&>h1]:!text-foreground
                     [&>h2]:!text-lg md:[&>h2]:!text-xl [&>h2]:!font-medium [&>h2]:!mb-0 [&>h2]:!mt-6 md:[&>h2]:!mt-8 [&>h2]:!font-sans [&>h2]:!text-foreground

                     [&>h3]:!text-xl md:[&>h3]:!text-2xl [&>h3]:!font-medium [&>h3]:!mb-3 [&>h3]:!mt-5 md:[&>h3]:!mt-6 [&>h3]:!font-sans [&>h3]:!text-foreground
                     [&>h4]:!text-lg md:[&>h4]:!text-xl [&>h4]:!font-medium [&>h4]:!mb-2 [&>h4]:!mt-4 [&>h4]:!font-sans [&>h4]:!text-foreground
                     [&>h5]:!text-lg md:[&>h5]:!text-xl [&>h5]:!font-medium [&>h5]:!mb-2 [&>h5]:!mt-4 [&>h5]:!font-sans [&>h5]:!text-foreground
                     [&>h6]:!text-lg md:[&>h6]:!text-xl [&>h6]:!font-medium [&>h6]:!mb-2 [&>h6]:!mt-4 [&>h6]:!font-sans [&>h6]:!text-foreground
                     [&_h1]:!text-lg md:[&_h1]:!text-xl [&_h1]:!font-medium [&_h1]:!mb-0 [&_h1]:!mt-6 md:[&_h1]:!mt-8 [&_h1]:!font-sans [&_h1]:!text-foreground
                     [&_h2]:!text-lg md:[&_h2]:!text-xl [&_h2]:!font-medium [&_h2]:!mb-0 [&_h2]:!mt-6 md:[&_h2]:!mt-8 [&_h2]:!font-sans [&_h2]:!text-foreground
                     [&_h3]:!text-lg md:[&_h3]:!text-xl [&_h3]:!font-medium [&_h3]:!mb-0 [&_h3]:!mt-5 md:[&_h3]:!mt-6 [&_h3]:!font-sans [&_h3]:!text-foreground
                     [&_h4]:!text-lg md:[&_h4]:!text-xl [&_h4]:!font-medium [&_h4]:!mb-0 [&_h4]:!mt-4 [&_h4]:!font-sans [&_h4]:!text-foreground
                     [&_h5]:!text-lg md:[&_h5]:!text-xl [&_h5]:!font-medium [&_h5]:!mb-0 [&_h5]:!mt-4 [&_h5]:!font-sans [&_h5]:!text-foreground
                     [&_h6]:!text-lg md:[&_h6]:!text-xl [&_h6]:!font-medium [&_h6]:!mb-0 [&_h6]:!mt-4 [&_h6]:!font-sans [&_h6]:!text-foreground
                     [&>p]:!font-sans [&>p]:!text-base md:[&>p]:!text-xl [&>p]:!text-foreground/80 [&>p]:!leading-relaxed [&>p]:!mb-6 md:[&>p]:!mb-8
                     [&_p]:!font-sans [&_p]:!text-base md:[&_p]:!text-xl [&_p]:!text-foreground/80 [&_p]:!leading-relaxed
                     [&_strong]:!text-foreground [&_strong]:!font-medium
                     [&_b]:!text-foreground [&_b]:!font-medium
                     [&_li]:!text-base md:[&_li]:!text-lg [&_li]:!text-foreground/80
                     [&>*]:!font-sans [&_*]:!font-sans
                     [&_img]:!aspect-video [&_img]:!object-cover [&_img]:!w-full [&_img]:!rounded-lg [&_img]:!my-6 md:[&_img]:!my-8" 
          dangerouslySetInnerHTML={{ __html: processedHtml }}
        />
      </article>
        {/* newsletter signup */}
        <div className="flex flex-col gap-4 bg-primary/5 border p-4 md:p-6 rounded-lg h-fit lg:sticky lg:top-24 w-full lg:w-auto lg:min-w-[300px] lg:max-w-[1000px] shrink-0">
          <MailIcon className="w-10 h-10 md:w-12 md:h-12 p-2.5 md:p-3 border rounded-md bg-background text-primary" />
          <p className="text-base md:text-lg font-medium text-foreground">Stay Informed</p>
          <p className="text-sm md:text-base text-foreground/70">Get expert insights, market trends, and valuable tips for buyers and sellers.</p>
          <NewsletterSubscribe 
            variant="card"
            source="Blog Post Sidebar"
            inputClassName="bg-background"
          />
        </div>
      </div>
      <div className="my-8 md:my-12 pt-8 md:pt-12">
        <CTA />
      </div>
      {/* Article Footer */}
      <Footer />
    </div>
  );
}