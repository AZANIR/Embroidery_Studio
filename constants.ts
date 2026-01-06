
import { BlogPost, PortfolioItem, Service, Product, SiteSettings, PageContent } from './types';

export const INITIAL_SETTINGS: SiteSettings = {
  name: 'Gapta',
  tagline: { uk: 'Мистецтво в кожному стібку', en: 'Artistry in Every Stitch' },
  primaryColor: '#121212',
  accentColor: '#ff6b35',
  logo: 'GAPTA',
  contactEmail: 'info@gapta.ua',
  phone: '+380 (XX) XXX XX XX',
  address: { uk: 'м. Київ, вул. Прикладна, 1', en: '1 Prikladna St, Kyiv' },
  socialLinks: {
    instagram: 'https://instagram.com/gapta',
    facebook: 'https://facebook.com/gapta'
  }
};

export const INITIAL_SECTIONS: PageContent[] = [
  { 
    id: 'hero', 
    title: { uk: 'Ми створюємо унікальну вишивку для вашого бізнесу', en: 'We create unique embroidery for your business' }, 
    subtitle: { uk: 'Професійна вишивка на одязі, аксесуарах та корпоративній продукції. Якість, яку ви заслуговуєте.', en: 'Professional embroidery on clothing, accessories, and corporate products. Quality you deserve.' }, 
    isVisible: true, 
    order: 0 
  },
  { 
    id: 'benefits', 
    title: { uk: 'ГАПТА — ваш надійний партнер у вишивці', en: 'GAPTA — your reliable partner in embroidery' }, 
    subtitle: { uk: 'Ми спеціалізуємося на створенні якісної вишивки для бізнесу та приватних клієнтів', en: 'We specialize in creating high-quality embroidery for businesses and private clients' }, 
    isVisible: true, 
    order: 1 
  },
  { 
    id: 'services', 
    title: { uk: 'Що ми пропонуємо', en: 'What we offer' }, 
    subtitle: { uk: 'Широкий спектр послуг з вишивки для різних потреб', en: 'Wide range of embroidery services for various needs' }, 
    isVisible: true, 
    order: 2 
  },
  { 
    id: 'shop', 
    title: { uk: 'Наш Магазин', en: 'Our Shop' }, 
    subtitle: { uk: 'Готові вироби з унікальною вишивкою, доступні до замовлення вже зараз.', en: 'Ready-made products with unique embroidery, available for order right now.' }, 
    isVisible: true, 
    order: 3 
  },
  { 
    id: 'showcase', 
    title: { uk: 'Портфоліо', en: 'Portfolio' }, 
    subtitle: { uk: 'Приклади наших найкращих робіт', en: 'Examples of our best work' }, 
    isVisible: true, 
    order: 4 
  }
];

