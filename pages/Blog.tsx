
import React from 'react';
import { useCMS } from '../App';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Scissors } from 'lucide-react';

const Blog = () => {
  const { lang, posts, t } = useCMS();

  return (
    <div className="py-24 bg-[#f4f1ea] animate-in fade-in duration-500 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-[#121212]">
            {lang === 'uk' ? 'Журнал' : 'The Journal'}
          </h1>
          <p className="text-[#888] text-xl max-w-2xl mx-auto">
            {lang === 'uk' 
              ? 'Новини студії, секрети ремесла та історії за лаштунками.' 
              : 'Insights into the world of embroidery and behind-the-scenes stories.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {posts.map(post => (
            <div key={post.id} className="bg-[#e7e3da] rounded-[48px] overflow-hidden shadow-sm hover:shadow-xl transition-all group">
               <div className="aspect-[16/9] overflow-hidden flex items-center justify-center bg-[#d9d5cd]">
                  {post.image ? (
                    <img src={post.image} alt={t(post.title)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <Scissors className="text-[#888]/20" size={100} />
                  )}
               </div>
               <div className="p-10 md:p-14">
                  <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-[#ff6b35] mb-6">
                     <span className="flex items-center gap-2"><Calendar size={14} /> {new Date(post.date).toLocaleDateString()}</span>
                     <span className="flex items-center gap-2"><User size={14} /> Studio</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#121212] group-hover:text-[#ff6b35] transition-colors">{t(post.title)}</h2>
                  <p className="text-[#555] text-lg mb-8 leading-relaxed line-clamp-3">
                    {t(post.excerpt)}
                  </p>
                  <Link to={`/blog/${post.slug}`} className="inline-flex items-center font-bold text-[#121212] border-b-2 border-[#ff6b35] pb-1 hover:text-[#ff6b35] transition-colors uppercase text-sm tracking-widest">
                    {lang === 'uk' ? 'Читати далі' : 'Read Full Story'} <ArrowRight className="ml-2" size={16} />
                  </Link>
               </div>
            </div>
          ))}
          {posts.length === 0 && (
            <div className="col-span-full py-20 text-center text-[#888] italic">
              {lang === 'uk' ? 'Нових записів поки немає.' : 'No blog posts yet.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
