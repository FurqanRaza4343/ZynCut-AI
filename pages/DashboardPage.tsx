
import React, { useState } from 'react';
import { 
  Activity, Image as ImageIcon, CreditCard, 
  Settings, User, Plus, Search, Filter, ArrowUpRight,
  Download, Trash2, Clock, Zap, X
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../App';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { user, usageCount, history } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = history.filter(item => {
    const filename = `Asset_${item.id.slice(0, 4)}.png`.toLowerCase();
    const dateStr = new Date(item.timestamp).toLocaleDateString().toLowerCase();
    const term = searchTerm.toLowerCase();
    return filename.includes(term) || dateStr.includes(term);
  });

  return (
    <div className="bg-cream min-h-screen">
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="lg:w-72 bg-white border-r border-magenta/5 p-8 space-y-2 hidden lg:block">
          <div className="mb-10 px-4">
            <p className="text-xs font-black text-soft-gray uppercase tracking-widest mb-1">Menu</p>
          </div>
          {[
            { icon: <Activity size={20} />, label: "Overview", active: true },
            { icon: <ImageIcon size={20} />, label: "My Gallery" },
            { icon: <CreditCard size={20} />, label: "Subscription" },
            { icon: <User size={20} />, label: "Account" },
            { icon: <Settings size={20} />, label: "Settings" },
          ].map((item, i) => (
            <button 
              key={i}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all ${
                item.active 
                ? 'bg-magenta text-white shadow-xl shadow-magenta/20' 
                : 'text-soft-gray hover:bg-magenta/5 hover:text-magenta'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
          <div className="pt-20">
            <div className="bg-charcoal text-white p-8 rounded-[32px] text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-magenta/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-magenta/30 transition-all"></div>
              <p className="text-xs font-bold text-soft-gray mb-2 uppercase tracking-tighter">Current Plan</p>
              <h4 className="text-2xl font-display font-black mb-1 capitalize">{user?.plan}</h4>
              <p className="text-xs text-soft-gray mb-8">
                {user?.plan === 'free' ? `${2 - usageCount}/2 daily uses left` : 'Unlimited active'}
              </p>
              <Link to="/pricing" className="block w-full bg-magenta py-3 rounded-xl text-sm font-bold hover:bg-magenta-hover transition-all shadow-lg shadow-magenta/30">
                Upgrade Now
              </Link>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 lg:p-12 overflow-y-auto max-h-[calc(100vh-80px)]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
            <div>
              <h1 className="text-3xl lg:text-4xl font-display font-bold text-almost-black">Hello, {user?.name.split(' ')[0]}!</h1>
              <p className="text-soft-gray font-medium mt-1">Ready to create some magic today?</p>
            </div>
            <Link 
              to="/tool"
              className="flex items-center gap-3 bg-magenta text-white px-8 py-4 rounded-2xl font-bold hover:bg-magenta-hover transition-all shadow-xl shadow-magenta/10 active:scale-95"
            >
              <Plus size={20} />
              New Removal
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
            {[
              { label: "Total Assets", value: history.length.toString(), trend: "Syncing", icon: <ImageIcon size={22} />, color: "bg-magenta" },
              { label: "Removals Left", value: user?.plan === 'free' ? (2 - usageCount).toString() : '∞', trend: "Daily Reset", icon: <Zap size={22} />, color: "bg-teal" },
              { label: "Avg. Speed", value: "0.8s", trend: "Optimized", icon: <Activity size={22} />, color: "bg-yellow" },
              { label: "History", value: history.length > 0 ? "Active" : "None", trend: "Persistent", icon: <Clock size={22} />, color: "bg-coral" },
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-[32px] border border-magenta/5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 rounded-2xl text-white ${stat.color} shadow-lg`}>
                    {stat.icon}
                  </div>
                  <span className="text-[10px] font-black text-teal bg-teal/5 px-2 py-1 rounded-lg flex items-center gap-1 uppercase tracking-widest">
                    {stat.trend}
                  </span>
                </div>
                <h3 className="text-4xl font-display font-black text-almost-black mb-1">{stat.value}</h3>
                <p className="text-sm text-soft-gray font-bold uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Recent Assets Gallery */}
          <div className="bg-white rounded-[40px] p-8 lg:p-10 border border-magenta/5 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-6">
              <h2 className="text-2xl font-display font-bold">Your Creative Gallery</h2>
              <div className="flex gap-4 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-80">
                  <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-soft-gray" />
                  <input 
                    type="text" 
                    placeholder="Search by name or date..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-14 pr-12 py-3 rounded-2xl bg-cream border border-magenta/5 text-sm focus:outline-none focus:border-magenta/20 focus:ring-2 focus:ring-magenta/5 transition-all" 
                  />
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-soft-gray hover:text-magenta transition-colors"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                <button className="p-3 rounded-2xl bg-cream border border-magenta/5 text-soft-gray hover:text-magenta transition-all">
                  <Filter size={20} />
                </button>
              </div>
            </div>

            {history.length === 0 ? (
              <div className="py-24 text-center">
                <div className="w-24 h-24 bg-magenta/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ImageIcon className="text-magenta/30" size={48} />
                </div>
                <h3 className="text-xl font-bold mb-2">No images yet</h3>
                <p className="text-soft-gray max-w-xs mx-auto mb-8">Process your first image to see it appear here in your permanent gallery.</p>
                <Link to="/tool" className="bg-magenta text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-magenta/20 hover:scale-105 transition-all">
                  Start Removing
                </Link>
              </div>
            ) : filteredHistory.length === 0 ? (
              <div className="py-24 text-center">
                <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center mx-auto mb-4 border border-magenta/5">
                  <Search size={32} className="text-soft-gray/30" />
                </div>
                <h3 className="text-xl font-bold mb-1">No results for "{searchTerm}"</h3>
                <p className="text-soft-gray text-sm">Try searching for a different keyword or date.</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-6 text-magenta text-sm font-bold hover:underline"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {filteredHistory.map((item, idx) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group relative rounded-3xl overflow-hidden border border-magenta/5 bg-cream shadow-sm hover:shadow-xl transition-all"
                  >
                    <div className="aspect-square relative checkboard overflow-hidden">
                      <img 
                        src={item.result} 
                        className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-110" 
                        alt="Gallery item"
                      />
                      <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
                        <div className="flex gap-3">
                          <button className="p-3 bg-white text-almost-black rounded-2xl hover:bg-magenta hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">
                            <Download size={20} />
                          </button>
                          <button className="p-3 bg-white text-almost-black rounded-2xl hover:bg-coral hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-white border-t border-magenta/5">
                      <p className="text-xs font-bold text-almost-black truncate mb-1">Asset_{item.id.slice(0, 4)}.png</p>
                      <p className="text-[10px] text-soft-gray font-medium uppercase tracking-widest">{new Date(item.timestamp).toLocaleDateString()}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
            {history.length > 0 && filteredHistory.length > 0 && (
              <div className="mt-16 text-center">
                <button className="text-magenta font-black uppercase text-xs tracking-[0.2em] hover:text-magenta-hover transition-colors flex items-center gap-2 mx-auto group">
                  Load More History
                  <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
