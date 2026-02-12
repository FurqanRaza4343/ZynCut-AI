
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Scissors, Mail, Lock, Github, Chrome, AlertCircle } from 'lucide-react';
import { useApp } from '../App';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login } = useApp();
  const [isLoginView, setIsLoginView] = useState(true);
  
  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!isLoginView && !fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      login();
      onClose();
    }
  };

  const handleSocialLogin = () => {
    // Simulate social login success
    login();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden relative"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-soft-gray hover:text-magenta transition-colors z-10"
          >
            <X size={24} />
          </button>

          <div className="p-10 text-center">
            <div className="w-16 h-16 bg-magenta rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-magenta/20">
              <Scissors className="text-white w-8 h-8" />
            </div>
            <h2 className="text-3xl font-display font-bold text-almost-black mb-2">
              {isLoginView ? 'Welcome Back!' : 'Create Account'}
            </h2>
            <p className="text-soft-gray mb-8">
              Join ZynCut AI to remove backgrounds and manage your history.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 mb-8 text-left">
              {!isLoginView && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-soft-gray mb-2 ml-1">Full Name</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full bg-cream border ${errors.fullName ? 'border-coral' : 'border-magenta/10'} rounded-xl px-4 py-3 focus:outline-none focus:border-magenta transition-colors`} 
                    />
                    {errors.fullName && (
                      <div className="flex items-center gap-1 mt-1 text-coral text-[10px] font-bold uppercase tracking-tighter">
                        <AlertCircle size={10} />
                        {errors.fullName}
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-soft-gray mb-2 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.email ? 'text-coral' : 'text-soft-gray'}`} size={18} />
                  <input 
                    type="email" 
                    placeholder="you@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full bg-cream border ${errors.email ? 'border-coral' : 'border-magenta/10'} rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-magenta transition-colors`} 
                  />
                  {errors.email && (
                    <div className="flex items-center gap-1 mt-1 text-coral text-[10px] font-bold uppercase tracking-tighter">
                      <AlertCircle size={10} />
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-soft-gray mb-2 ml-1">Password</label>
                <div className="relative">
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.password ? 'text-coral' : 'text-soft-gray'}`} size={18} />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full bg-cream border ${errors.password ? 'border-coral' : 'border-magenta/10'} rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-magenta transition-colors`} 
                  />
                  {errors.password && (
                    <div className="flex items-center gap-1 mt-1 text-coral text-[10px] font-bold uppercase tracking-tighter">
                      <AlertCircle size={10} />
                      {errors.password}
                    </div>
                  )}
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-magenta text-white py-4 rounded-xl font-bold text-lg hover:bg-magenta-hover transition-all shadow-lg shadow-magenta/20 active:scale-95"
              >
                {isLoginView ? 'Sign In' : 'Create Free Account'}
              </button>
            </form>

            <div className="mt-6 flex items-center gap-4 text-soft-gray">
              <div className="h-px bg-magenta/10 flex-1"></div>
              <span className="text-xs font-bold uppercase">or continue with</span>
              <div className="h-px bg-magenta/10 flex-1"></div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={handleSocialLogin}
                className="flex items-center justify-center gap-2 bg-cream py-3 rounded-xl border border-magenta/10 hover:border-magenta transition-all active:scale-95"
              >
                <Chrome size={18} />
                <span className="text-sm font-bold">Google</span>
              </button>
              <button 
                type="button"
                onClick={handleSocialLogin}
                className="flex items-center justify-center gap-2 bg-cream py-3 rounded-xl border border-magenta/10 hover:border-magenta transition-all active:scale-95"
              >
                <Github size={18} />
                <span className="text-sm font-bold">GitHub</span>
              </button>
            </div>

            <p className="mt-8 text-soft-gray text-sm">
              {isLoginView ? "Don't have an account?" : "Already have an account?"}{' '}
              <button 
                type="button"
                onClick={() => {
                  setIsLoginView(!isLoginView);
                  setErrors({});
                }}
                className="text-magenta font-bold hover:underline"
              >
                {isLoginView ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
