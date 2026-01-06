
import React, { useState } from 'react';
import { useCMS } from '../App';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, Loader2, ArrowLeft, Truck, CreditCard, Wallet } from 'lucide-react';

const Checkout = () => {
  const { cart, lang, t, addOrder, settings } = useCMS();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    paymentMethod: 'cod' as 'card' | 'cod'
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 70; // Placeholder shipping fee
  const total = subtotal + shipping;

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-6">
        <h2 className="text-4xl font-black tracking-tighter">{lang === 'uk' ? 'Кошик порожній' : 'Your cart is empty'}</h2>
        <Link to="/shop" className="px-8 py-4 bg-[#121212] text-white rounded-full font-bold uppercase tracking-widest text-xs">
          {lang === 'uk' ? 'Перейти до магазину' : 'Go to Shop'}
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newOrder = addOrder({
        items: cart,
        total: total,
        customer: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          city: formData.city,
          address: formData.address
        },
        paymentMethod: formData.paymentMethod
      });
      setOrderId(newOrder.id);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="py-40 max-w-2xl mx-auto px-6 text-center animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10">
          <CheckCircle2 size={48} />
        </div>
        <h1 className="text-5xl font-black mb-6 tracking-tighter">{lang === 'uk' ? 'Дякуємо за замовлення!' : 'Thank You for Your Order!'}</h1>
        <p className="text-xl text-[#555] mb-4 font-light leading-relaxed">
          {lang === 'uk' 
            ? `Ваше замовлення #${orderId} успішно прийнято. Наш менеджер зв'яжеться з вами найближчим часом.` 
            : `Your order #${orderId} has been placed. Our manager will contact you soon for confirmation.`}
        </p>
        <p className="text-sm font-bold text-[#ff6b35] mb-12 uppercase tracking-widest">
          {lang === 'uk' ? 'Підтвердження надіслано на пошту' : 'Confirmation email sent'}
        </p>
        <Link to="/" className="inline-flex items-center gap-2 px-10 py-5 bg-[#121212] text-white rounded-full font-bold text-lg hover:opacity-90 transition-all">
          <ArrowLeft size={20} /> {lang === 'uk' ? 'На головну' : 'Back to Home'}
        </Link>
      </div>
    );
  }

  return (
    <div className="py-24 bg-[#f4f1ea] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#888] hover:text-[#ff6b35] transition-colors">
            <ArrowLeft size={16} /> {lang === 'uk' ? 'Повернутися до магазину' : 'Back to Shop'}
          </Link>
          <h1 className="text-5xl md:text-7xl font-black mt-6 tracking-tighter text-[#121212]">
            {lang === 'uk' ? 'Оформлення' : 'Checkout'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Form */}
          <div className="lg:col-span-7 space-y-12">
            <section className="space-y-6">
              <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <span className="w-8 h-8 bg-[#121212] text-white rounded-full flex items-center justify-center text-sm">1</span>
                {lang === 'uk' ? 'Контактні дані' : 'Contact Information'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required placeholder={lang === 'uk' ? "Ім'я та Прізвище" : "Full Name"} className="checkout-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <input required placeholder={lang === 'uk' ? "Телефон" : "Phone"} className="checkout-input" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                <input required type="email" placeholder="Email" className="checkout-input md:col-span-2" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <span className="w-8 h-8 bg-[#121212] text-white rounded-full flex items-center justify-center text-sm">2</span>
                {lang === 'uk' ? 'Доставка (Нова Пошта)' : 'Shipping (Nova Poshta)'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required placeholder={lang === 'uk' ? "Місто" : "City"} className="checkout-input" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                <input required placeholder={lang === 'uk' ? "Відділення або адреса" : "Branch or Address"} className="checkout-input" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
              </div>
              <div className="p-4 bg-white/50 border border-[#e7e3da] rounded-2xl flex items-center gap-4">
                <Truck className="text-[#ff6b35]" />
                <p className="text-sm font-medium">
                  {lang === 'uk' ? 'Вартість доставки розраховується за тарифами перевізника (~70 грн)' : 'Shipping calculated by carrier rates (~70 UAH)'}
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <span className="w-8 h-8 bg-[#121212] text-white rounded-full flex items-center justify-center text-sm">3</span>
                {lang === 'uk' ? 'Оплата' : 'Payment'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, paymentMethod: 'card'})}
                  className={`flex items-center gap-4 p-6 rounded-3xl border-2 transition-all ${formData.paymentMethod === 'card' ? 'border-[#ff6b35] bg-white' : 'border-[#e7e3da] bg-transparent'}`}
                >
                  <CreditCard className={formData.paymentMethod === 'card' ? 'text-[#ff6b35]' : 'text-[#888]'} />
                  <div className="text-left">
                    <p className="font-bold">{lang === 'uk' ? 'Карткою' : 'By Card'}</p>
                    <p className="text-xs text-[#888]">{lang === 'uk' ? 'Онлайн оплата' : 'Online payment'}</p>
                  </div>
                </button>
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, paymentMethod: 'cod'})}
                  className={`flex items-center gap-4 p-6 rounded-3xl border-2 transition-all ${formData.paymentMethod === 'cod' ? 'border-[#ff6b35] bg-white' : 'border-[#e7e3da] bg-transparent'}`}
                >
                  <Wallet className={formData.paymentMethod === 'cod' ? 'text-[#ff6b35]' : 'text-[#888]'} />
                  <div className="text-left">
                    <p className="font-bold">{lang === 'uk' ? 'Накладений платіж' : 'C.O.D'}</p>
                    <p className="text-xs text-[#888]">{lang === 'uk' ? 'Оплата при отриманні' : 'Pay on delivery'}</p>
                  </div>
                </button>
              </div>
            </section>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white p-10 rounded-[48px] shadow-sm border border-[#e7e3da] sticky top-28 space-y-8">
              <h3 className="text-2xl font-black tracking-tight">{lang === 'uk' ? 'Ваше замовлення' : 'Your Order'}</h3>
              
              <div className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-[#f4f1ea] rounded-2xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={t(item.name)} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-sm leading-tight line-clamp-1">{t(item.name)}</h4>
                      <p className="text-xs font-medium text-[#888]">x{item.quantity}</p>
                      <p className="text-sm font-bold">{item.price * item.quantity} грн</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-[#f4f1ea] space-y-4">
                <div className="flex justify-between items-center text-sm font-bold text-[#888]">
                  <span>{lang === 'uk' ? 'Сума' : 'Subtotal'}</span>
                  <span>{subtotal} грн</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-[#888]">
                  <span>{lang === 'uk' ? 'Доставка' : 'Shipping'}</span>
                  <span>{shipping} грн</span>
                </div>
                <div className="flex justify-between items-end pt-4">
                  <span className="text-lg font-black tracking-widest uppercase">{lang === 'uk' ? 'Разом' : 'Total'}</span>
                  <span className="text-4xl font-black text-[#121212]">{total} грн</span>
                </div>
              </div>

              <button 
                disabled={isSubmitting}
                type="submit" 
                className="w-full h-16 bg-[#121212] text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#ff6b35] transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" />
                    {lang === 'uk' ? 'Оформлення...' : 'Processing...'}
                  </>
                ) : (
                  lang === 'uk' ? 'Підтвердити замовлення' : 'Confirm Order'
                )}
              </button>

              <div className="text-center">
                <p className="text-[10px] font-bold text-[#888] uppercase tracking-[0.2em]">
                  {lang === 'uk' ? 'Безпечне оформлення замовлення' : 'Secure checkout enabled'}
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
      <style>{`
        .checkout-input {
          width: 100%;
          background: white;
          border: 1px solid #e7e3da;
          border-radius: 16px;
          padding: 16px 24px;
          outline: none;
          font-weight: 500;
          transition: all 0.3s;
        }
        .checkout-input:focus {
          border-color: #ff6b35;
          box-shadow: 0 0 0 4px rgba(255, 107, 53, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e7e3da;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default Checkout;
