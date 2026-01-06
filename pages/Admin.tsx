
import React, { useState } from 'react';
import { useCMS } from '../App';
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
  Type as TypeIcon
} from 'lucide-react';

const AdminDashboard = () => {
  const cms = useCMS();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const sidebarLinks = [
    { id: 'dashboard', name: 'Overview', icon: <LayoutDashboard size={20} /> },
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
            <h2 className="text-3xl font-bold serif">Studio Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'New Inquiries', val: cms.inquiries.filter(i => i.status === 'new').length, color: 'bg-indigo-50 text-indigo-600' },
                { label: 'Total Projects', val: cms.portfolio.length, color: 'bg-emerald-50 text-emerald-600' },
                { label: 'Active Services', val: cms.services.length, color: 'bg-amber-50 text-amber-600' },
                { label: 'Blog Posts', val: cms.posts.length, color: 'bg-rose-50 text-rose-600' },
              ].map((stat, i) => (
                <div key={i} className={`p-6 rounded-3xl ${stat.color} border border-transparent hover:border-current transition-all`}>
                  <p className="text-sm font-bold uppercase tracking-widest opacity-70 mb-2">{stat.label}</p>
                  <p className="text-4xl font-bold">{stat.val}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <MessageSquare size={20} /> Recent Inquiries
                </h3>
                <div className="space-y-4">
                  {cms.inquiries.slice(0, 4).map(inq => (
                    <div key={inq.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                      <div>
                        <p className="font-bold">{inq.name}</p>
                        <p className="text-xs text-slate-500">{inq.service} • {new Date(inq.date).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${inq.status === 'new' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-200 text-slate-600'}`}>
                        {inq.status}
                      </span>
                    </div>
                  ))}
                  {cms.inquiries.length === 0 && <p className="text-slate-400 text-sm">No inquiries yet.</p>}
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <ImageIcon size={20} /> Content Update
                </h3>
                <p className="text-sm text-slate-500 mb-6">Manage your studio's digital presence and update your catalog.</p>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setActiveTab('portfolio')} className="p-4 bg-slate-900 text-white rounded-2xl flex flex-col items-center gap-2 hover:bg-slate-800 transition-all">
                    <Plus size={20} /> <span className="text-xs font-bold uppercase tracking-widest">Add Work</span>
                  </button>
                  <button onClick={() => setActiveTab('posts')} className="p-4 bg-slate-100 text-slate-900 rounded-2xl flex flex-col items-center gap-2 hover:bg-slate-200 transition-all">
                    <FileText size={20} /> <span className="text-xs font-bold uppercase tracking-widest">Write Post</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'inquiries':
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4">
            <h2 className="text-3xl font-bold serif">Order Inquiries</h2>
            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
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
                        <p className="font-bold">{inq.name}</p>
                        <p className="text-xs text-slate-500">{inq.email}</p>
                      </td>
                      <td className="px-6 py-4 text-sm">{inq.service}</td>
                      <td className="px-6 py-4 text-sm">{inq.quantity}</td>
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
                          className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {cms.inquiries.length === 0 && (
                    <tr><td colSpan={5} className="px-6 py-20 text-center text-slate-400 italic">No inquiries found.</td></tr>
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
                <h2 className="text-3xl font-bold serif">Home Sections</h2>
                <button className="px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-bold flex items-center gap-2">
                  <Plus size={16} /> Add Custom Section
                </button>
             </div>
             <div className="grid gap-6">
                {cms.sections.sort((a,b) => a.order - b.order).map(section => (
                  <div key={section.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group">
                    <div className="flex items-center gap-6">
                       <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                          <Menu size={18} />
                       </div>
                       <div>
                          <h4 className="font-bold text-lg serif">{cms.t(section.title)}</h4>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{section.id}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <button 
                         onClick={() => cms.setSections(cms.sections.map(s => s.id === section.id ? {...s, isVisible: !s.isVisible} : s))}
                         className={`p-2 rounded-lg transition-colors ${section.isVisible ? 'text-green-600 bg-green-50' : 'text-slate-400 bg-slate-100'}`}
                        >
                          {section.isVisible ? <Check size={20} /> : <X size={20} />}
                       </button>
                       <button className="p-2 text-slate-400 hover:text-slate-900"><Edit2 size={20} /></button>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4 max-w-2xl">
            <h2 className="text-3xl font-bold serif">Studio Settings</h2>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Studio Name</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-slate-900"
                  value={cms.settings.name}
                  onChange={e => cms.setSettings({...cms.settings, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Tagline ({cms.lang.toUpperCase()})</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-slate-900"
                  value={cms.settings.tagline[cms.lang]}
                  onChange={e => cms.setSettings({
                    ...cms.settings, 
                    tagline: { ...cms.settings.tagline, [cms.lang]: e.target.value }
                  })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Brand Primary</label>
                  <input 
                    type="color" 
                    className="w-full h-14 bg-slate-50 border-none rounded-xl p-1 cursor-pointer"
                    value={cms.settings.primaryColor}
                    onChange={e => cms.setSettings({...cms.settings, primaryColor: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Accent Color</label>
                  <input 
                    type="color" 
                    className="w-full h-14 bg-slate-50 border-none rounded-xl p-1 cursor-pointer"
                    value={cms.settings.accentColor}
                    onChange={e => cms.setSettings({...cms.settings, accentColor: e.target.value})}
                  />
                </div>
              </div>
              <div className="pt-6 border-t border-slate-100">
                 <button className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all">
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
        <div className="p-6 h-full flex flex-col">
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
            className="p-4 text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-4"
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
