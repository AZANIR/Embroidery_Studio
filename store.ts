
import { useState, useEffect } from 'react';
import { SiteSettings, PageContent, Service, PortfolioItem, BlogPost, Product, CartItem, Order, Inquiry, Lang } from './types';
import { INITIAL_SETTINGS, INITIAL_SECTIONS, INITIAL_SERVICES, INITIAL_PORTFOLIO, INITIAL_POSTS, INITIAL_PRODUCTS } from './constants';

export const useCMSStore = () => {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('gapta_lang');
    return (saved as Lang) || 'uk';
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('gapta_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [sections, setSections] = useState<PageContent[]>(() => {
    const saved = localStorage.getItem('gapta_sections');
    return saved ? JSON.parse(saved) : INITIAL_SECTIONS;
  });

  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('gapta_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() => {
    const saved = localStorage.getItem('gapta_portfolio');
    return saved ? JSON.parse(saved) : INITIAL_PORTFOLIO;
  });

  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('gapta_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('gapta_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('gapta_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('gapta_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('gapta_inquiries');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('gapta_lang', lang);
    localStorage.setItem('gapta_settings', JSON.stringify(settings));
    localStorage.setItem('gapta_sections', JSON.stringify(sections));
    localStorage.setItem('gapta_services', JSON.stringify(services));
    localStorage.setItem('gapta_portfolio', JSON.stringify(portfolio));
    localStorage.setItem('gapta_posts', JSON.stringify(posts));
    localStorage.setItem('gapta_products', JSON.stringify(products));
    localStorage.setItem('gapta_cart', JSON.stringify(cart));
    localStorage.setItem('gapta_orders', JSON.stringify(orders));
    localStorage.setItem('gapta_inquiries', JSON.stringify(inquiries));
  }, [lang, settings, sections, services, portfolio, posts, products, cart, orders, inquiries]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const addOrder = (orderData: Omit<Order, 'id' | 'date' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      date: new Date().toISOString(),
      status: 'pending'
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const generateDemoData = () => {
    const demoOrder: Order = {
      id: 'ORD-DEMO1',
      date: new Date().toISOString(),
      status: 'pending',
      total: 2500,
      paymentMethod: 'card',
      items: [{ ...INITIAL_PRODUCTS[0], quantity: 1 }, { ...INITIAL_PRODUCTS[1], quantity: 1 }],
      customer: {
        name: 'Олексій Тестовий',
        email: 'test@example.com',
        phone: '+380 99 999 99 99',
        city: 'Київ',
        address: 'Відділення №1'
      }
    };
    setOrders(prev => [demoOrder, ...prev]);
    
    const demoInquiry: Inquiry = {
      id: 'inq-demo',
      date: new Date().toISOString(),
      status: 'new',
      name: 'Марина Дизайнер',
      email: 'marina@design.com',
      service: 'Корпоративна вишивка',
      quantity: 50,
      message: 'Цікавить вишивка логотипу на 50 худі для IT-компанії.'
    };
    setInquiries(prev => [demoInquiry, ...prev]);
  };

  const addInquiry = (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
    const newInquiry: Inquiry = {
      ...inquiry,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      status: 'new'
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  const t = (obj: any) => obj?.[lang] || obj?.en || '';

  return {
    lang, setLang,
    settings, setSettings,
    sections, setSections,
    services, setServices,
    portfolio, setPortfolio,
    posts, setPosts,
    products, setProducts,
    cart, addToCart, removeFromCart, updateCartQuantity, clearCart,
    orders, setOrders, addOrder,
    inquiries, setInquiries,
    addInquiry,
    generateDemoData,
    t
  };
};
