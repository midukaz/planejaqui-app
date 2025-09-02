import React from 'react';
import { Home } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Home className="w-12 h-12 text-white" />
            <h1 className="text-5xl font-bold">Planejaqui</h1>
          </div>
          <p className="text-emerald-100 text-lg">
            Organize sua lista de presentes com estilo
          </p>
        </div>
      </div>
    </header>
  );
}