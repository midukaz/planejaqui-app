import React, { useState, useEffect } from 'react';
import { Gift, Sparkles } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-white/30 backdrop-blur-xl border-b border-white/60 shadow-md" />
      <div className={`relative transition-all duration-300 ${
        isScrolled ? 'py-3' : 'py-8'
      }`}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center text-center gap-3">
            {/* <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-brand-700 text-xs sm:text-sm font-semibold shadow-sm">
              <Sparkles className="w-2.5 h-2.5" />
              {isScrolled ? 'Seu enxoval em ordem' : 'Seu enxoval começa aqui'}
            </span> */}
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500 shadow-lg">
                <Gift className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h3 className={`font-semibold tracking-tight text-slate-900 ${
                  isScrolled ? 'text-2xl sm:text-3xl' : 'text-2xl sm:text-3xl'
                }`}>
                  Planejaqui <span className="text-brand-600">Home</span>
                </h3>
                {/* {!isScrolled && (
                  <p className="text-slate-600 text-sm sm:text-base max-w-sm">
                    Centralize suas ideias, organize prioridades e acompanhe tudo que falta para deixar seu lar perfeito.
                  </p>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}