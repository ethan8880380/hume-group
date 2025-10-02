import { getSinglePost, getAllPostSlugs, GhostPost } from '@/lib/ghost';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { Metadata } from 'next';
import { MailIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/sections/navigation/footer';
import CTA from '@/components/sections/home/cta';
import { Blog } from '@/components/sections/home/blog';

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
    title: `${post.title} - The Hume Group Blog`,
    description: post.excerpt || `Read ${post.title} on The Hume Group blog`,
    openGraph: {
      title: post.title,
      description: post.excerpt || `Read ${post.title} on The Hume Group blog`,
      images: post.feature_image ? [post.feature_image] : [],
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

// Function to extract the first paragraph as description
function extractDescriptionFromHtml(html: string): string | null {
  // First, try to find a <p> tag that comes directly before a <figure> tag
  let match = html.match(/<p[^>]*>(.*?)<\/p>\s*<figure/i);
  if (match) {
    // Strip HTML tags and return clean text
    return match[1].replace(/<[^>]*>/g, '').trim();
  }
  
  // If no paragraph before figure, just extract the first paragraph
  match = html.match(/<p[^>]*>(.*?)<\/p>/i);
  if (match) {
    // Strip HTML tags and return clean text
    const text = match[1].replace(/<[^>]*>/g, '').trim();
    // Only return if it has substantial content (more than 20 characters)
    if (text.length > 20) {
      return text;
    }
  }
  
  return null;
}

// Function to extract the first figure from HTML
function extractFirstFigure(html: string): { src: string; alt: string; caption?: string } | null {
  // Look for the first figure tag
  const figureMatch = html.match(/<figure[^>]*class="[^"]*kg-image-card[^"]*"[^>]*>([\s\S]*?)<\/figure>/i);
  if (figureMatch) {
    const figureContent = figureMatch[1];
    
    // Extract image src
    const srcMatch = figureContent.match(/src="([^"]+)"/i);
    // Extract alt text
    const altMatch = figureContent.match(/alt="([^"]*)"/i);
    // Extract caption if exists
    const captionMatch = figureContent.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i);
    
    if (srcMatch) {
      return {
        src: srcMatch[1],
        alt: altMatch ? altMatch[1] : '',
        caption: captionMatch ? captionMatch[1].replace(/<[^>]*>/g, '').trim() : undefined
      };
    }
  }
  return null;
}

