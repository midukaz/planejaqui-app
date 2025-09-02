import React from 'react';
import { ShoppingCart, Package } from 'lucide-react';
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
    <div>
      <div className="mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-6 h-6 text-emerald-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {selectedCategory === 'all' ? 'Todas as Categorias' : selectedCategory}
                </h3>
                <p className="text-gray-600">
                  {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'itens'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Valor Total</p>
              <p className="text-2xl font-bold text-emerald-600">
                {formatPrice(totalValue)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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