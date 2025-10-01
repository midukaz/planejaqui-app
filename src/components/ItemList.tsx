import React from 'react';
import { Package, Sparkles } from 'lucide-react';
import { Item, Category } from '../types';
import { ItemCard } from './ItemCard';

interface ItemListProps {
  items: Item[];
  selectedCategory: Category | 'all';
  onDeleteItem: (id: string) => void;
  onEditItem: (id: string) => void;
}

export function ItemList({ items, selectedCategory, onDeleteItem, onEditItem }: ItemListProps) {
  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  const totalValue = filteredItems.reduce((sum, item) => sum + item.price, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          Nenhuma pendência cadastrada
        </h3>
        <p className="text-gray-500">
          Comece adicionando os itens que você precisa para sua casa nova!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="glass-card rounded-3xl p-5 sm:p-6 flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-400 to-sky-400 text-white shadow-lg">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <p className="text-xs sm:text-sm uppercase tracking-wide text-slate-500">Categoria ativa</p>
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">
              {selectedCategory === 'all' ? 'Todas as categorias' : selectedCategory}
            </h3>
            <p className="text-sm sm:text-base text-slate-600">
              {filteredItems.length} {filteredItems.length === 1 ? 'item registrado' : 'itens registrados'} neste grupo
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white/70 px-4 sm:px-5 py-2.5 sm:py-3 text-right">
          <p className="text-xs sm:text-sm text-slate-500">Total estimado</p>
          <p className="text-2xl sm:text-3xl font-semibold text-emerald-600">{formatPrice(totalValue)}</p>
        </div>
      </div>

      <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onDelete={onDeleteItem}
            onEdit={onEditItem}
          />
        ))}
      </div>
    </div>
  );
}