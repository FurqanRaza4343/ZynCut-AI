
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Upload, Scissors, Zap, ShieldCheck, Eye, Download, 
  ShoppingBag, Palette, GraduationCap, Megaphone, Users, TrendingUp,
  CheckCircle 
} from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleTryDemo = () => {
    navigate('/tool?demo=true');
  };

  return (
    <div className="bg-cream">
      {/* Hero Section */}
      <section className="pt-20 pb-32 overflow-hidden relative">
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-magenta/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-teal/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block bg-magenta/10 text-magenta px-4 py-2 rounded-full text-sm font-bold mb-6 tracking-wider uppercase">
                  Powered by Next-Gen AI
                </span>
                <h1 className="text-5xl lg:text-7xl font-display font-bold text-almost-black mb-6 leading-tight">
                  Remove Image <br />
                  <span className="gradient-text">Backgrounds</span> <br />
                  in One Click
                </h1>
                <p className="text-xl text-soft-gray mb-10 max-w-lg mx-auto lg:mx-0">
                  Fast, simple, and professional background removal for creators, businesses, and everyone in between.
                </p>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                  <Link
                    to="/tool"
                    className="flex items-center justify-center gap-2 bg-magenta text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-magenta-hover transition-all shadow-xl shadow-magenta/30 hover:-translate-y-1"
                  >
                    <Upload size={20} />
                    Upload Image
                  </Link>
                  <button 
                    onClick={handleTryDemo}
                    className="flex items-center justify-center gap-2 bg-white text-almost-black px-8 py-4 rounded-2xl font-bold text-lg border-2 border-magenta/20 hover:border-magenta transition-all active:scale-95"
                  >
                    <Eye size={20} />
                    Try Demo
                  </button>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white group">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" 
                    alt="Demo Subject" 
                    className="w-full object-cover aspect-[4/3]"
                  />
                  <div className="absolute top-0 right-0 bottom-0 w-1/2 border-l-4 border-magenta bg-white/20 backdrop-blur-sm checkboard flex items-center justify-center transition-all group-hover:w-full">
                    <div className="bg-magenta p-4 rounded-full shadow-lg">
                      <Scissors className="text-white w-8 h-8" />
                    </div>
                  </div>
                </div>
                {/* Floating elements */}
                <div className="absolute -top-10 -right-10 bg-white p-6 rounded-2xl shadow-xl animate-bounce hidden sm:block">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal/10 text-teal rounded-full flex items-center justify-center">
                      <Zap size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-soft-gray">Processing Speed</p>
                      <p className="font-bold">0.8 Seconds</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-display font-bold text-almost-black mb-4">How it Works</h2>
            <p className="text-soft-gray text-lg max-w-2xl mx-auto">Three simple steps to professional results. No design skills required.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Upload size={32} />, title: "Upload Image", desc: "Drag and drop your JPG, PNG, or WebP image into our secure uploader.", step: "01" },
              { icon: <Zap size={32} />, title: "AI Magic", desc: "Our powerful AI engine detects and removes the background instantly.", step: "02" },
              { icon: <Download size={32} />, title: "Download", desc: "Get your high-quality transparent PNG file ready for use anywhere.", step: "03" }
            ].map((step, idx) => (
              <div key={idx} className="relative group p-10 rounded-3xl bg-cream border border-magenta/5 transition-all hover:shadow-xl hover:-translate-y-2">
                <span className="absolute top-6 right-8 text-5xl font-display font-black text-magenta/5 group-hover:text-magenta/10 transition-colors">
                  {step.step}
                </span>
                <div className="w-16 h-16 bg-magenta text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-magenta/20">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-soft-gray leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-charcoal text-white overflow-hidden relative">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-magenta/10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold mb-8">Professional Features for Serious Creators</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: <Zap size={20} />, title: "One-Click Removal", color: "text-magenta" },
                  { icon: <Eye size={20} />, title: "Instant Preview", color: "text-teal" },
                  { icon: <ShieldCheck size={20} />, title: "Secure Processing", color: "text-yellow" },
                  { icon: <Download size={20} />, title: "HD Quality", color: "text-coral" },
                  { icon: <TrendingUp size={20} />, title: "Batch Mode", color: "text-magenta" },
                  { icon: <Users size={20} />, title: "API Access", color: "text-teal" },
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer">
                    <div className={`${feat.color}`}>{feat.icon}</div>
                    <span className="font-medium">{feat.title}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-magenta to-teal p-1 rounded-3xl">
                <div className="bg-charcoal rounded-[22px] p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-xs text-soft-gray">ZynCut AI Dashboard</span>
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 bg-white/10 rounded-full w-3/4"></div>
                    <div className="h-4 bg-white/10 rounded-full w-full"></div>
                    <div className="h-32 bg-white/5 rounded-2xl flex items-center justify-center border-2 border-dashed border-white/10 group cursor-pointer hover:border-magenta/40 transition-all">
                      <div className="text-center">
                        <Upload className="mx-auto text-magenta mb-2" />
                        <p className="text-xs text-soft-gray">Click to process demo image...</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Link to="/tool" className="h-10 bg-magenta rounded-xl w-1/2 flex items-center justify-center text-xs font-bold shadow-lg shadow-magenta/20">Remove Now</Link>
                      <Link to="/pricing" className="h-10 bg-white/10 rounded-xl w-1/2 flex items-center justify-center text-xs font-bold hover:bg-white/20 transition-all">Go Pro</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-display font-bold text-almost-black mb-4">Built for Everyone</h2>
            <p className="text-soft-gray text-lg max-w-2xl mx-auto">From weekend creators to enterprise marketers.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: <ShoppingBag />, label: "E-commerce" },
              { icon: <Palette />, label: "Designers" },
              { icon: <Megaphone />, label: "Marketers" },
              { icon: <Users />, label: "Creators" },
              { icon: <GraduationCap />, label: "Students" },
              { icon: <TrendingUp />, label: "Businesses" },
            ].map((user, i) => (
              <Link to="/tool" key={i} className="bg-white p-8 rounded-3xl border border-magenta/5 text-center flex flex-col items-center group hover:bg-magenta hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1">
                <div className="w-12 h-12 bg-magenta/10 text-magenta rounded-2xl flex items-center justify-center mb-4 group-hover:bg-white transition-colors">
                  {user.icon}
                </div>
                <span className="font-bold text-sm uppercase tracking-wider">{user.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Privacy */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow/10 text-yellow-600 rounded-full mb-8">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-3xl font-display font-bold mb-6">Your Privacy is Our Priority</h2>
          <p className="text-soft-gray text-lg leading-relaxed mb-8">
            We understand that your images are personal and business assets. All uploads are processed through encrypted channels and automatically deleted from our servers within 1 hour of processing. No permanent storage, no data sharing.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 text-almost-black font-semibold">
              <CheckCircle size={18} className="text-teal" />
              <span>SSL Encryption</span>
            </div>
            <div className="flex items-center gap-2 text-almost-black font-semibold">
              <CheckCircle size={18} className="text-teal" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-almost-black font-semibold">
              <CheckCircle size={18} className="text-teal" />
              <span>Auto-Deletion</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
