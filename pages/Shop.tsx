
import React from 'react';
import { useCMS } from '../App';
import { ShoppingCart, Heart, Scissors, ArrowRight, Check } from 'lucide-react';

const Shop = () => {
  const { lang, products, addToCart, cart, t } = useCMS();

  return (
    <div className="py-24 bg-[#f4f1ea] animate-in fade-in duration-500 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-[#ff6b35] font-black uppercase tracking-widest text-[10px] mb-4 block">
            {lang === 'uk' ? 'Колекція студії' : 'Studio Collection'}
          </span>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter text-[#121212]">
            {lang === 'uk' ? 'Магазин' : 'The Shop'}
          </h1>
          <p className="text-[#555] text-xl max-w-2xl mx-auto font-light">
            {lang === 'uk' 
              ? 'Готові вироби з нашою авторською вишивкою. Оберіть товар та додайте до кошика.' 
              : 'Ready-to-wear artisanal pieces. Select an item and add it to your collection.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {products.map(product => {
            const inCart = cart.some(item => item.id === product.id);
            return (
              <div key={product.id} className="group flex flex-col">
                <div className="aspect-[3/4] bg-[#e7e3da] rounded-[48px] overflow-hidden mb-8 relative flex items-center justify-center shadow-sm transition-all hover:shadow-2xl">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={t(product.name)} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <Scissors className="text-[#888]/20" size={80} />
                  )}
                  
                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-[#121212]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <button 
                      onClick={() => addToCart(product)}
                      className={`h-14 px-8 rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-2xl transition-all ${
                        inCart ? 'bg-green-500 text-white' : 'bg-white text-[#121212] hover:bg-[#ff6b35] hover:text-white'
                      }`}
                    >
                      {inCart ? <Check size={18} /> : <ShoppingCart size={18} />}
                      {inCart ? (lang === 'uk' ? 'У кошику' : 'In Cart') : (lang === 'uk' ? 'До кошика' : 'Add to Cart')}
                    </button>
                  </div>
                </div>

                <div className="px-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#ff6b35]">{product.category}</span>
                    <span className="text-xl font-black text-[#121212]">{product.price} грн</span>
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-[#121212] tracking-tight line-clamp-2">{t(product.name)}</h3>
                  <p className="text-[#555] text-sm font-medium leading-relaxed mb-4 line-clamp-2">{t(product.description)}</p>
                </div>
              </div>
            );
          })}
          
          {products.length === 0 && (
            <div className="col-span-full py-40 text-center text-[#888] italic text-2xl font-light">
              {lang === 'uk' ? 'Ми готуємо нову колекцію...' : 'New collection is coming soon...'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
