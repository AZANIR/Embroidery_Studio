
import React from 'react';
import { useCMS } from '../App';
import { Link } from 'react-router-dom';
import { ArrowRight, Scissors, ShieldCheck } from 'lucide-react';

const Services = () => {
  const { lang, services, t } = useCMS();

  return (
    <div className="animate-in fade-in duration-500 bg-[#f4f1ea]">
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-[#121212]">
              {lang === 'uk' ? 'Послуги Студії' : 'Studio Services'}
            </h1>
            <p className="text-[#888] text-xl max-w-2xl mx-auto">
              {lang === 'uk' ? 'Професійна вишивка для будь-яких цілей. Від одиничних замовлень до корпоративних тиражів.' : 'Precision-engineered embroidery for every application.'}
            </p>
          </div>

          <div className="space-y-24">
            {services.map((service, idx) => (
              <div key={service.id} className={`flex flex-col lg:flex-row gap-16 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="w-full lg:w-1/2">
                  <div className="aspect-video rounded-[40px] overflow-hidden shadow-2xl bg-[#e7e3da] flex items-center justify-center text-[#888]/20">
                    <Scissors size={100} strokeWidth={1} />
                  </div>
                </div>
                <div className="w-full lg:w-1/2">
                   <div className="w-12 h-12 bg-[#ff6b35] text-white rounded-xl flex items-center justify-center mb-8">
                      <Scissors size={24} />
                   </div>
                   <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#121212]">{t(service.name)}</h2>
                   <p className="text-xl text-[#555] mb-8 leading-relaxed">
                     {t(service.description)}
                   </p>
                   <div className="flex items-center gap-8">
                      <Link to="/contact" className="px-8 py-4 bg-[#121212] text-white rounded-full font-bold hover:opacity-90 transition-all">
                        {lang === 'uk' ? 'Замовити' : 'Order Now'}
                      </Link>
                      <span className="text-[#888] font-bold uppercase tracking-widest text-xs">{service.priceRange}</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
