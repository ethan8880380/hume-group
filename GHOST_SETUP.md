# Ghost CMS Integration Setup Guide

## 🎉 What's Been Set Up

Your Next.js project now has a complete Ghost CMS integration! Here's what's been added:

### Files Created:
- `lib/ghost.ts` - Ghost API client with TypeScript types
- `app/blog/page.tsx` - Blog listing page
- `app/blog/[slug]/page.tsx` - Individual blog post pages
- `components/sections/home/blog-preview.tsx` - Homepage blog preview component
- `ghost.env.example` - Environment variables template

### Files Updated:
- `components/sections/home/blog.tsx` - Now pulls from Ghost instead of static data
- Navigation already includes `/blog` link (line 59-61 in header.tsx)

### Packages Installed:
- `@tryghost/content-api` - Official Ghost Content API client
- `date-fns` - Date formatting utilities

## 🚀 Next Steps: Set Up Your Ghost Account

### Option 1: Ghost Pro (Recommended - $9/month)

1. **Sign up for Ghost Pro**
   - Go to [ghost.org](https://ghost.org)
   - Click "Get Started"
   - Choose "Starter" plan ($9/month)
   - Pick your subdomain (e.g., `hume-group.ghost.io`)

2. **Get Your API Credentials**
   - Go to your Ghost admin: `https://your-site.ghost.io/ghost/`
   - Navigate to **Settings** → **Integrations**
   - Click **"+ Add custom integration"**
   - Name it "Next.js Website" or similar
   - Copy the **Content API Key** (not Admin API Key)
   - Your URL will be: `https://your-site.ghost.io`

3. **Add Environment Variables**
   - Create a `.env.local` file in your project root
   - Add these variables:
   ```env
   GHOST_API_URL=https://your-site.ghost.io
   GHOST_CONTENT_API_KEY=your_content_api_key_here
   ```

### Option 2: Self-Hosted Ghost (Advanced Users)

If you prefer to self-host Ghost:
1. Follow [Ghost's installation guide](https://ghost.org/docs/install/)
2. Use your server's URL and API key in the environment variables

## 🧪 Testing Your Setup

1. **Add Environment Variables**
   ```bash
   # Copy the example file
   cp ghost.env.example .env.local
   
   # Edit .env.local with your actual Ghost credentials
   ```

2. **Start Your Development Server**
   ```bash
   npm run dev
   ```

3. **Test the Integration**
   - Visit `http://localhost:3000` - Homepage should show blog preview
   - Visit `http://localhost:3000/blog` - Blog listing page
   - Create a test post in Ghost admin to see it appear

## 📝 Creating Content in Ghost

1. **Access Ghost Admin**
   - Go to `https://your-site.ghost.io/ghost/`
   - Log in with your credentials

2. **Create Your First Post**
   - Click **"New Post"**
   - Add a title, content, and featured image
   - Add tags like "Market Updates", "Buyers", "Sellers"
   - Click **"Publish"**

3. **Set Featured Posts**
   - Edit a post and toggle **"Feature this post"**
   - Featured posts will appear on your homepage

## 🎨 Customization Options

### Blog Categories
The blog automatically assigns colors to different tags:
- Market Updates: Blue
- Sellers: Green  
- Buyers: Purple
- Real Estate: Orange
- Tips: Teal

You can modify these in `components/sections/home/blog.tsx` (line 8-23).

### Homepage Blog Section
- Shows latest 3 posts by default
- Automatically handles no-posts state
- Links to full blog page

### SEO Optimization
- Automatic meta titles and descriptions
- Open Graph tags for social sharing
- Structured data for search engines

## 🔧 Advanced Features

### Webhooks (Optional)
Set up webhooks in Ghost to automatically rebuild your site when content changes:
1. Go to Ghost Admin → Settings → Integrations
2. Add webhook URL: `https://your-vercel-deploy-hook-url`
3. Select "Post published" and "Post updated" events

### Custom Styling
All components use Tailwind CSS and match your existing design system. You can customize:
- Colors in the blog cards
- Layout and spacing
- Typography and fonts

## 🐛 Troubleshooting

### Common Issues:

1. **"Posts not showing"**
   - Check your environment variables are correct
   - Verify your Ghost site is accessible
   - Check the browser console for API errors

2. **"Build errors"**
   - Make sure all environment variables are set
   - Check that Ghost API is responding

3. **"Images not loading"**
   - Verify Ghost images are publicly accessible
   - Check Next.js image domains configuration

### Environment Variables
If you're deploying to Vercel/Netlify, add these environment variables to your hosting platform:
- `GHOST_API_URL`
- `GHOST_CONTENT_API_KEY`

## 📚 What's Next?

Your Ghost integration is ready! You can now:

1. ✅ Set up your Ghost Pro account
2. ✅ Add your API credentials to `.env.local`
3. ✅ Create your first blog posts
4. ✅ Test the integration locally
5. ✅ Deploy to production

The integration will automatically:
- Fetch posts from Ghost
- Display them on your homepage and blog page
- Handle individual post pages
- Provide SEO optimization
- Show fallback content when no posts exist

## 🎯 Key Features

- **Real-time content updates** - Changes in Ghost appear immediately
- **SEO optimized** - Meta tags, structured data, and social sharing
- **Responsive design** - Works perfectly on all devices
- **TypeScript support** - Full type safety for Ghost data
- **Error handling** - Graceful fallbacks for missing content
- **Performance optimized** - Static generation with revalidation

Happy blogging! 🚀