// Function to remove the first paragraph and figure from HTML content
function removeFirstParagraphAndFigure(html: string): string {
  // First remove the first paragraph and figure if they exist together
  let result = html.replace(/<p[^>]*>[\s\S]*?<\/p>\s*<figure[^>]*class="[^"]*kg-image-card[^"]*"[^>]*>[\s\S]*?<\/figure>/i, '');
  
  // If that didn't remove anything (no figure), just remove the first paragraph
  if (result === html) {
    result = html.replace(/<p[^>]*>.*?<\/p>/i, '');
  }
  
  return result;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getSinglePost(slug);

  if (!post) {
    notFound();
  }

  const publishedDate = new Date(post.published_at);
  const processedHtml = processImageLinks(post.html);
  const extractedDescription = extractDescriptionFromHtml(post.html);
  const extractedFigure = extractFirstFigure(processedHtml);
  const contentWithoutFirstParagraphAndFigure = removeFirstParagraphAndFigure(processedHtml);

  return (
    <div className="min-h-screen bg-background">
      {/* Article Header */}
      <header className="px-6 mb-8">
        <div className="container mx-auto px-6 pb-12 pt-48 -mt-24">
          <div className="text-left">
           <h1 className="text-4xl md:text-5xl font-medium text-foreground mb-6 leading-tight font-sans">
             {post.title}
           </h1>

           {extractedDescription && (
             <p className="text-xl text-foreground/70 mb-8 leading-relaxed font-sans max-w-3xl">
               {extractedDescription}
             </p>
           )}

           <div className='h-[1px] bg-muted-foreground/10 w-12 mb-12'></div>

           {extractedFigure && (
             <div className="relative w-full aspect-[2/1] rounded-lg overflow-hidden mb-8">
               <Image
                 src={extractedFigure.src}
                 alt={extractedFigure.alt || post.title}
                 fill
                 className="object-cover"
                 quality={100}
                 priority
               />
             </div>
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

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap justify-left gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {post.feature_image && (
          <div className="relative w-full aspect-[2/1] rounded-lg overflow-hidden mb-8">
            <Image
              src={post.feature_image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        </div>
      </header>

      {/* Debug Section - Remove this in production 
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <details className="bg-gray-100 p-4 rounded-lg">
          <summary className="cursor-pointer font-semibold text-gray-700 mb-2">
            Debug: Raw Post Data (Click to expand)
          </summary>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">HTML Content Preview:</h4>
              <pre className="bg-white p-4 rounded border overflow-auto text-xs max-h-40">
                {post.html}
              </pre>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Full Post Data:</h4>
              <pre className="bg-white p-4 rounded border overflow-auto text-xs max-h-60">
                {JSON.stringify(post, null, 2)}
              </pre>
            </div>
          </div>
        </details>
      </section>*/}



      <div className="flex flex-row gap-4 container mx-auto font-sans mb-24">
      {/* Article Content */}
      <article className="max-w-4xl mr-auto sm:px-6 lg:px-8">
        <div 
          className="prose prose-lg prose-blue max-w-none font-sans
                     prose-headings:text-foreground prose-headings:font-medium prose-headings:leading-tight prose-headings:font-sans
                     prose-h1:!text-xl prose-h1:!mt-8 prose-h1:!font-sans
                     prose-h2:!text-xl prose-h2:!mt-8 prose-h2:!font-sans
                     prose-h3:!text-xl prose-h3:!mt-6 prose-h3:!font-sans
                     prose-h4:!text-xl prose-h4:!mt-4 prose-h4:!font-sans
                     prose-h5:!text-xl prose-h5:!mt-4 prose-h5:!font-sans
                     prose-h6:!text-base prose-h6:!mb-2 prose-h6:!mt-4 prose-h6:!font-sans
                     prose-p:text-foreground/80 prose-p:text-lg prose-p:leading-relaxed prose-p:font-sans
                     prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-sans
                     prose-strong:!text-foreground prose-strong:font-medium prose-strong:font-sans
                     prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:rounded prose-code:font-mono
                     prose-pre:bg-foreground prose-pre:text-background prose-pre:font-mono
                     prose-blockquote:border-primary prose-blockquote:text-foreground/70 prose-blockquote:font-sans
                     prose-img:rounded-lg prose-img:shadow-md
                     prose-ul:text-foreground/80 prose-ul:text-xl prose-ol:text-foreground/80 prose-ol:text-xl
                     prose-li:text-foreground/80 prose-li:text-xl
                     [&>h1]:!text-xl [&>h1]:!font-medium [&>h1]:!mb-6 [&>h1]:!mt-8 [&>h1]:!font-sans [&>h1]:!text-foreground
                     [&>h2]:!text-xl [&>h2]:!font-medium [&>h2]:!mb-0 [&>h2]:!mt-8 [&>h2]:!font-sans [&>h2]:!text-foreground

                     [&>h3]:!text-xl [&>h3]:!font-medium [&>h3]:!mb-0 [&>h3]:!mt-6 [&>h3]:!font-sans [&>h3]:!text-foreground
                     [&>h4]:!text-xl [&>h4]:!font-medium [&>h4]:!mb-2 [&>h4]:!mt-4 [&>h4]:!font-sans [&>h4]:!text-foreground
                     [&>h5]:!text-xl [&>h5]:!font-medium [&>h5]:!mb-2 [&>h5]:!mt-4 [&>h5]:!font-sans [&>h5]:!text-foreground
                     [&>h6]:!text-xl [&>h6]:!font-medium [&>h6]:!mb-2 [&>h6]:!mt-4 [&>h6]:!font-sans [&>h6]:!text-foreground
                     [&_h1]:!text-xl [&_h1]:!font-medium [&_h1]:!mb-0 [&_h1]:!mt-8 [&_h1]:!font-sans [&_h1]:!text-foreground
                     [&_h2]:!text-xl [&_h2]:!font-medium [&_h2]:!mb-0 [&_h2]:!mt-8 [&_h2]:!font-sans [&_h2]:!text-foreground
                     [&_h3]:!text-xl [&_h3]:!font-medium [&_h3]:!mb-0 [&_h3]:!mt-6 [&_h3]:!font-sans [&_h3]:!text-foreground
                     [&_h4]:!text-xl [&_h4]:!font-medium [&_h4]:!mb-0 [&_h4]:!mt-4 [&_h4]:!font-sans [&_h4]:!text-foreground
                     [&_h5]:!text-xl [&_h5]:!font-medium [&_h5]:!mb-0 [&_h5]:!mt-4 [&_h5]:!font-sans [&_h5]:!text-foreground
                     [&_h6]:!text-xl [&_h6]:!font-medium [&_h6]:!mb-0 [&_h6]:!mt-4 [&_h6]:!font-sans [&_h6]:!text-foreground
                     [&>p]:!font-sans [&>p]:!text-xl [&>p]:!text-foreground/80 [&>p]:!leading-relaxed [&>p]:!mb-8
                     [&_p]:!font-sans [&_p]:!text-xl [&_p]:!text-foreground/80 [&_p]:!leading-relaxed
                     [&_strong]:!text-foreground [&_strong]:!font-medium
                     [&_b]:!text-foreground [&_b]:!font-medium
                     [&_li]:!text-lg [&_li]:!text-foreground/80
                     [&>*]:!font-sans [&_*]:!font-sans"
          dangerouslySetInnerHTML={{ __html: contentWithoutFirstParagraphAndFigure }}
        />
      </article>
        {/* newsletter signup */}
        <div className="flex flex-col gap-4 bg-muted/50 border p-6 rounded-lg h-fit sticky top-24">
          <MailIcon className="w-12 h-12 p-3 border rounded-md bg-background text-primary" />
          <p className="text-lg font-medium text-foreground">Stay Informed</p>
          <p className="text-base text-foreground/70">Get expert insights, market trends, and valuable tips for buyers and sellers.</p>
          <div className="flex flex-col gap-4">
            <Input type="email" placeholder="Enter your email" className="w-full bg-background" />
            <Button className="w-full">Subscribe</Button> 
          </div>
        </div>
      </div>
      <div className="my-12 pt-12">
        <Blog />
        <CTA />
      </div>
      {/* Article Footer */}
      <Footer />
    </div>
  );
}