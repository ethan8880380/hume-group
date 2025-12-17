export interface NeighborhoodSection {
  title: string;
  content: string;
  image?: string;
  youtubeUrl?: string;
  imagePosition?: "left" | "right";
  icon?: string;
}

export interface NeighborhoodData {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  heroImage: string;
  heroYoutubeUrl?: string;
  sections: NeighborhoodSection[];
  stats?: {
    label: string;
    value: string;
  }[];
  highlights?: string[];
}

export const neighborhoodsData: NeighborhoodData[] = [
  {
    slug: "hilltop-downtown",
    name: "Hilltop/Downtown",
    shortDescription: "Urban living at its finest with cultural attractions and vibrant entertainment",
    description: "Hilltop and Downtown Tacoma represent the heart of the city's ongoing transformation. From the bustling waterfront to the vibrant arts scene, this area combines urban convenience with cultural richness. Experience world-class museums, diverse dining, and lively entertainment just steps from your door.",
    heroImage: "/images/neighborhoods/1.png",
    stats: [
      { label: "Median Home Price", value: "$450K" },
      { label: "Walk Score", value: "92/100" },
      { label: "Average Days on Market", value: "15 days" },
    ],
    highlights: [
      "Museum of Glass and LeMay Museum",
      "Tacoma Dome entertainment venue",
      "Waterfront restaurants and shops",
      "Light rail connectivity",
      "Stadium High School district",
    ],
    sections: [
      {
        title: "Culture & Entertainment at Your Doorstep",
        content: "From the Museum of Glass to live performances at Tacoma Dome, Downtown offers endless entertainment options. Enjoy waterfront dining, boutique shopping, and a thriving nightlife scene that brings the city to life.",
        image: "/images/neighborhoods/hilltop/hilltop-3.png",
        imagePosition: "right",
      },
      {
        title: "Urban Living with Scenic Views",
        content: "Downtown condos and Hilltop homes offer stunning views of Commencement Bay and Mount Rainier. Many properties feature modern amenities, walkability to work and play, and the convenience of city living without sacrificing natural beauty.",
        image: "/images/neighborhoods/hilltop/hilltop-2.png",
        imagePosition: "left",
      },
      {
        title: "Walkable, Connected & Commuter-Friendly",
        content: "With access to light rail, major highways, and bike lanes, getting around is a breeze. Walk to work, restaurants, and entertainment—or hop on transit to explore the greater Puget Sound region.",
        image: "/images/neighborhoods/hilltop/hilltop-1.png",
        imagePosition: "right",
      },
    ],
  },
  {
    slug: "west-end-tacoma",
    name: "West End Tacoma",
    shortDescription: "Peaceful residential charm with parks and family-friendly atmosphere",
    description: "West End Tacoma offers quiet, tree-lined streets and a strong sense of community. This family-friendly neighborhood features excellent schools, beautiful parks, and easy access to Point Defiance. It's the perfect blend of suburban tranquility and urban proximity.",
    heroImage: "/images/neighborhoods/2.png",
    stats: [
      { label: "Median Home Price", value: "$525K" },
      { label: "Walk Score", value: "65/100" },
      { label: "Average Days on Market", value: "18 days" },
    ],
    highlights: [
      "Point Defiance Park & Zoo",
      "Highly-rated schools",
      "Family-friendly neighborhoods",
      "Waterfront views",
      "Safe, quiet streets",
    ],
    sections: [
      {
        title: "Point Defiance Park & Zoo",
        content: "Living in West End means having Point Defiance Park as your backyard. With 760 acres of old-growth forest, beaches, hiking trails, and the renowned Point Defiance Zoo & Aquarium, outdoor recreation is always within reach.",
        image: "/images/neighborhoods/west/point.jpg",
        imagePosition: "right",
      },
      {
        title: "Excellent Schools & Family Environment",
        content: "West End is home to some of Tacoma's best schools, making it a top choice for families. The neighborhood's safe streets, parks, and community events create an ideal environment for raising children.",
        image: "/images/neighborhoods/west/br.jpg",
        imagePosition: "left",
      },
    ],
  },
  {
    slug: "university-place-fircrest",
    name: "University Place / Fircrest",
    shortDescription: "Suburban comfort with excellent schools and shopping conveniences",
    description: "University Place and Fircrest offer the best of suburban living with tree-lined streets, excellent schools, and abundant shopping. These neighboring communities provide a peaceful, family-oriented lifestyle while maintaining easy access to Tacoma's urban amenities.",
    heroImage: "/images/neighborhoods/up/golf.jpg",
    stats: [
      { label: "Median Home Price", value: "$575K" },
      { label: "Walk Score", value: "52/100" },
      { label: "Average Days on Market", value: "20 days" },
    ],
    highlights: [
      "Top-rated schools",
      "Chambers Bay Golf Course",
      "Shopping centers nearby",
      "Quiet residential streets",
      "Parks and recreation",
    ],
    sections: [
      {
        title: "Top Schools & Safe Communities",
        content: "University Place boasts some of Pierce County's highest-rated schools, making it a magnet for families seeking quality education. The area's well maintained neighborhoods add to its appeal.",
        image: "/images/neighborhoods/up/park.jpg",
        imagePosition: "right",
      },
      {
        title: "Shopping & Dining Convenience",
        content: "From Green Firs Village to the University Place Town Center, residents enjoy easy access to shopping, dining, and entertainment. Everything you need is just minutes away.",
        image: "/images/neighborhoods/up/train.jpg",
        imagePosition: "left",
      },
    ],
  },
  {
    slug: "6th-ave-district",
    name: "6th Ave District",
    shortDescription: "Historic charm meets modern urban lifestyle with local shops and cafes",
    description: "The 6th Avenue District blends historic architecture with a modern, walkable urban lifestyle. Known for its local shops, cafes, and restaurants, this neighborhood offers a unique character that attracts young professionals and families alike.",
    heroImage: "/images/neighborhoods/4.png",
    stats: [
      { label: "Median Home Price", value: "$485K" },
      { label: "Walk Score", value: "78/100" },
      { label: "Average Days on Market", value: "14 days" },
    ],
    highlights: [
      "Historic Craftsman homes",
      "Local boutiques and cafes",
      "Walkable neighborhood",
      "Strong community vibe",
      "Near Metro Parks",
    ],
    sections: [
      {
        title: "Historic Charm & Character",
        content: "6th Avenue is lined with beautifully preserved Craftsman and Victorian homes, offering timeless architectural beauty. The neighborhood's tree-canopied streets create a picturesque setting for urban living.",
        image: "/images/neighborhoods/6th/aly.jpg",
        imagePosition: "right",
      },
      {
        title: "Local Shops, Cafes & Restaurants",
        content: "The 6th Avenue business district is a hub of local activity, featuring independent coffee shops, restaurants, boutiques, and services. It's a walkable neighborhood where you can support local businesses daily.",
        image: "/images/neighborhoods/6th/ff.jpg",
        imagePosition: "left",
      },
    ],
  },
  {
    slug: "ups-tacoma-north-slope",
    name: "UPS Tacoma / North Slope",
    shortDescription: "Academic community with historic homes and tree-lined streets",
    description: "The North Slope neighborhood surrounding the University of Puget Sound is one of Tacoma's most desirable areas. Featuring stately historic homes, mature trees, and a strong sense of community, this neighborhood combines academic culture with residential tranquility.",
    heroImage: "/images/neighborhoods/5.png",
    heroYoutubeUrl: "https://www.youtube.com/watch?v=IIa2GAEDxtc",
    stats: [
      { label: "Median Home Price", value: "$650K" },
      { label: "Walk Score", value: "72/100" },
      { label: "Average Days on Market", value: "16 days" },
    ],
    highlights: [
      "University of Puget Sound",
      "Historic architecture",
      "Tree-lined streets",
      "Near Proctor District",
      "Strong community events",
    ],
    sections: [
      {
        title: "Prestigious Academic Atmosphere",
        content: "Living near the University of Puget Sound means access to cultural events, lectures, and athletic facilities. The academic atmosphere enriches the community and creates a vibrant, intellectually engaging environment.",
        image: "/images/neighborhoods/ups/ups.jpg",
        imagePosition: "right",
      },
      {
        title: "Historic Homes with Modern Updates",
        content: "North Slope features some of Tacoma's most beautiful historic homes, many lovingly restored with modern amenities. The neighborhood's architectural diversity—from Tudor to Craftsman—adds to its unique character. Architectural guidelines and requirements ensure the preservation of this area's vintage charm.",
        image: "/images/neighborhoods/ups/oh.jpg",
        imagePosition: "left",
      },
    ],
  },
  {
    slug: "proctor-district",
    name: "Proctor District",
    shortDescription: "Village atmosphere with walkable shops, farmers market, and community spirit",
    description: "The Proctor District is a beloved neighborhood known for its village-like atmosphere. With a weekly farmers market, local shops, and restaurants all within walking distance, Proctor offers small-town charm within the city. Tree-lined streets and friendly neighbors make this one of Tacoma's most sought-after areas.",
    heroImage: "/images/neighborhoods/6.png",
    heroYoutubeUrl: "https://www.youtube.com/watch?v=TZacXmvPrC8",
    stats: [
      { label: "Median Home Price", value: "$625K" },
      { label: "Walk Score", value: "82/100" },
      { label: "Average Days on Market", value: "12 days" },
    ],
    highlights: [
      "Proctor Farmers Market",
      "Walkable business district",
      "Community events year-round",
      "Parks and green spaces",
      "Historic homes",
    ],
    sections: [
      {
        title: "Walkable Village Atmosphere",
        content: "Proctor's compact business district features local shops, restaurants, a movie theater, and essential services—all within a pleasant walk from home. The Saturday farmers market is a neighborhood tradition that brings the community together.",
        image: "/images/neighborhoods/pr/gs.jpg",
        imagePosition: "right",
      },
      {
        title: "Strong Community Connection",
        content: "Proctor residents take pride in their neighborhood, organizing events, supporting local businesses, and maintaining beautiful streets and parks. It's a place where neighbors know each other by name.",
        image: "/images/neighborhoods/pr/pr.webp",
        imagePosition: "left",
      },
    ],
  },
  {
    slug: "old-town-tacoma-to-ruston",
    name: "Old Town Tacoma to Ruston",
    shortDescription: "Waterfront living with industrial charm and stunning bay views",
    description: "Old Town and Ruston offer unique waterfront living along Commencement Bay. These neighborhoods blend industrial history with modern development, featuring scenic parks, waterfront trails, and stunning views of the Cascade Mountains and Puget Sound.",
    heroImage: "/images/neighborhoods/7.png",
    stats: [
      { label: "Median Home Price", value: "$550K" },
      { label: "Walk Score", value: "68/100" },
      { label: "Average Days on Market", value: "17 days" },
    ],
    highlights: [
      "Waterfront trails and parks",
      "Point Defiance proximity",
      "Bay and mountain views",
      "Historic character",
      "Ruston Way restaurants",
    ],
    sections: [
      {
        title: "Waterfront Living & Scenic Views",
        content: "Wake up to views of Commencement Bay, majestic mountains, and stunning sunsets. The Ruston Way waterfront trail offers miles of scenic walking and biking with beach access and parks along the way.",
        image: "/images/neighborhoods/ot/sv.jpg",
        imagePosition: "right",
      },
      {
        title: "Historic Character Meets Modern Life",
        content: "Old Town's industrial past is preserved in its architecture and character, while new development brings modern amenities. The area's unique blend of old and new creates a distinctive neighborhood personality.",
        image: "/images/neighborhoods/ot/mk.png",
        imagePosition: "left",
      },
    ],
  },
  {
    slug: "stadium-district",
    name: "Stadium District",
    shortDescription: "Historic elegance with iconic Stadium High School and urban walkability",
    description: "The Stadium District is one of Tacoma's most iconic and historic neighborhoods. Known for the stunning Stadium High School and its beautiful historic homes, this area offers urban walkability, cultural attractions, and panoramic views. It's where Tacoma's history meets contemporary urban living.",
    heroImage: "/images/neighborhoods/st/th.jpg",
    stats: [
      { label: "Median Home Price", value: "$595K" },
      { label: "Walk Score", value: "88/100" },
      { label: "Average Days on Market", value: "13 days" },
    ],
    highlights: [
      "Stadium High School",
      "Wright Park and conservatory",
      "Historic architecture",
      "Downtown proximity",
      "Walkable urban lifestyle",
    ],
    sections: [
      {
        title: "Iconic Architecture & History",
        content: "Stadium High School, featured in the movie '10 Things I Hate About You,' is just one of the neighborhood's architectural treasures. The area is filled with grand historic homes, many meticulously restored, showcasing Tacoma's architectural heritage.",
        image: "/images/neighborhoods/st/hs.jpg",
        imagePosition: "right",
      },
      {
        title: "Urban Walkability & Green Spaces",
        content: "Wright Park's 27 acres provide a green oasis in the heart of the neighborhood. The Seymour Botanical Conservatory, playgrounds, and walking paths make it a community gathering place. Everything from coffee shops to downtown offices is within walking distance.",
        image: "/images/neighborhoods/st/prk.jpg",
        imagePosition: "left",
      },
    ],
  },
];

export function getNeighborhoodBySlug(slug: string): NeighborhoodData | undefined {
  return neighborhoodsData.find((n) => n.slug === slug);
}

export function getAllNeighborhoodSlugs(): string[] {
  return neighborhoodsData.map((n) => n.slug);
}

export function getRelatedNeighborhoods(currentSlug: string, count: number = 3): NeighborhoodData[] {
  return neighborhoodsData
    .filter((n) => n.slug !== currentSlug)
    .slice(0, count);
}

