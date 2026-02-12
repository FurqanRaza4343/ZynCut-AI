
import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, Download, Trash2, Scissors, Loader2, Image as ImageIcon, 
  CheckCircle, AlertCircle, Sparkles, History, Clock, ArrowRight, Search, X,
  FileImage, MousePointer2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../App';
import { Link, useSearchParams } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";

const ToolPage: React.FC = () => {
  const { 
    isLoggedIn, user, usageCount, history, 
    incrementUsage, addToHistory, setShowAuthModal 
  } = useApp();

  const [searchParams] = useSearchParams();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [historySearch, setHistorySearch] = useState('');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isLimitReached = user?.plan === 'free' && usageCount >= 2;

  useEffect(() => {
    if (searchParams.get('demo') === 'true' && !preview && !isProcessing) {
      if (!isLoggedIn) {
        setShowAuthModal(true);
      } else {
        const demoImg = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop";
        setPreview(demoImg);
      }
    }
  }, [searchParams, isLoggedIn]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    const selected = e.target.files?.[0];
    if (selected) {
      processSelection(selected);
    }
  };

  const processSelection = (selected: File) => {
    setFile(selected);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selected);
    setResult(null);
    setError(null);
  };

  const applyChromaKey = (base64: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return resolve(base64);

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Iterate through pixels and remove green
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Target bright neon green (#00FF00)
          // Sensitivity thresholding: Green must be dominant
          if (g > 100 && g > r * 1.4 && g > b * 1.4) {
            data[i + 3] = 0; // Set alpha to 0 (fully transparent)
          }
        }

        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = () => resolve(base64);
      img.src = base64;
    });
  };

  const removeBackground = async () => {
    if (!preview) return;
    if (isLimitReached) return;
    
    setIsProcessing(true);
    setProgress(10);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      // Extract base64 data from the preview URL
      const base64Data = preview.split(',')[1];
      const mimeType = preview.split(';')[0].split(':')[1];

      setProgress(30);

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: mimeType,
              },
            },
            {
              text: "Strict Instructions: Identify the main subject of this image. Remove the entire background and replace it with a solid, flat, neon green color (#00FF00). The output must only be the subject and the solid green background. Do not add shadows, lighting, or borders.",
            },
          ],
        },
      });

      setProgress(70);

      let aiGeneratedBase64 = '';
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            aiGeneratedBase64 = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      if (!aiGeneratedBase64) {
        throw new Error("AI failed to generate a result. Please try another image.");
      }

      setProgress(85);

      // Apply client-side transparency filter
      const transparentResult = await applyChromaKey(aiGeneratedBase64);
      
      setProgress(100);
      setResult(transparentResult);
      
      incrementUsage();
      addToHistory({
        id: Math.random().toString(36).substr(2, 9),
        original: preview,
        result: transparentResult,
        timestamp: Date.now()
      });

    } catch (err: any) {
      console.error("BG Removal Error:", err);
      setError(err.message || "Failed to process image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setIsProcessing(false);
    setProgress(0);
    setError(null);
  };

  const filteredHistory = history.filter(item => {
    const filename = `Asset_${item.id.slice(0, 4)}.png`.toLowerCase();
    const dateStr = new Date(item.timestamp).toLocaleDateString().toLowerCase();
    const term = historySearch.toLowerCase();
    return filename.includes(term) || dateStr.includes(term);
  });

  return (
    <div className="bg-cream min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-display font-bold mb-4"
          >
            AI Background <span className="text-magenta">Remover</span>
          </motion.h1>
          <p className="text-soft-gray text-lg">Instant pro-grade background removal powered by Gemini AI.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-magenta/5 min-h-[500px] flex flex-col relative">
              <AnimatePresence mode="wait">
                {!preview ? (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    className="p-10 flex-grow flex flex-col items-center justify-center"
                  >
                    <div 
                      onClick={() => isLoggedIn ? fileInputRef.current?.click() : setShowAuthModal(true)}
                      className={`group relative cursor-pointer border-4 border-dashed rounded-[48px] p-20 w-full transition-all duration-500 flex flex-col items-center justify-center bg-cream/30 ${
                        isLoggedIn 
                          ? 'border-magenta/20 hover:border-magenta hover:bg-magenta/[0.03]' 
                          : 'border-soft-gray/20 opacity-80'
                      }`}
                    >
                      <div className="absolute top-8 left-8 w-8 h-8 border-t-4 border-l-4 border-magenta/20 rounded-tl-2xl group-hover:border-magenta group-hover:scale-110 transition-all duration-500"></div>
                      <div className="absolute top-8 right-8 w-8 h-8 border-t-4 border-r-4 border-magenta/20 rounded-tr-2xl group-hover:border-magenta group-hover:scale-110 transition-all duration-500"></div>
                      <div className="absolute bottom-8 left-8 w-8 h-8 border-b-4 border-l-4 border-magenta/20 rounded-bl-2xl group-hover:border-magenta group-hover:scale-110 transition-all duration-500"></div>
                      <div className="absolute bottom-8 right-8 w-8 h-8 border-b-4 border-r-4 border-magenta/20 rounded-br-2xl group-hover:border-magenta group-hover:scale-110 transition-all duration-500"></div>

                      <div className="relative mb-8">
                        <div className="absolute inset-0 bg-magenta/20 rounded-full blur-2xl group-hover:blur-3xl transition-all scale-125"></div>
                        <div className="relative w-28 h-28 bg-magenta text-white rounded-[32px] flex items-center justify-center shadow-2xl shadow-magenta/40 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                          <Upload size={48} strokeWidth={2.5} />
                        </div>
                      </div>

                      <div className="text-center max-w-sm">
                        <h3 className="text-3xl font-display font-bold mb-3 text-almost-black group-hover:text-magenta transition-colors">
                          Drop your image here or click to browse
                        </h3>
                        <p className="text-soft-gray font-medium mb-10 leading-relaxed">
                          Supported: JPG, PNG, WebP (Max 10MB)
                        </p>
                      </div>
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isLoggedIn) fileInputRef.current?.click();
                          else setShowAuthModal(true);
                        }}
                        className="bg-magenta text-white px-12 py-5 rounded-2xl font-bold text-xl hover:bg-magenta-hover transition-all shadow-xl shadow-magenta/30 active:scale-95 flex items-center gap-3"
                      >
                        <FileImage size={24} />
                        Select Photo
                      </button>
                      
                      <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8 flex flex-col flex-grow"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-soft-gray">Original</h4>
                        <div className="relative rounded-3xl overflow-hidden aspect-square bg-cream flex items-center justify-center shadow-inner border border-magenta/5">
                          <img src={preview} alt="Original" className="w-full h-full object-contain" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-soft-gray">Result</h4>
                          {result && <span className="text-[10px] bg-teal/10 text-teal-600 px-2 py-0.5 rounded font-bold uppercase">Transparent PNG</span>}
                        </div>
                        <div className={`relative rounded-3xl overflow-hidden aspect-square flex items-center justify-center shadow-inner border-2 border-magenta/10 ${result ? 'checkboard' : 'bg-white'}`}>
                          {isProcessing ? (
                            <div className="text-center p-8 z-10">
                              <Loader2 className="w-16 h-16 text-magenta animate-spin mx-auto mb-6" />
                              <p className="text-almost-black font-bold text-xl mb-2">Analyzing Subject...</p>
                              <p className="text-soft-gray text-sm mb-6">Gemini AI is isolating the foreground</p>
                              <div className="w-64 h-2.5 bg-cream rounded-full mx-auto overflow-hidden border border-magenta/5">
                                <motion.div 
                                  className="h-full bg-magenta"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${progress}%` }}
                                />
                              </div>
                            </div>
                          ) : result ? (
                            <motion.img 
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              src={result} 
                              alt="Processed" 
                              className="w-full h-full object-contain relative z-10 drop-shadow-2xl" 
                            />
                          ) : (
                            <div className="text-center text-soft-gray">
                              <div className="w-16 h-16 rounded-full bg-magenta/5 flex items-center justify-center mx-auto mb-4">
                                <Sparkles className="text-magenta" size={28} />
                              </div>
                              <p className="font-medium">Ready to process</p>
                            </div>
                          )}
                          {error && (
                            <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center p-8 text-center z-20">
                              <AlertCircle size={48} className="text-coral mb-4" />
                              <p className="text-coral font-bold mb-4">{error}</p>
                              <button onClick={reset} className="text-magenta font-bold hover:underline">Try another image</button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 bg-cream/50 p-6 rounded-[32px] border border-magenta/5">
                      <div className="flex items-center gap-4">
                        <button onClick={reset} className="p-4 rounded-2xl bg-white text-almost-black hover:text-coral border border-magenta/10 transition-all shadow-sm">
                          <Trash2 size={24} />
                        </button>
                        {isLimitReached && (
                          <div className="flex items-center gap-2 text-coral bg-coral/5 px-4 py-2 rounded-xl">
                            <AlertCircle size={18} />
                            <span className="text-xs font-bold uppercase">Limit Reached</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        {!result ? (
                          <button
                            onClick={removeBackground}
                            disabled={isProcessing || isLimitReached}
                            className={`flex items-center justify-center gap-2 px-12 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl ${
                              isLimitReached 
                                ? 'bg-soft-gray text-white cursor-not-allowed opacity-50' 
                                : 'bg-magenta text-white hover:bg-magenta-hover shadow-magenta/20 active:scale-95'
                            }`}
                          >
                            {isProcessing ? <Loader2 size={20} className="animate-spin" /> : <Scissors size={20} />}
                            {isProcessing ? 'AI Working...' : 'Remove Background'}
                          </button>
                        ) : (
                          <a
                            href={result}
                            download="zyn-removed-bg.png"
                            className="flex items-center justify-center gap-2 bg-teal text-white px-12 py-4 rounded-2xl font-bold text-lg hover:bg-teal-hover transition-all shadow-xl shadow-teal/20 active:scale-95"
                          >
                            <Download size={20} />
                            Download Transparent PNG
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {isLoggedIn && user?.plan === 'free' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-8 p-6 rounded-[32px] border flex flex-col md:flex-row items-center justify-between gap-6 ${
                  isLimitReached ? 'bg-coral/5 border-coral/20' : 'bg-yellow/5 border-yellow/20'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${isLimitReached ? 'bg-coral text-white' : 'bg-yellow text-almost-black'}`}>
                    {isLimitReached ? <AlertCircle size={24} /> : <Sparkles size={24} />}
                  </div>
                  <div>
                    <h4 className="font-bold text-almost-black">
                      {isLimitReached ? "Usage Limit Reached" : `Free Removals: ${2 - usageCount}/2`}
                    </h4>
                    <p className="text-sm text-soft-gray">
                      {isLimitReached ? "Upgrade to Pro for unlimited HD removals." : "Daily resets every 24 hours."}
                    </p>
                  </div>
                </div>
                <Link to="/pricing" className="px-8 py-3 bg-almost-black text-white rounded-xl font-bold text-sm hover:bg-magenta transition-all">
                  Upgrade to Pro
                </Link>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-[40px] shadow-xl border border-magenta/5 p-6 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-magenta/10 text-magenta rounded-lg">
                  <History size={20} />
                </div>
                <h3 className="font-bold text-xl">History</h3>
              </div>

              {isLoggedIn && history.length > 0 && (
                <div className="relative mb-6">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-soft-gray" />
                  <input 
                    type="text" 
                    placeholder="Search history..." 
                    value={historySearch}
                    onChange={(e) => setHistorySearch(e.target.value)}
                    className="w-full bg-cream rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-magenta/20 transition-all"
                  />
                </div>
              )}

              <div className="flex-grow overflow-hidden">
                {!isLoggedIn ? (
                  <div className="text-center py-12">
                    <Clock className="mx-auto text-soft-gray/30 mb-4" size={48} />
                    <p className="text-soft-gray text-xs">Sign in to save your history.</p>
                  </div>
                ) : history.length === 0 ? (
                  <div className="text-center py-12">
                    <ImageIcon className="mx-auto text-soft-gray/30 mb-4" size={48} />
                    <p className="text-soft-gray text-xs">No images processed yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {filteredHistory.map((item) => (
                      <motion.div 
                        key={item.id}
                        className="group cursor-pointer border border-transparent hover:border-magenta/10 rounded-2xl p-2 transition-all"
                        onClick={() => {
                          setPreview(item.original);
                          setResult(item.result);
                        }}
                      >
                        <div className="relative rounded-xl overflow-hidden aspect-square bg-cream checkboard mb-1">
                          <img src={item.result} className="w-full h-full object-contain" />
                        </div>
                        <p className="text-[10px] font-bold text-almost-black truncate">Asset_{item.id.slice(0,4)}.png</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolPage;
