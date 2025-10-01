import React from 'react';
import { Filter } from 'lucide-react';
import { CATEGORIES, Category } from '../types';

interface CategoryFilterProps {
  selectedCategory: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
  itemCounts: Record<string, number>;
}

export function CategoryFilter({ selectedCategory, onCategoryChange, itemCounts }: CategoryFilterProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2.5">
        <div className="flex items-center gap-2 text-slate-700">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900">Filtrar por ambiente</h3>
            <p className="text-xs sm:text-sm text-slate-500">Visualize o que falta em cada cantinho da casa</p>
          </div>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs sm:text-sm font-medium text-slate-600">
          {Object.values(itemCounts).reduce((a, b) => a + b, 0)} itens mapeados
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange('all')}
          className={`group flex items-center gap-2 rounded-full border px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all ${
            selectedCategory === 'all'
              ? 'border-transparent bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 text-white shadow-lg'
              : 'border-slate-200 bg-white/70 text-slate-600 hover:border-emerald-200 hover:text-emerald-600'
          }`}
        >
          Todas
          <span className={`rounded-full px-2 py-0.5 text-[11px] sm:text-xs font-semibold ${
            selectedCategory === 'all'
              ? 'bg-white/25 text-white'
              : 'bg-slate-100 text-slate-600'
          }`}>
            {Object.values(itemCounts).reduce((a, b) => a + b, 0)}
          </span>
        </button>

        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`group flex items-center gap-2 rounded-full border px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all ${
              selectedCategory === category
                ? 'border-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 text-white shadow-lg'
                : 'border-slate-200 bg-white/70 text-slate-600 hover:border-emerald-200 hover:text-emerald-600'
            }`}
          >
            {category}
            <span className={`rounded-full px-2 py-0.5 text-[11px] sm:text-xs font-semibold ${
              selectedCategory === category
                ? 'bg-white/25 text-white'
                : 'bg-slate-100 text-slate-600'
            }`}>
              {itemCounts[category] || 0}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}