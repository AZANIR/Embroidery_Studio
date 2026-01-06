
import React from 'react';
import { useCMS } from '../App';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Scissors, PenTool, Truck, Star, Briefcase, Layers, Clock, FileText, CheckSquare, Phone, Mail, MapPin, X, ShoppingCart, Heart, Check } from 'lucide-react';

const Home = () => {
  const { lang, sections, services, portfolio, products, cart, addToCart, t } = useCMS();
  const navigate = useNavigate();

  // Sort sections by order
  const sortedSections = [...sections]
    .filter(s => s.isVisible)
    .sort((a, b) => a.order - b.order);

  const renderSection = (section: any) => {
    switch (section.id) {
      case 'hero':
        return (
          <section key={section.id} className="relative h-[90vh] flex items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=2070&auto=format&fit=crop"
                alt="Embroidery Work"
                className="w-full h-full object-cover brightness-50"
              />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
              <h1 className="text-5xl md:text-8xl font-extrabold leading-tight mb-8 tracking-tighter">
                {t(section.title)}
              </h1>
              <p className="text-xl md:text-2xl text-slate-200 mb-12 max-w-2xl font-light leading-relaxed">
                {t(section.subtitle)}
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link
                  to="/shop"
                  className="px-10 py-5 bg-[#ff6b35] text-white rounded-full font-bold text-lg flex items-center justify-center hover:opacity-90 transition-all shadow-xl shadow-[#ff6b35]/20"
                >
                  {lang === 'uk' ? 'До магазину' : 'Go to Shop'}
                  <ArrowRight className="ml-3" />
                </Link>
                <Link
                  to="/contact"
                  className="px-10 py-5 border-2 border-white text-white rounded-full font-bold text-lg flex items-center justify-center hover:bg-white hover:text-[#121212] transition-all"
                >
                  {lang === 'uk' ? 'Замовити вишивку' : 'Custom Request'}
                </Link>
              </div>
            </div>
          </section>
        );

      case 'shop':
        return (
          <section key={section.id} className="py-24 bg-[#f4f1ea]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div className="max-w-2xl">
                  <span className="text-[#ff6b35] font-bold uppercase tracking-widest text-xs mb-4 block">
                    {lang === 'uk' ? 'Готові вироби' : 'Ready to Wear'}
                  </span>
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[#121212] leading-tight">{t(section.title)}</h2>
                </div>
                <Link to="/shop" className="group px-8 py-4 border-2 border-[#121212] rounded-full font-bold hover:bg-[#121212] hover:text-white transition-all whitespace-nowrap flex items-center gap-3">
                  {lang === 'uk' ? 'Весь каталог' : 'Full Catalog'}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {products.slice(0, 3).map((product) => {
                  const inCart = cart.some(item => item.id === product.id);
                  return (
                    <div key={product.id} className="group flex flex-col">
                      <div className="aspect-square bg-[#e7e3da] rounded-[40px] overflow-hidden mb-6 relative flex items-center justify-center shadow-sm hover:shadow-xl transition-all duration-500">
                        {product.image ? (
                          <img 
                            src={product.image} 
                            alt={t(product.name)} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <Scissors className="text-[#888]/20" size={80} />
                        )}
                        <div className="absolute inset-0 bg-[#121212]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                          <button 
                            onClick={() => addToCart(product)}
                            className={`h-12 px-6 rounded-full font-bold text-sm flex items-center gap-2 shadow-xl transition-all ${
                              inCart ? 'bg-green-500 text-white' : 'bg-white text-[#121212] hover:bg-[#ff6b35] hover:text-white'
                            }`}
                          >
                            {inCart ? <Check size={16} /> : <ShoppingCart size={16} />}
                            {inCart ? (lang === 'uk' ? 'У кошику' : 'In Cart') : (lang === 'uk' ? 'До кошика' : 'Add to Cart')}
                          </button>
                        </div>
                      </div>
                      <div className="px-2">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff6b35]">{product.category}</span>
                          <span className="text-xl font-bold text-[#121212]">{product.price} грн</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-[#121212] tracking-tight">{t(product.name)}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );

      case 'showcase':
        return (
          <section key={section.id} className="py-24 bg-[#121212] text-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <span className="text-[#ff6b35] font-bold uppercase tracking-widest text-xs mb-4 block">
                   {lang === 'uk' ? 'Наші роботи' : 'Our Work'}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">{t(section.title)}</h2>
                <p className="text-white/60 text-lg max-w-2xl mx-auto font-light">{t(section.subtitle)}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {portfolio.map((item, idx) => (
                  <div key={item.id} className="group relative overflow-hidden rounded-[32px] aspect-[4/5] bg-white/5">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={t(item.title)} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center opacity-10">
                         <Scissors size={80} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff6b35] mb-2">{t(item.category)}</span>
                      <h3 className="text-2xl font-bold tracking-tight">{t(item.title)}</h3>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-16 text-center">
                <Link to="/portfolio" className="inline-flex items-center font-bold text-sm uppercase tracking-widest text-white border-b-2 border-[#ff6b35] pb-2 hover:text-[#ff6b35] transition-colors">
                  {lang === 'uk' ? 'Дивитись повне портфоліо' : 'View Full Portfolio'}
                  <ArrowRight className="ml-3" size={16} />
                </Link>
              </div>
            </div>
          </section>
        );

      case 'services':
        return (
          <section key={section.id} className="py-24 bg-[#e7e3da]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-[#121212] leading-tight">{t(section.title)}</h2>
                <p className="text-[#555] text-lg max-w-2xl mx-auto font-light">{t(section.subtitle)}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service) => (
                  <div key={service.id} className="bg-[#f4f1ea] p-10 rounded-[40px] shadow-sm hover:shadow-xl transition-all group border border-white/20 flex flex-col h-full">
                    <div className="w-16 h-16 bg-[#ff6b35] text-white rounded-2xl flex items-center justify-center mb-8">
                       {service.icon === 'Briefcase' && <Briefcase size={32} />}
                       {service.icon === 'Layers' && <Layers size={32} />}
                       {service.icon === 'Clock' && <Clock size={32} />}
                       {service.icon === 'FileText' && <FileText size={32} />}
                       {service.icon === 'PenTool' && <PenTool size={32} />}
                       {service.icon === 'CheckSquare' && <CheckSquare size={32} />}
                       {!['Briefcase', 'Layers', 'Clock', 'FileText', 'PenTool', 'CheckSquare'].includes(service.icon) && <Scissors size={32} />}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-[#121212] tracking-tight">{t(service.name)}</h3>
                    <p className="text-[#555] mb-8 text-base leading-relaxed flex-grow">{t(service.description)}</p>
                    <div className="pt-6 border-t border-[#e7e3da] flex items-center justify-between">
                       <span className="text-[10px] font-bold text-[#888] uppercase tracking-widest">{lang === 'uk' ? 'ВІД' : 'STARTS'}</span>
                       <span className="text-lg font-bold text-[#121212]">{service.priceRange}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'benefits':
        return (
          <section key={section.id} className="py-24 bg-[#f4f1ea]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="relative">
                  <div className="aspect-[4/5] rounded-[48px] bg-[#e7e3da] overflow-hidden shadow-2xl relative z-10">
                     <img 
                      src="https://images.unsplash.com/photo-1528476513691-07e6f563d97f?q=80&w=1000&auto=format&fit=crop" 
                      alt="Artisan at work" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#ff6b35] rounded-full opacity-10 filter blur-3xl"></div>
                </div>
                <div className="space-y-10">
                  <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-[#121212] leading-tight">{t(section.title)}</h2>
                  <p className="text-[#555] text-lg font-light leading-relaxed">{t(section.subtitle)}</p>
                  <div className="space-y-8">
                    {[
                      { uk: 'Індивідуальний підхід', en: 'Precision Craft', desc: { uk: 'Кожен дизайн оцифровується вручну для ідеального результату.', en: 'Every design is hand-digitized for perfect stitch density.' } },
                      { uk: 'Преміальні матеріали', en: 'Elite Materials', desc: { uk: 'Ми використовуємо нитки світового рівня Gunold та Madeira.', en: 'We source world-class threads from Gunold and Madeira.' } },
                      { uk: 'Японська точність', en: 'Japanese Tech', desc: { uk: 'Використовуємо обладнання Tajima для максимальної деталізації.', en: 'Using Tajima machinery to ensure sub-millimeter precision.' } },
                    ].map((step, idx) => (
                      <div key={idx} className="flex gap-6 group">
                        <div className="shrink-0 w-12 h-12 bg-white border border-[#e7e3da] rounded-2xl flex items-center justify-center font-bold text-xl text-[#121212] group-hover:bg-[#ff6b35] group-hover:text-white transition-all shadow-sm">
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-1 text-[#121212] tracking-tight">{lang === 'uk' ? step.uk : step.en}</h4>
                          <p className="text-[#888] text-sm leading-relaxed">{t(step.desc)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case 'testimonials':
        return (
          <section key={section.id} className="py-24 bg-[#121212] text-white">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-4xl md:text-5xl font-bold mb-16 tracking-tight text-center">{t(section.title)}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { name: 'Олександр К.', role: 'Fashion Designer', quote: 'Gapta втілили мої найсміливіші ідеї в життя. 3D вишивка просто неперевершена.' },
                  { name: 'Оксана П.', role: 'Studio Founder', quote: 'Найкраща якість підбору кольорів та щільності ниток, яку я зустрічала в Україні.' },
                  { name: 'Марк Р.', role: 'Brand Owner', quote: 'Швидкість виконання та увага до деталей роблять їх нашими постійними партнерами.' }
                ].map((testimonial, idx) => (
                  <div key={idx} className="bg-white/5 p-10 rounded-[40px] border border-white/10 flex flex-col h-full">
                    <div className="flex gap-1 text-[#ff6b35] mb-6">
                       {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={16} />)}
                    </div>
                    <p className="text-lg italic font-light mb-8 text-slate-200 leading-relaxed flex-grow">"{testimonial.quote}"</p>
                    <div>
                      <h4 className="font-bold text-lg tracking-tight">{testimonial.name}</h4>
                      <p className="text-[10px] text-[#ff6b35] uppercase font-bold tracking-widest mt-1">{testimonial.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="animate-in fade-in duration-700 bg-[#f4f1ea]">
      {sortedSections.map(renderSection)}
      
      {/* Elegant CTA Section */}
      <section className="py-32 bg-[#f4f1ea]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-[#121212] rounded-[60px] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter text-white leading-tight">
                {lang === 'uk' ? 'Створимо щось унікальне?' : 'Let’s Create Your Masterpiece'}
              </h2>
              <p className="text-lg text-white/60 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                {lang === 'uk' 
                  ? 'Від ідеї до втілення — ми допоможемо вашому бренду засяяти за допомогою преміальної вишивки.' 
                  : 'From initial sketch to the final stitch, we help your brand stand out with the highest quality embroidery available.'}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link to="/contact" className="px-10 py-5 bg-[#ff6b35] text-white rounded-full font-bold text-lg hover:opacity-90 transition-all shadow-xl shadow-[#ff6b35]/20">
                  {lang === 'uk' ? 'Замовити прорахунок' : 'Request a Quote'}
                </Link>
                <Link to="/shop" className="px-10 py-5 border-2 border-white/20 text-white rounded-full font-bold text-lg hover:bg-white hover:text-[#121212] transition-all">
                  {lang === 'uk' ? 'Наш магазин' : 'Shop Ready-to-Wear'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
