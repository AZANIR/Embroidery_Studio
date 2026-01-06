
import React, { useState, useEffect } from 'react';
import { useCMS } from '../App';
import { useSearchParams } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const { lang, settings, services, addInquiry, t } = useCMS();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const productFromUrl = searchParams.get('product');
  const serviceFromUrl = searchParams.get('service');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: services[0] ? t(services[0].name) : '',
    quantity: 1,
    message: ''
  });

  // Pre-fill form if redirected from Shop or Services
  useEffect(() => {
    if (productFromUrl || serviceFromUrl) {
      setFormData(prev => ({
        ...prev,
        service: serviceFromUrl || prev.service,
        message: productFromUrl 
          ? (lang === 'uk' ? `Доброго дня! Мене цікавить замовлення товару: ${productFromUrl}` : `Hello! I am interested in ordering: ${productFromUrl}`)
          : prev.message
      }));
    }
  }, [productFromUrl, serviceFromUrl, lang]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      addInquiry(formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: '', email: '',
        service: services[0] ? t(services[0].name) : '',
        quantity: 1, message: ''
      });
    }, 1500);
  };

  return (
    <div className="py-24 bg-[#f4f1ea] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-[#121212]">
              {lang === 'uk' ? 'Зв’яжіться з нами' : 'Get in Touch'}
            </h1>
            
            <div className="space-y-8">
              {[
                { label: 'Email', val: settings.contactEmail, icon: <Mail /> },
                { label: 'Phone', val: settings.phone, icon: <Phone /> },
                { label: 'Address', val: t(settings.address), icon: <MapPin /> },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-[#e7e3da] rounded-2xl flex items-center justify-center text-[#ff6b35] transition-colors group-hover:bg-[#ff6b35] group-hover:text-white">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#888] mb-1">{item.label}</p>
                    <p className="text-lg font-bold text-[#121212]">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>

            {(productFromUrl || serviceFromUrl) && !isSuccess && (
              <div className="p-6 bg-[#ff6b35]/10 border border-[#ff6b35]/20 rounded-3xl flex items-center gap-4 animate-in fade-in slide-in-from-left-4">
                <CheckCircle2 className="text-[#ff6b35]" />
                <p className="text-sm font-medium text-[#121212]">
                  {lang === 'uk' 
                    ? `Ви обрали: ${productFromUrl || serviceFromUrl}. Будь ласка, заповніть форму нижче.` 
                    : `You selected: ${productFromUrl || serviceFromUrl}. Please fill the form below.`}
                </p>
              </div>
            )}
          </div>

          <div className="bg-[#e7e3da] p-10 md:p-14 rounded-[40px] shadow-sm">
            {isSuccess ? (
              <div className="text-center py-10 animate-in zoom-in duration-300">
                <div className="w-20 h-20 bg-[#ff6b35]/20 text-[#ff6b35] rounded-full flex items-center justify-center mx-auto mb-8">
                  <Send size={40} />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-[#121212]">{lang === 'uk' ? 'Надіслано!' : 'Sent!'}</h3>
                <p className="text-[#555] mb-8">{lang === 'uk' ? 'Ми зв\'яжемося з вами найближчим часом.' : 'We will contact you shortly.'}</p>
                <button onClick={() => setIsSuccess(false)} className="px-8 py-3 bg-[#121212] text-white rounded-full font-bold">
                  {lang === 'uk' ? 'Надіслати ще раз' : 'Send Another'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <input required placeholder={lang === 'uk' ? 'Ваше ім’я' : 'Your Name'} className="w-full bg-[#f4f1ea] rounded-xl px-6 py-4 outline-none border border-[#e7e3da] focus:border-[#ff6b35] transition-colors" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  <input required type="email" placeholder="Email" className="w-full bg-[#f4f1ea] rounded-xl px-6 py-4 outline-none border border-[#e7e3da] focus:border-[#ff6b35] transition-colors" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  <select 
                    className="w-full bg-[#f4f1ea] rounded-xl px-6 py-4 outline-none border border-[#e7e3da] focus:border-[#ff6b35] transition-colors appearance-none"
                    value={formData.service}
                    onChange={e => setFormData({...formData, service: e.target.value})}
                  >
                    {services.map(s => (
                      <option key={s.id} value={t(s.name)}>{t(s.name)}</option>
                    ))}
                    <option value="Інше">{lang === 'uk' ? 'Інше' : 'Other'}</option>
                  </select>
                  <textarea rows={4} placeholder={lang === 'uk' ? 'Опишіть ваше замовлення (бажана кількість, розмір тощо)...' : 'Describe your order (quantity, size, etc)...'} className="w-full bg-[#f4f1ea] rounded-xl px-6 py-4 outline-none border border-[#e7e3da] focus:border-[#ff6b35] transition-colors" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                </div>
                <button disabled={isSubmitting} type="submit" className="w-full bg-[#121212] text-white py-5 rounded-xl font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : (lang === 'uk' ? 'Замовити вишивку' : 'Place Order')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