export const INITIAL_SERVICES: Service[] = [
  { 
    id: '1', 
    name: { uk: 'Корпоративна вишивка', en: 'Corporate Embroidery' }, 
    description: { uk: 'Логотипи та брендинг на робочому одязі, поло, футболках', en: 'Logos and branding on workwear, polos, t-shirts' }, 
    icon: 'Briefcase', 
    priceRange: 'Custom' 
  },
  { 
    id: '2', 
    name: { uk: 'Вишивка на аксесуарах', en: 'Accessories Embroidery' }, 
    description: { uk: 'Сумки, кепки, рушники та інші аксесуари за вашим дизайном', en: 'Bags, caps, towels and other accessories by your design' }, 
    icon: 'Layers', 
    priceRange: 'Custom' 
  },
  { 
    id: '3', 
    name: { uk: 'Індивідуальний дизайн', en: 'Individual Design' }, 
    description: { uk: 'Створення унікальних дизайнів та їх реалізація у вишивці', en: 'Creation of unique designs and their realization in embroidery' }, 
    icon: 'Clock', 
    priceRange: 'Custom' 
  },
  { 
    id: '4', 
    name: { uk: 'Великі замовлення', en: 'Bulk Orders' }, 
    description: { uk: 'Оптові замовлення для компаній з вигідними умовами', en: 'Bulk orders for companies with favorable terms' }, 
    icon: 'FileText', 
    priceRange: 'Custom' 
  },
  { 
    id: '5', 
    name: { uk: 'Ремонт та реставрація', en: 'Repair & Restoration' }, 
    description: { uk: 'Відновлення старих вишивок та ремонт пошкоджених виробів', en: 'Restoration of old embroideries and repair of damaged items' }, 
    icon: 'PenTool', 
    priceRange: 'Custom' 
  },
  { 
    id: '6', 
    name: { uk: 'Консультації', en: 'Consultations' }, 
    description: { uk: 'Безкоштовні консультації щодо вибору матеріалів та дизайну', en: 'Free consultations on material selection and design' }, 
    icon: 'CheckSquare', 
    priceRange: 'Free' 
  }
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  { 
    id: '1', 
    title: { uk: 'Корпоративний одяг', en: 'Corporate Wear' }, 
    category: { uk: 'Бізнес', en: 'Business' }, 
    image: 'https://images.unsplash.com/photo-1613946069412-38f7f1ff0b65?q=80&w=1000&auto=format&fit=crop', 
    description: { uk: 'Вишивка логотипів на робочому одязі', en: 'Logo embroidery on workwear' } 
  },
  { 
    id: '2', 
    title: { uk: 'Спортивна форма', en: 'Sportswear' }, 
    category: { uk: 'Спорт', en: 'Sport' }, 
    image: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=1000&auto=format&fit=crop', 
    description: { uk: 'Вишивка на спортивному одязі та аксесуарах', en: 'Embroidery on sportswear and accessories' } 
  },
  { 
    id: '3', 
    title: { uk: 'Аксесуари', en: 'Accessories' }, 
    category: { uk: 'Стиль', en: 'Style' }, 
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop', 
    description: { uk: 'Вишивка на сумках, кепках та рушниках', en: 'Embroidery on bags, caps, and towels' } 
  },
  { 
    id: '4', 
    title: { uk: 'Індивідуальні замовлення', en: 'Custom Orders' }, 
    category: { uk: 'Приватні', en: 'Private' }, 
    image: 'https://images.unsplash.com/photo-1528476513691-07e6f563d97f?q=80&w=1000&auto=format&fit=crop', 
    description: { uk: 'Унікальні дизайни для приватних клієнтів', en: 'Unique designs for private clients' } 
  }
];

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: '1',
    title: { uk: 'Тренди вишивки 2024', en: 'Embroidery Trends 2024' },
    slug: 'trends-2024',
    excerpt: { uk: 'Що буде популярним у світі вишивки цього року.', en: 'What will be popular in the world of embroidery this year.' },
    content: { uk: 'Повний текст статті про тренди...', en: 'Full article text about trends...' },
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop',
    date: new Date().toISOString(),
    published: true
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: { uk: 'Вишита худі Premium', en: 'Premium Embroidered Hoodie' },
    price: 1850,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop',
    category: 'Apparel',
    description: { uk: 'Комфортна худі з об’ємною вишивкою на грудях.', en: 'Comfortable hoodie with 3D embroidery on the chest.' }
  },
  {
    id: '2',
    name: { uk: 'Кепка з фірмовим лого', en: 'Signature Logo Cap' },
    price: 650,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop',
    category: 'Accessories',
    description: { uk: 'Стильна кепка з щільною вишивкою.', en: 'Stylish cap with high-density embroidery.' }
  },
  {
    id: '3',
    name: { uk: 'Еко-сумка з орнаментом', en: 'Eco-Tote with Ornament' },
    price: 450,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop',
    category: 'Accessories',
    description: { uk: 'Практична сумка з традиційними мотивами.', en: 'Practical bag with traditional motifs.' }
  }
];
