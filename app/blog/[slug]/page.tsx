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

interface BlogPostPageProps {
  params: {
    slug: string;
  };
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

// Function to extract the first paragraph before a figure as description
function extractDescriptionFromHtml(html: string): string | null {
  // Look for a <p> tag that comes directly before a <figure> tag
  const match = html.match(/<p[^>]*>(.*?)<\/p>\s*<figure/i);
  if (match) {
    // Strip HTML tags and return clean text
    return match[1].replace(/<[^>]*>/g, '').trim();
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

// Function to remove the first figure from HTML content
function removeFirstFigure(html: string): string {
  // Remove the first figure tag and any preceding paragraph that was used as description
  return html.replace(/<p[^>]*>[\s\S]*?<\/p>\s*<figure[^>]*class="[^"]*kg-image-card[^"]*"[^>]*>[\s\S]*?<\/figure>/i, '');
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
  const contentWithoutFirstFigure = extractedFigure ? removeFirstFigure(processedHtml) : processedHtml;

  return (
    <div className="min-h-screen bg-background">
      {/* Article Header */}
      <header className="bg-primary px-4 sm:px-6 lg:px-8 mb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-48 -mt-24">
          <div className="text-left">
           <h1 className="text-4xl md:text-5xl font-medium text-background mb-6 leading-tight font-sans">
             {post.title}
           </h1>

           {extractedDescription && (
             <p className="text-xl text-background/70 mb-12 leading-relaxed font-sans max-w-3xl">
               {extractedDescription}
             </p>
           )}

           <div className='h-[1px] bg-background/10 w-12 mb-12'></div>

           {extractedFigure && (
             <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-8">
               <Image
                 src={extractedFigure.src}
                 alt={extractedFigure.alt || post.title}
                 fill
                 className="object-cover aspect-video"
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
          <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8">
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
        <h3 className="text-2xl font-bold mb-4 font-sans">Introduction</h3>
        <div 
          className="prose prose-lg prose-blue max-w-none font-sans
                     prose-headings:text-gray-900 prose-headings:font-bold prose-headings:leading-tight prose-headings:font-sans
                     prose-h1:!text-4xl prose-h1:!mb-6 prose-h1:!mt-8 prose-h1:!font-sans
                     prose-h2:!text-3xl prose-h2:!mb-4 prose-h2:!mt-8 prose-h2:!font-sans
                     prose-h3:!text-2xl prose-h3:!mb-3 prose-h3:!mt-6 prose-h3:!font-sans
                     prose-h4:!text-xl prose-h4:!mb-2 prose-h4:!mt-4 prose-h4:!font-sans
                     prose-h5:!text-lg prose-h5:!mb-2 prose-h5:!mt-4 prose-h5:!font-sans
                     prose-h6:!text-base prose-h6:!mb-2 prose-h6:!mt-4 prose-h6:!font-sans
                     prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:font-sans
                     prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-a:font-sans
                     prose-strong:text-gray-900 prose-strong:font-sans
                     prose-code:text-blue-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded prose-code:font-mono
                     prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:font-mono
                     prose-blockquote:border-blue-500 prose-blockquote:text-gray-700 prose-blockquote:font-sans
                     prose-img:rounded-lg prose-img:shadow-md
                     [&>h1]:!text-4xl [&>h1]:!font-bold [&>h1]:!mb-6 [&>h1]:!mt-8 [&>h1]:!font-sans
                     [&>h2]:!text-3xl [&>h2]:!font-bold [&>h2]:!mb-4 [&>h2]:!mt-8 [&>h2]:!font-sans
                     [&>h3]:!text-2xl [&>h3]:!font-bold [&>h3]:!mb-3 [&>h3]:!mt-6 [&>h3]:!font-sans
                     [&>h4]:!text-xl [&>h4]:!font-bold [&>h4]:!mb-2 [&>h4]:!mt-4 [&>h4]:!font-sans
                     [&>h5]:!text-lg [&>h5]:!font-bold [&>h5]:!mb-2 [&>h5]:!mt-4 [&>h5]:!font-sans
                     [&>h6]:!text-base [&>h6]:!font-bold [&>h6]:!mb-2 [&>h6]:!mt-4 [&>h6]:!font-sans
                     [&_h1]:!text-4xl [&_h1]:!font-bold [&_h1]:!mb-6 [&_h1]:!mt-8 [&_h1]:!font-sans
                     [&_h2]:!text-3xl [&_h2]:!font-bold [&_h2]:!mb-4 [&_h2]:!mt-8 [&_h2]:!font-sans
                     [&_h3]:!text-2xl [&_h3]:!font-bold [&_h3]:!mb-3 [&_h3]:!mt-6 [&_h3]:!font-sans
                     [&_h4]:!text-xl [&_h4]:!font-bold [&_h4]:!mb-2 [&_h4]:!mt-4 [&_h4]:!font-sans
                     [&_h5]:!text-lg [&_h5]:!font-bold [&_h5]:!mb-2 [&_h5]:!mt-4 [&_h5]:!font-sans
                     [&_h6]:!text-base [&_h6]:!font-bold [&_h6]:!mb-2 [&_h6]:!mt-4 [&_h6]:!font-sans
                     [&>p]:!font-sans [&_p]:!font-sans [&>*]:!font-sans [&_*]:!font-sans"
          dangerouslySetInnerHTML={{ __html: contentWithoutFirstFigure }}
        />
      </article>
        {/* newsletter signup */}
        <div className="flex flex-col gap-4 bg-muted/50 border p-6 rounded-lg h-fit sticky top-24">
          <MailIcon className="w-12 h-12 p-3 border rounded-md text-primary" />
          <p className="text-lg font-medium">Stay Informed</p>
          <p className="text-sm text-muted-foreground">Get expert insights, market trends, and valuable tips for buyers and sellers.</p>
          <div className="flex flex-col gap-4">
            <Input type="email" placeholder="Enter your email" className="w-full bg-background" />
            <Button className="w-full">Subscribe</Button> 
          </div>
        </div>
      </div>

      {/* Article Footer */}
      <Footer />
    </div>
  );
}