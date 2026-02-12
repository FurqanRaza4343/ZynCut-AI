
import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-magenta rounded-xl flex items-center justify-center">
                <Scissors className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-display font-bold">
                ZynCut<span className="text-magenta">AI</span>
              </span>
            </Link>
            <p className="text-soft-gray mb-8">
              Revolutionizing the way you edit images. Remove backgrounds in seconds with professional-grade AI technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-magenta transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-magenta transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-magenta transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-magenta transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-soft-gray">
              <li><Link to="/tool" className="hover:text-magenta transition-colors">Background Remover</Link></li>
              <li><Link to="/pricing" className="hover:text-magenta transition-colors">Pricing</Link></li>
              <li><Link to="/dashboard" className="hover:text-magenta transition-colors">Dashboard</Link></li>
              <li><Link to="/tool?demo=true" className="hover:text-magenta transition-colors">Interactive Demo</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-soft-gray">
              <li><Link to="/" className="hover:text-magenta transition-colors">About Us</Link></li>
              <li><Link to="/" className="hover:text-magenta transition-colors">Contact</Link></li>
              <li><Link to="/" className="hover:text-magenta transition-colors">Blog</Link></li>
              <li><Link to="/" className="hover:text-magenta transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-soft-gray">
              <li><Link to="/" className="hover:text-magenta transition-colors">Help Center</Link></li>
              <li><Link to="/" className="hover:text-magenta transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-magenta transition-colors">Terms of Service</Link></li>
              <li><Link to="/pricing" className="hover:text-magenta transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-soft-gray text-sm">
          <p>© 2024 ZynCut AI. All rights reserved.</p>
          <div className="flex space-x-6">
            <p>Made with ❤️ for Creators</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
