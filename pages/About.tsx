
import React from 'react';
import { useCMS } from '../App';

const About = () => {
  const { lang } = useCMS();

  return (
    <div className="animate-in fade-in duration-500 bg-[#f4f1ea]">
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl relative z-10 bg-[#e7e3da] flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2070&auto=format&fit=crop" alt="Our Studio" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#e7e3da] rounded-full -z-0"></div>
            </div>
            <div>
               <h1 className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter text-[#121212]">
                 {lang === 'uk' ? 'Наша Історія' : 'The Gapta Story'}
               </h1>
               <div className="space-y-6 text-xl text-[#555] font-light leading-relaxed">
                  <p>
                    {lang === 'uk' 
                      ? 'Студія ГАПТА була заснована у 2018 році з простою ідеєю: поєднати багатовікову техніку вишивки з сучасною цифровою точністю.' 
                      : 'Founded in 2018, Gapta emerged from a simple desire: to bridge the gap between ancient textile artistry and modern digital precision.'}
                  </p>
                  <p>
                    {lang === 'uk' 
                      ? 'Наша філософія базується на безкомпромісній якості. Ми не просто запускаємо файли — ми ретельно створюємо дизайн кожного стібка вручну.' 
                      : 'Our philosophy is centered on uncompromising quality. We don\'t just run files—we meticulously digitize every design by hand.'}
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#e7e3da]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div>
               <h3 className="text-3xl font-bold mb-6 text-[#121212]">{lang === 'uk' ? 'Бачення' : 'Our Vision'}</h3>
               <p className="text-[#555] leading-relaxed">{lang === 'uk' ? 'Стати стандартом у текстильній персоналізації.' : 'To become the gold standard in textile personalization.'}</p>
            </div>
            <div>
               <h3 className="text-3xl font-bold mb-6 text-[#121212]">{lang === 'uk' ? 'Цінності' : 'Our Values'}</h3>
               <p className="text-[#555] leading-relaxed">{lang === 'uk' ? 'Повага до ремесла та увага до деталей.' : 'Integrity of materials and respect for the craft.'}</p>
            </div>
            <div>
               <h3 className="text-3xl font-bold mb-6 text-[#121212]">{lang === 'uk' ? 'Еко' : 'Sustainability'}</h3>
               <p className="text-[#555] leading-relaxed">{lang === 'uk' ? 'Пріоритет екологічним ниткам та безвідходному виробництву.' : 'We prioritize eco-friendly threads and minimal waste.'}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
