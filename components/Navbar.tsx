
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Scissors, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useApp } from '../App';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const { isLoggedIn, user, logout, setShowAuthModal } = useApp();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Remove BG', path: '/tool' },
    { name: 'Pricing', path: '/pricing' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-cream/80 backdrop-blur-md border-b border-magenta/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-magenta rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
                <Scissors className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-display font-bold text-almost-black">
                ZynCut<span className="text-magenta">AI</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold tracking-tight transition-colors hover:text-magenta ${
                  isActive(link.path) ? 'text-magenta' : 'text-almost-black'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {isLoggedIn ? (
              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-3 bg-white border border-magenta/10 pl-4 pr-2 py-1.5 rounded-full hover:border-magenta transition-all group"
                >
                  <span className="text-sm font-bold">{user?.name}</span>
                  <div className="w-8 h-8 bg-magenta text-white rounded-full flex items-center justify-center shadow-md">
                    <User size={16} />
                  </div>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-magenta/5 p-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b border-magenta/5 mb-2">
                      <p className="text-xs text-soft-gray font-bold uppercase tracking-widest">Signed in as</p>
                      <p className="text-sm font-bold truncate">{user?.email}</p>
                      <span className="inline-block mt-2 px-2 py-0.5 bg-magenta/10 text-magenta text-[10px] font-black rounded uppercase">
                        {user?.plan} Plan
                      </span>
                    </div>
                    <Link 
                      to="/dashboard" 
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-almost-black hover:bg-magenta/5 hover:text-magenta rounded-xl transition-all"
                    >
                      <LayoutDashboard size={18} />
                      My Dashboard
                    </Link>
                    <button 
                      onClick={() => {
                        logout();
                        setShowProfileMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-coral hover:bg-coral/5 rounded-xl transition-all"
                    >
                      <LogOut size={18} />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-magenta text-white px-8 py-3 rounded-full font-bold hover:bg-magenta-hover transition-all shadow-lg shadow-magenta/20 active:scale-95"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-almost-black hover:text-magenta transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-cream border-b border-magenta/10 py-6 px-4 space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block text-xl font-bold ${
                isActive(link.path) ? 'text-magenta' : 'text-almost-black'
              }`}
            >
              {link.name}
            </Link>
          ))}
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-white border border-magenta/10 text-almost-black py-4 rounded-xl font-bold"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="block w-full text-center bg-coral/10 text-coral py-4 rounded-xl font-bold"
              >
                Log Out
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setShowAuthModal(true);
                setIsOpen(false);
              }}
              className="block w-full text-center bg-magenta text-white py-4 rounded-xl font-bold"
            >
              Get Started
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
