"use client";

interface YouTubeEmbedProps {
  videoUrl: string;
  title?: string;
  className?: string;
}

export function YouTubeEmbed({ videoUrl, title = "YouTube video", className = "" }: YouTubeEmbedProps) {
  // Extract video ID from various YouTube URL formats
  const getVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return match[1];
      }
    }
    return null;
  };

  const videoId = getVideoId(videoUrl);

  if (!videoId) {
    return (
      <div className={`bg-muted flex items-center justify-center rounded-lg ${className}`}>
        <p className="text-muted-foreground">Invalid YouTube URL</p>
      </div>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;

  return (
    <div className={`relative ${className}`}>
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full rounded-lg"
        loading="lazy"
      />
    </div>
  );
}
