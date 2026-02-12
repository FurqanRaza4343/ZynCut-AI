
import React, { useState } from 'react';
import { 
  Check, CreditCard, Landmark, ArrowRight, Zap, Shield, 
  HelpCircle, Star, X, Smartphone, Upload, Loader2, CheckCircle2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../App';

interface Plan {
  name: string;
  price: string;
  period: string;
  desc: string;
  features: string[];
  cta: string;
  popular: boolean;
  color: string;
  type: 'free' | 'pro' | 'business';
}

const PricingPage: React.FC = () => {
  const { isLoggedIn, user, setShowAuthModal, updatePlan } = useApp();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'easypaisa' | 'bank'>('easypaisa');
  const [accountId, setAccountId] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const plans: Plan[] = [
    {
      name: "Free",
      price: "0",
      period: "forever",
      desc: "Ideal for trying out the AI engine.",
      features: ["2 images per day", "Standard AI processing", "Persistent history", "720p resolution", "Email support"],
      cta: "Current Plan",
      popular: false,
      color: "bg-teal",
      type: 'free'
    },
    {
      name: "Pro",
      price: "19",
      period: "per month",
      desc: "For serious creators & influencers.",
      features: ["Unlimited images", "Priority AI processing", "HD & 4K resolution", "Full history access", "Batch processing", "Priority support"],
      cta: "Go Professional",
      popular: true,
      color: "bg-magenta",
      type: 'pro'
    },
    {
      name: "Business",
      price: "49",
      period: "per month",
      desc: "Scale your agency or brand workflow.",
      features: ["Everything in Pro", "Full API access", "Webhooks (n8n ready)", "Bulk download", "Team workspaces", "Dedicated manager"],
      cta: "Scale Now",
      popular: false,
      color: "bg-almost-black",
      type: 'business'
    }
  ];

  const handlePlanSelection = (plan: Plan) => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    if (plan.type === 'free') return;
    setSelectedPlan(plan);
    setIsSuccess(false);
  };

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshot(file);
      const reader = new FileReader();
      reader.onloadend = () => setScreenshotPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountId || !screenshot) return;

    setIsSubmitting(true);
    // Simulate payment verification process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Simulate activation
    setTimeout(() => {
      if (selectedPlan) {
        updatePlan(selectedPlan.type as any);
      }
      setSelectedPlan(null);
      setScreenshot(null);
      setScreenshotPreview(null);
      setAccountId('');
    }, 2500);
  };

  return (
    <div className="bg-cream min-h-screen py-24 px-4 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-magenta/5 rounded-full blur-[120px] -mr-96 -mt-96 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-magenta/10 text-magenta px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6">
              Pricing Plans
            </span>
            <h1 className="text-5xl lg:text-7xl font-display font-bold text-almost-black mb-8">Unlock Your <span className="gradient-text">Potential</span></h1>
            <p className="text-xl text-soft-gray max-w-2xl mx-auto leading-relaxed">
              Start for free or upgrade to Pro for unlimited creative freedom and HD exports.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative bg-white rounded-[40px] p-10 border-2 transition-all flex flex-col h-full ${
                plan.popular ? 'border-magenta shadow-2xl shadow-magenta/10 scale-105 z-20' : 'border-magenta/5 shadow-xl hover:border-magenta/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-magenta text-white px-8 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-lg shadow-magenta/20">
                  <Star size={14} fill="white" />
                  Most Recommended
                </div>
              )}
              
              <div className="mb-10">
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-5xl font-display font-black text-almost-black">${plan.price}</span>
                  <span className="text-soft-gray font-bold uppercase text-xs tracking-widest">/{plan.period}</span>
                </div>
                <p className="text-soft-gray text-sm font-medium leading-relaxed">{plan.desc}</p>
              </div>

              <div className="h-px bg-magenta/5 w-full mb-10"></div>

              <ul className="space-y-5 mb-12 flex-grow">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-center gap-4 text-sm font-bold text-almost-black">
                    <div className={`w-6 h-6 ${plan.color}/10 ${plan.color.replace('bg-', 'text-')} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Check size={14} strokeWidth={4} />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handlePlanSelection(plan)}
                className={`w-full py-5 rounded-2xl font-black uppercase text-sm tracking-widest transition-all ${
                  user?.plan === plan.type
                  ? 'bg-cream text-soft-gray cursor-default'
                  : plan.popular 
                  ? 'bg-magenta text-white hover:bg-magenta-hover shadow-xl shadow-magenta/20 active:scale-95' 
                  : 'bg-cream text-almost-black hover:bg-magenta hover:text-white border border-magenta/10'
                }`}
              >
                {user?.plan === plan.type ? "Active Now" : plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
            >
              <button onClick={() => setSelectedPlan(null)} className="absolute top-8 right-8 p-2 text-soft-gray hover:text-magenta transition-colors z-10">
                <X size={28} />
              </button>

              <div className="overflow-y-auto p-8 lg:p-12">
                {isSuccess ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-teal/10 text-teal rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                      <CheckCircle2 size={64} />
                    </div>
                    <h2 className="text-4xl font-display font-bold text-almost-black mb-4">Payment Submitted!</h2>
                    <p className="text-soft-gray text-lg mb-8">
                      We've received your proof. Your account will be upgraded to <strong>{selectedPlan.name}</strong> instantly for this demo.
                    </p>
                    <div className="inline-block px-6 py-3 bg-teal/5 text-teal text-sm font-bold rounded-full">
                      Redirecting to Dashboard...
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-10 text-center">
                      <h2 className="text-3xl font-display font-bold text-almost-black mb-2">Upgrade to {selectedPlan.name}</h2>
                      <p className="text-soft-gray">Follow the steps below to complete your payment.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-10">
                      <button 
                        onClick={() => setPaymentMethod('easypaisa')}
                        className={`flex items-center justify-center gap-3 p-6 rounded-3xl border-2 transition-all ${
                          paymentMethod === 'easypaisa' ? 'border-magenta bg-magenta/5 text-magenta' : 'border-magenta/5 bg-cream hover:border-magenta/20'
                        }`}
                      >
                        <Smartphone size={24} />
                        <span className="font-bold">EasyPaisa</span>
                      </button>
                      <button 
                        onClick={() => setPaymentMethod('bank')}
                        className={`flex items-center justify-center gap-3 p-6 rounded-3xl border-2 transition-all ${
                          paymentMethod === 'bank' ? 'border-teal bg-teal/5 text-teal' : 'border-magenta/5 bg-cream hover:border-teal/20'
                        }`}
                      >
                        <Landmark size={24} />
                        <span className="font-bold">Bank Transfer</span>
                      </button>
                    </div>

                    <div className="bg-cream rounded-[32px] p-8 mb-10 border border-magenta/10">
                      <h4 className="font-bold text-almost-black mb-4 flex items-center gap-2">
                        <Shield className="text-magenta" size={20} />
                        Payment Details
                      </h4>
                      <div className="space-y-4">
                        {paymentMethod === 'easypaisa' ? (
                          <div className="flex justify-between items-center p-4 bg-white rounded-2xl border border-magenta/5">
                            <div>
                              <p className="text-xs font-bold text-soft-gray uppercase tracking-widest">Account Name</p>
                              <p className="font-bold text-lg">ZynCut AI Operations</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs font-bold text-soft-gray uppercase tracking-widest">Mobile Number</p>
                              <p className="font-bold text-lg text-magenta">0312-3456789</p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="p-4 bg-white rounded-2xl border border-teal/5">
                              <p className="text-xs font-bold text-soft-gray uppercase tracking-widest">Bank Name</p>
                              <p className="font-bold">Meezan Bank Ltd.</p>
                            </div>
                            <div className="p-4 bg-white rounded-2xl border border-teal/5">
                              <p className="text-xs font-bold text-soft-gray uppercase tracking-widest">Account Title</p>
                              <p className="font-bold">ZynCut AI Private Ltd.</p>
                            </div>
                            <div className="p-4 bg-white rounded-2xl border border-teal/5 flex justify-between items-center">
                              <div>
                                <p className="text-xs font-bold text-soft-gray uppercase tracking-widest">IBAN / Account No</p>
                                <p className="font-bold text-teal">PK00MEZN01234567890</p>
                              </div>
                              <button className="text-[10px] font-black uppercase text-teal hover:underline">Copy</button>
                            </div>
                          </div>
                        )}
                        <p className="text-xs text-soft-gray italic text-center">
                          Total Payable: <span className="text-almost-black font-bold font-display">${selectedPlan.price}</span> (~PKR {(parseInt(selectedPlan.price)*280).toLocaleString()})
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handlePaymentSubmit} className="space-y-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-soft-gray mb-3 ml-2">
                          Your {paymentMethod === 'easypaisa' ? 'EasyPaisa Number' : 'Bank Account No'}
                        </label>
                        <input 
                          required
                          type="text" 
                          placeholder={paymentMethod === 'easypaisa' ? "03XX-XXXXXXX" : "Account Holder No"} 
                          value={accountId}
                          onChange={(e) => setAccountId(e.target.value)}
                          className="w-full bg-cream border border-magenta/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-magenta transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-soft-gray mb-3 ml-2">
                          Payment Screenshot (Required)
                        </label>
                        <div className="relative">
                          <input 
                            required
                            type="file" 
                            accept="image/*"
                            onChange={handleScreenshotChange}
                            className="hidden" 
                            id="payment-screenshot"
                          />
                          <label 
                            htmlFor="payment-screenshot"
                            className={`w-full h-48 border-2 border-dashed rounded-[32px] flex flex-col items-center justify-center cursor-pointer transition-all ${
                              screenshotPreview ? 'border-teal bg-teal/[0.02]' : 'border-magenta/20 bg-cream hover:border-magenta hover:bg-magenta/[0.02]'
                            }`}
                          >
                            {screenshotPreview ? (
                              <div className="relative w-full h-full p-4">
                                <img src={screenshotPreview} className="w-full h-full object-contain rounded-2xl" />
                                <div className="absolute top-4 right-4 bg-teal text-white p-2 rounded-full shadow-lg">
                                  <Check size={16} strokeWidth={4} />
                                </div>
                              </div>
                            ) : (
                              <>
                                <Upload className="text-magenta mb-4" size={32} />
                                <p className="font-bold text-sm text-almost-black">Upload Transaction Receipt</p>
                                <p className="text-xs text-soft-gray mt-1">PNG, JPG or JPEG supported</p>
                              </>
                            )}
                          </label>
                        </div>
                      </div>

                      <button 
                        type="submit"
                        disabled={isSubmitting || !accountId || !screenshot}
                        className={`w-full py-5 rounded-[24px] font-black uppercase text-sm tracking-widest transition-all shadow-xl flex items-center justify-center gap-3 ${
                          isSubmitting || !accountId || !screenshot
                          ? 'bg-soft-gray text-white cursor-not-allowed'
                          : 'bg-magenta text-white hover:bg-magenta-hover shadow-magenta/20 active:scale-95'
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={20} className="animate-spin" />
                            Verifying Payment...
                          </>
                        ) : (
                          <>
                            <CreditCard size={20} />
                            Submit & Activate Pro
                          </>
                        )}
                      </button>
                      <p className="text-[10px] text-center text-soft-gray uppercase tracking-widest">Secure local checkout by ZynCut AI</p>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PricingPage;
