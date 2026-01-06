
import React, { useState } from 'react';
import { useCMS } from '../App';
import { X, Scissors } from 'lucide-react';

const Portfolio = () => {
  const { lang, portfolio, t } = useCMS();
  const [activeFilter, setActiveFilter] = useState('All');
  
  const categories = ['All', ...Array.from(new Set(portfolio.map(p => t(p.category))))];
  const filteredItems = activeFilter === 'All' 
    ? portfolio 
    : portfolio.filter(p => t(p.category) === activeFilter);

  return (
    <div className="py-24 bg-[#f4f1ea] animate-in fade-in duration-500 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-[#121212]">
            {lang === 'uk' ? 'Портфоліо' : 'Our Portfolio'}
          </h1>
          <p className="text-[#888] text-xl max-w-2xl mx-auto">
            {lang === 'uk' 
              ? 'Добірка наших найкращих робіт з вишивки для брендів та приватних клієнтів.' 
              : 'A selection of our finest embroidery work for brands and private clients.'}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${
                activeFilter === cat 
                ? 'bg-[#121212] text-white shadow-xl' 
                : 'bg-[#e7e3da] text-[#888] hover:bg-[#d9d5cd]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredItems.map(item => (
            <div key={item.id} className="group cursor-pointer">
              <div className="aspect-[16/9] rounded-[40px] overflow-hidden mb-6 relative bg-[#e7e3da] flex items-center justify-center">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={t(item.title)} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-[#d9d5cd] flex items-center justify-center text-[#888]/20">
                    <Scissors size={80} strokeWidth={1} />
                  </div>
                )}
                <div className="absolute inset-0 bg-[#ff6b35]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff6b35] mb-2 block">{t(item.category)}</span>
              <h3 className="text-2xl font-bold mb-2 text-[#121212]">{t(item.title)}</h3>
              <p className="text-[#888]">{t(item.description)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
