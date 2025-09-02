import React from 'react';
import { Home, Heart } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            <Home className="w-8 h-8" />
            <Heart className="w-6 h-6 text-pink-200" />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">Chá de Casa Nova</h1>
            <p className="text-emerald-100 text-lg">
              Organize sua lista de presentes com estilo
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}