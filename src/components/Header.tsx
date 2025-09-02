import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg transition-all duration-300">
      <div className={`container mx-auto px-6 transition-all duration-300 ${
        isScrolled ? 'py-4' : 'py-8'
      }`}>
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Home className={`text-white transition-all duration-300 ${
              isScrolled ? 'w-8 h-8' : 'w-12 h-12'
            }`} />
            <h1 className={`font-bold transition-all duration-300 ${
              isScrolled ? 'text-3xl' : 'text-5xl'
            }`}>
              Planejaqui
            </h1>
          </div>
          {!isScrolled && (
            <p className="text-emerald-100 text-lg transition-opacity duration-300">
              Organize sua lista de presentes com estilo
            </p>
          )}
        </div>
      </div>
    </header>
  );
}