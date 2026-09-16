export type PageView =
  | 'home'
  | 'collections'
  | 'product-detail'
  | 'about'
  | 'journal'
  | 'privacy'
  | 'terms';

export type AmazonRegion = 'US' | 'EU';

export interface AmazonLinks {
  US: string;
  EU: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'seller';
  text: string;
  timestamp: string;
}

export interface SupportTicket {
  id: string;
  email: string;
  amazonOrderId: string;
  createdAt: string;
  status: 'open' | 'replied' | 'resolved';
  messages: ChatMessage[];
  unreadBySeller?: boolean;
  unreadByUser?: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verifiedAmazonPurchase: boolean;
  region: AmazonRegion;
}

export interface ProductMedia {
  type: 'image' | 'video';
  url: string;
  alt: string;
  caption?: string;
  isCustomUploaded?: boolean;
}

export interface DetailImageItem {
  url: string;
  caption?: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  series: string;
  tagline: string;
  category: 'cutters' | 'lighters' | 'sets' | 'accessories';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isFeatured?: boolean;
  badge?: string;
  description: string;
  overview: string;
  detailImages?: (string | DetailImageItem)[];
  keyFeatures: string[];
  materials: {
    name: string;
    description: string;
  }[];
  craftsmanshipNotes: string;
  specifications: Record<string, string>;
  packageContents: string[];
  media: ProductMedia[];
  amazonLinks: AmazonLinks;
  reviews: Review[];
}

export interface CategoryItem {
  id: string;
  key: 'cutters' | 'lighters' | 'sets' | 'accessories';
  title: string;
  subtitle: string;
  description: string;
  image: string;
  featuredProductCount: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime?: string;
  date?: string;
  author?: string;
  authorTitle?: string;
  coverImage: string;
  summary: string;
  content: {
    heading?: string;
    subheading?: string;
    paragraph?: string;
    quote?: string;
    bulletPoints?: string[];
    image?: string;
    imageAlt?: string;
  }[];
  relatedProductId?: string;
}

export interface CraftsmanshipProcess {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  technicalDetails: string[];
  image: string;
  badge: string;
}

export interface MaterialInfo {
  name: string;
  grade: string;
  properties: string;
  usedIn: string;
  description: string;
  image: string;
}
