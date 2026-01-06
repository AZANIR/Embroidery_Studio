
export type SectionId = 'hero' | 'showcase' | 'services' | 'benefits' | 'process' | 'testimonials' | 'faq' | 'cta' | 'shop';
export type Lang = 'uk' | 'en';

export interface MultiLangString {
  uk: string;
  en: string;
}

export interface SiteSettings {
  name: string;
  tagline: MultiLangString;
  primaryColor: string;
  accentColor: string;
  logo: string;
  contactEmail: string;
  phone: string;
  address: MultiLangString;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    pinterest?: string;
  };
}

export interface PageContent {
  id: SectionId;
  title: MultiLangString;
  subtitle?: MultiLangString;
  content?: MultiLangString;
  isVisible: boolean;
  order: number;
}

export interface BlogPost {
  id: string;
  title: MultiLangString;
  slug: string;
  excerpt: MultiLangString;
  content: MultiLangString;
  image: string;
  date: string;
  published: boolean;
}

export interface PortfolioItem {
  id: string;
  title: MultiLangString;
  category: MultiLangString;
  image: string;
  description: MultiLangString;
}

export interface Service {
  id: string;
  name: MultiLangString;
  description: MultiLangString;
  icon: string;
  priceRange: string;
}

export interface Product {
  id: string;
  name: MultiLangString;
  price: number;
  image: string;
  category: string;
  description: MultiLangString;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customer: {
    name: string;
    phone: string;
    email: string;
    city: string;
    address: string;
  };
  paymentMethod: 'card' | 'cod';
  status: 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled';
  date: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  service: string;
  quantity: number;
  message: string;
  date: string;
  status: 'new' | 'processing' | 'completed';
}
