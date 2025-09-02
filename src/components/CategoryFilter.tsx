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
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-800">Filtrar por Categoria</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === 'all'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Todas ({Object.values(itemCounts).reduce((a, b) => a + b, 0)})
        </button>
        
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category} ({itemCounts[category] || 0})
          </button>
        ))}
      </div>
    </div>
  );
}