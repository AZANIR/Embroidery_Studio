
import React, { useState } from 'react';
import { useCMS } from '../App';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Settings, 
  FileText, 
  Briefcase, 
  ImageIcon, 
  ShoppingBag, 
  MessageSquare, 
  Menu,
  ChevronRight,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Eye,
  Type as TypeIcon,
  Package,
  ExternalLink,
  Database,
  RefreshCw,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';

const AdminDashboard = () => {
  const cms = useCMS();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const sidebarLinks = [
    { id: 'dashboard', name: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'orders', name: 'Orders', icon: <Package size={20} />, count: cms.orders.length },
    { id: 'inquiries', name: 'Inquiries', icon: <MessageSquare size={20} />, count: cms.inquiries.length },
    { id: 'sections', name: 'Home Content', icon: <TypeIcon size={20} /> },
    { id: 'portfolio', name: 'Portfolio', icon: <ImageIcon size={20} /> },
    { id: 'services', name: 'Services', icon: <Briefcase size={20} /> },
    { id: 'posts', name: 'Blog Posts', icon: <FileText size={20} /> },
    { id: 'shop', name: 'Products', icon: <ShoppingBag size={20} /> },
    { id: 'settings', name: 'Site Settings', icon: <Settings size={20} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-slate-900">Studio Overview</h2>
              <button 
                onClick={cms.generateDemoData}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-xs hover:bg-indigo-100 transition-colors"
              >
                <RefreshCw size={14} /> Generate Demo Data
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Orders', val: cms.orders.length, color: 'bg-orange-50 text-orange-600' },
                { label: 'New Inquiries', val: cms.inquiries.filter(i => i.status === 'new').length, color: 'bg-indigo-50 text-indigo-600' },
                { label: 'Active Services', val: cms.services.length, color: 'bg-amber-50 text-amber-600' },
                { label: 'Shop Products', val: cms.products.length, color: 'bg-rose-50 text-rose-600' },
              ].map((stat, i) => (
                <div key={i} className={`p-6 rounded-3xl ${stat.color} border border-transparent hover:border-current transition-all shadow-sm`}>
                  <p className="text-sm font-bold uppercase tracking-widest opacity-70 mb-2">{stat.label}</p>
                  <p className="text-4xl font-bold">{stat.val}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Package size={20} className="text-orange-500" /> Recent Orders
                </h3>
                <div className="space-y-4">
                  {cms.orders.slice(0, 4).map(order => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div>
                        <p className="font-bold text-slate-800">{order.customer.name}</p>
                        <p className="text-xs text-slate-500">{order.total} грн • {new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-1 bg-white border border-slate-200 rounded-lg uppercase text-slate-600">{order.status}</span>
                    </div>
                  ))}
                  {cms.orders.length === 0 && (
                    <div className="text-center py-10">
                      <p className="text-slate-400 text-sm italic">No orders yet.</p>
                      <button onClick={() => setActiveTab('shop')} className="text-indigo-600 text-xs font-bold mt-2">Visit Shop →</button>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <MessageSquare size={20} className="text-indigo-500" /> New Inquiries
                </h3>
                <div className="space-y-4">
                  {cms.inquiries.slice(0, 4).map(inq => (
                    <div key={inq.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div>
                        <p className="font-bold text-slate-800">{inq.name}</p>
                        <p className="text-xs text-slate-500">{inq.service}</p>
                      </div>
                      <button onClick={() => setActiveTab('inquiries')} className="text-indigo-600 p-2 hover:bg-white rounded-lg transition-colors"><ExternalLink size={16} /></button>
                    </div>
                  ))}
                  {cms.inquiries.length === 0 && (
                    <div className="text-center py-10">
                      <p className="text-slate-400 text-sm italic">No inquiries yet.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Persistence Warning */}
            <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl flex gap-4">
              <AlertCircle className="text-amber-500 shrink-0" />
              <div>
                <h4 className="font-bold text-amber-800 text-sm">Offline Mode Active</h4>
                <p className="text-amber-700 text-xs mt-1 leading-relaxed">
                  Currently, all data is stored in your <strong>LocalStorage</strong>. 
                  To launch for a real business, you should connect a database like <strong>Supabase</strong> or <strong>Firebase</strong>. 
                  This will allow you to see orders from all customers globally.
                </p>
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4">
            <h2 className="text-3xl font-bold text-slate-900">Order Management</h2>
            <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Order ID</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Customer</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Items</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Total</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Status</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {cms.orders.map(order => (
                      <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-mono text-xs font-bold text-slate-400">{order.id}</span>
                          <p className="text-[10px] text-slate-400 mt-1">{new Date(order.date).toLocaleDateString()}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-sm text-slate-800">{order.customer.name}</p>
                          <p className="text-xs text-slate-500">{order.customer.phone}</p>
                          <p className="text-[10px] text-slate-400">{order.customer.city}, {order.customer.address}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex -space-x-2 overflow-hidden">
                            {order.items.map((item, i) => (
                              <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-slate-100 overflow-hidden" title={cms.t(item.name)}>
                                <img src={item.image} alt="" className="h-full w-full object-cover" />
                              </div>
                            ))}
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1">{order.items.length} items</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-sm">{order.total} грн</p>
                          <p className="text-[10px] font-bold uppercase text-slate-400">{order.paymentMethod}</p>
                        </td>
                        <td className="px-6 py-4">
                          <select 
                            className="text-xs font-bold bg-white border border-slate-200 rounded-lg px-2 py-1 outline-none cursor-pointer focus:ring-2 focus:ring-indigo-100"
                            value={order.status}
                            onChange={(e) => {
                              cms.setOrders(cms.orders.map(o => o.id === order.id ? {...o, status: e.target.value as any} : o));
                            }}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" onClick={() => cms.setOrders(cms.orders.filter(o => o.id !== order.id))}>
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {cms.orders.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-24 text-center">
                          <Package size={48} className="mx-auto text-slate-200 mb-4" strokeWidth={1} />
                          <p className="text-slate-400 italic font-medium">No orders found.</p>
                          <button 
                            onClick={cms.generateDemoData}
                            className="mt-4 text-indigo-600 text-xs font-bold hover:underline"
                          >
                            Generate a Test Order
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'inquiries':
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4">
            <h2 className="text-3xl font-bold text-slate-900">Custom Inquiries</h2>
            <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Customer</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Service</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Qty</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Status</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {cms.inquiries.map(inq => (
                    <tr key={inq.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-800">{inq.name}</p>
                        <p className="text-xs text-slate-500">{inq.email}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{inq.service}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{inq.quantity}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${inq.status === 'new' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-200 text-slate-600'}`}>
                          {inq.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => {
                            const newStatus = inq.status === 'new' ? 'processing' : 'completed';
                            cms.setInquiries(cms.inquiries.map(i => i.id === inq.id ? {...i, status: newStatus as any} : i));
                          }}
                          className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {cms.inquiries.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-24 text-center">
                        <MessageSquare size={48} className="mx-auto text-slate-200 mb-4" strokeWidth={1} />
                        <p className="text-slate-400 italic">No inquiries found.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'sections':
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4">
             <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-slate-900">Home Sections</h2>
                <button className="px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-bold flex items-center gap-2 shadow-lg shadow-slate-200">
                  <Plus size={16} /> Add Custom Section
                </button>
             </div>
             <div className="grid gap-6">
                {cms.sections.sort((a,b) => a.order - b.order).map(section => (
                  <div key={section.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
                    <div className="flex items-center gap-6">
                       <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                          <Menu size={20} />
                       </div>
                       <div>
                          <h4 className="font-bold text-lg text-slate-800">{cms.t(section.title)}</h4>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{section.id}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <button 
                         onClick={() => cms.setSections(cms.sections.map(s => s.id === section.id ? {...s, isVisible: !s.isVisible} : s))}
                         className={`p-3 rounded-xl transition-colors ${section.isVisible ? 'text-green-600 bg-green-50' : 'text-slate-400 bg-slate-100'}`}
                        >
                          {section.isVisible ? <Check size={20} /> : <X size={20} />}
                       </button>
                       <button className="p-3 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"><Edit2 size={20} /></button>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4 max-w-2xl">
            <h2 className="text-3xl font-bold text-slate-900">Studio Settings</h2>
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Studio Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 focus:ring-2 focus:ring-slate-900 outline-none transition-all font-medium"
                    value={cms.settings.name}
                    onChange={e => cms.setSettings({...cms.settings, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Tagline ({cms.lang.toUpperCase()})</label>
                  <input 
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 focus:ring-2 focus:ring-slate-900 outline-none transition-all font-medium"
                    value={cms.settings.tagline[cms.lang]}
                    onChange={e => cms.setSettings({
                      ...cms.settings, 
                      tagline: { ...cms.settings.tagline, [cms.lang]: e.target.value }
                    })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Brand Primary</label>
                    <div className="flex gap-4 items-center">
                      <input 
                        type="color" 
                        className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-xl p-1 cursor-pointer"
                        value={cms.settings.primaryColor}
                        onChange={e => cms.setSettings({...cms.settings, primaryColor: e.target.value})}
                      />
                      <span className="font-mono text-xs text-slate-400">{cms.settings.primaryColor}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Accent Color</label>
                    <div className="flex gap-4 items-center">
                      <input 
                        type="color" 
                        className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-xl p-1 cursor-pointer"
                        value={cms.settings.accentColor}
                        onChange={e => cms.setSettings({...cms.settings, accentColor: e.target.value})}
                      />
                      <span className="font-mono text-xs text-slate-400">{cms.settings.accentColor}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-8 border-t border-slate-100">
                 <button className="w-full py-5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                    Save Site Identity
                 </button>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="p-20 text-center text-slate-400">Module under development.</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 pt-20">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 bg-white border-r border-slate-100 transition-all duration-300 z-50 pt-20 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-4 h-full flex flex-col">
          {/* Back to Site Button */}
          <Link 
            to="/" 
            className={`flex items-center gap-4 p-4 mb-4 rounded-2xl text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-all ${!isSidebarOpen && 'justify-center'}`}
          >
            <ArrowLeft size={20} />
            {isSidebarOpen && <span className="text-sm font-bold">Back to Website</span>}
          </Link>

          <div className="space-y-2 flex-grow">
            {sidebarLinks.map(link => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                  activeTab === link.id 
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
                  : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <span className="flex-shrink-0">{link.icon}</span>
                {isSidebarOpen && (
                  <span className="text-sm font-semibold flex-grow text-left">{link.name}</span>
                )}
                {isSidebarOpen && link.count !== undefined && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeTab === link.id ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}>
                    {link.count}
                  </span>
                )}
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-4 text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-4 border-t border-slate-50"
          >
            <Menu size={20} />
            {isSidebarOpen && <span className="text-sm font-semibold">Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-grow transition-all duration-300 p-8 lg:p-12 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="max-w-6xl mx-auto">
           {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
