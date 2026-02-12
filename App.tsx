
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ToolPage from './pages/ToolPage';
import DashboardPage from './pages/DashboardPage';
import PricingPage from './pages/PricingPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

// Types for our global state
export interface UserHistoryItem {
  id: string;
  original: string;
  result: string;
  timestamp: number;
}

interface AppContextType {
  isLoggedIn: boolean;
  user: { name: string; email: string; plan: 'free' | 'pro' | 'business' } | null;
  usageCount: number;
  history: UserHistoryItem[];
  login: () => void;
  logout: () => void;
  incrementUsage: () => void;
  addToHistory: (item: UserHistoryItem) => void;
  updatePlan: (newPlan: 'free' | 'pro' | 'business') => void;
  showAuthModal: boolean;
  setShowAuthModal: (val: boolean) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<AppContextType['user']>(null);
  const [usageCount, setUsageCount] = useState(0);
  const [history, setHistory] = useState<UserHistoryItem[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
    setUser({ name: 'Zyn User', email: 'hello@zyn.ai', plan: 'free' });
    setShowAuthModal(false);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setHistory([]);
    setUsageCount(0);
  };

  const updatePlan = (newPlan: 'free' | 'pro' | 'business') => {
    if (user) {
      setUser({ ...user, plan: newPlan });
    }
  };

  const incrementUsage = () => setUsageCount(prev => prev + 1);
  const addToHistory = (item: UserHistoryItem) => setHistory(prev => [item, ...prev]);

  return (
    <AppContext.Provider value={{ 
      isLoggedIn, user, usageCount, history, 
      login, logout, incrementUsage, addToHistory, updatePlan,
      showAuthModal, setShowAuthModal
    }}>
      <Router>
        <div className="flex flex-col min-h-screen bg-cream font-sans">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/tool" element={<ToolPage />} />
              <Route path="/dashboard" element={isLoggedIn ? <DashboardPage /> : <Navigate to="/" />} />
              <Route path="/pricing" element={<PricingPage />} />
            </Routes>
          </main>
          <Footer />
          <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        </div>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
