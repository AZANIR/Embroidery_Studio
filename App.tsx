
import React, { createContext, useContext, useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Globe, Trash2, Plus, Minus, ArrowRight, Lock } from 'lucide-react';
import { useCMSStore } from './store';
import Home from './pages/Home';
import About from './pages/About';
import ServicesPage from './pages/Services';
import PortfolioPage from './pages/Portfolio';
import BlogPage from './pages/Blog';
import ShopPage from './pages/Shop';
import ContactPage from './pages/Contact';
import CheckoutPage from './pages/Checkout';
import AdminDashboard from './pages/Admin';

const CMSContext = createContext<ReturnType<typeof useCMSStore> | null>(null);
export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) throw new Error("useCMS must be used within CMSProvider");
  return context;
};

const CartDrawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { cart, removeFromCart, updateCartQuantity, lang, t } = useCMS();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="absolute top-0 right-0 h-full w-full max-w-md bg-[#f4f1ea] shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col">
        <div className="p-6 border-b border-[#e7e3da] flex justify-between items-center bg-white/50">
          <h2 className="text-2xl font-bold tracking-tight">{lang === 'uk' ? 'Кошик' : 'Shopping Cart'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-[#e7e3da] rounded-full transition-colors"><X size={24} /></button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <ShoppingCart size={64} strokeWidth={1} />
              <p className="text-lg">{lang === 'uk' ? 'Кошик порожній' : 'Your cart is empty'}</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 bg-white/50 p-4 rounded-3xl border border-[#e7e3da]">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#e7e3da] flex-shrink-0">
                  <img src={item.image} alt={t(item.name)} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-sm leading-tight mb-1">{t(item.name)}</h3>
                  <p className="text-[#ff6b35] font-bold mb-3">{item.price} грн</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-[#e7e3da] rounded-full px-2 py-1">
                      <button onClick={() => updateCartQuantity(item.id, -1)} className="p-1 hover:text-[#ff6b35]"><Minus size={14} /></button>
                      <span className="w-4 text-center text-xs font-bold">{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.id, 1)} className="p-1 hover:text-[#ff6b35]"><Plus size={14} /></button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-rose-500 hover:text-rose-700 transition-colors"><Trash2 size={18} /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-8 bg-white border-t border-[#e7e3da] space-y-6">
            <div className="flex justify-between items-end">
              <span className="text-sm font-bold uppercase tracking-widest text-[#888]">{lang === 'uk' ? 'Разом' : 'Total'}</span>
              <span className="text-3xl font-bold text-[#121212]">{total} грн</span>
            </div>
            <Link 
              to="/checkout" 
              onClick={onClose}
              className="w-full bg-[#ff6b35] text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-[#ff6b35]/20"
            >
              {lang === 'uk' ? 'Оформити замовлення' : 'Checkout Now'}
              <ArrowRight size={20} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const Header = () => {
  const { settings, lang, setLang, cart } = useCMS();
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();

  if (location.pathname.startsWith('/admin')) return null;

  const navLinks = [
    { name: { uk: 'Головна', en: 'Home' }, path: '/' },
    { name: { uk: 'Про нас', en: 'About' }, path: '/about' },
    { name: { uk: 'Послуги', en: 'Services' }, path: '/services' },
    { name: { uk: 'Портфоліо', en: 'Portfolio' }, path: '/portfolio' },
    { name: { uk: 'Магазин', en: 'Shop' }, path: '/shop' },
    { name: { uk: 'Контакти', en: 'Contact' }, path: '/contact' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#f4f1ea]/80 backdrop-blur-md border-b border-[#e7e3da]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <Link to="/" className="text-2xl font-black tracking-tighter text-[#121212]">
            {settings.name.toUpperCase()}
          </Link>

          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs font-bold uppercase tracking-widest transition-colors hover:text-[#ff6b35] ${location.pathname === link.path ? 'text-[#ff6b35]' : 'text-[#555]'}`}
              >
                {link.name[lang]}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setLang(lang === 'uk' ? 'en' : 'uk')}
              className="hidden md:flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[#555] bg-[#e7e3da] px-3 py-1.5 rounded-full hover:bg-[#d9d5cd]"
            >
              <Globe size={12} />
              {lang === 'uk' ? 'EN' : 'UK'}
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 bg-[#121212] text-white rounded-full hover:scale-105 transition-transform"
            >
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ff6b35] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#f4f1ea]">
                  {cart.length}
                </span>
              )}
            </button>
            <button className="md:hidden p-3 bg-[#e7e3da] text-[#121212] rounded-full" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-[#f4f1ea] border-b border-[#e7e3da] py-8 px-6 space-y-6 animate-in slide-in-from-top duration-300">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block text-3xl font-black text-[#121212] tracking-tighter"
                onClick={() => setIsOpen(false)}
              >
                {link.name[lang]}
              </Link>
            ))}
            <button 
              onClick={() => { setLang(lang === 'uk' ? 'en' : 'uk'); setIsOpen(false); }}
              className="block text-lg font-bold text-[#ff6b35]"
            >
              {lang === 'uk' ? 'Switch to English' : 'Перейти на Українську'}
            </button>
          </div>
        )}
      </header>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

const Footer = () => {
  const { settings, lang } = useCMS();
  const location = useLocation();

  if (location.pathname.startsWith('/admin')) return null;

  return (
    <footer className="bg-[#f4f1ea] border-t border-[#e7e3da] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-3xl font-black text-[#121212] tracking-tighter">{settings.name.toUpperCase()}</h2>
            <p className="text-[#555] max-w-sm leading-relaxed">{lang === 'uk' ? 'Студія преміальної вишивки з індивідуальним підходом до кожного стібка.' : 'Premium embroidery studio with an individual approach to every stitch.'}</p>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#121212] mb-6">{lang === 'uk' ? 'Навігація' : 'Links'}</h4>
            <div className="flex flex-col space-y-4 text-sm font-bold text-[#555]">
              <Link to="/" className="hover:text-[#ff6b35]">Home</Link>
              <Link to="/services" className="hover:text-[#ff6b35]">Services</Link>
              <Link to="/portfolio" className="hover:text-[#ff6b35]">Portfolio</Link>
              <Link to="/shop" className="hover:text-[#ff6b35]">Shop</Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#121212] mb-6">{lang === 'uk' ? 'Контакти' : 'Contact'}</h4>
            <div className="flex flex-col space-y-4 text-sm font-bold text-[#555]">
              <span>{settings.phone}</span>
              <span>{settings.contactEmail}</span>
            </div>
          </div>
        </div>
        <div className="border-t border-[#e7e3da] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[10px] text-[#888] font-black uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} {settings.name}. Artistry in every stitch.
          </div>
          <Link to="/admin" className="flex items-center gap-2 text-[10px] text-[#888] hover:text-[#ff6b35] transition-colors font-black uppercase tracking-widest">
            <Lock size={10} />
            Admin Panel
          </Link>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  const store = useCMSStore();

  return (
    <CMSContext.Provider value={store}>
      <Router>
        <Header />
        <main className="min-h-screen bg-[#f4f1ea] pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </CMSContext.Provider>
  );
};

export default App;
