import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ItemForm } from './components/ItemForm';
import { CategoryFilter } from './components/CategoryFilter';
import { ItemList } from './components/ItemList';
import { Item, Category } from './types';

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');

  // Carregar dados do localStorage
  useEffect(() => {
    const savedItems = localStorage.getItem('casaNova-items');
    if (savedItems) {
      try {
        const parsedItems = JSON.parse(savedItems).map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt)
        }));
        setItems(parsedItems);
      } catch (error) {
        console.error('Erro ao carregar dados salvos:', error);
      }
    }
  }, []);

  // Salvar dados no localStorage
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('casaNova-items', JSON.stringify(items));
    }
  }, [items]);

  const handleAddItem = (newItem: Omit<Item, 'id' | 'createdAt'>) => {
    const item: Item = {
      ...newItem,
      id: crypto.randomUUID(),
      createdAt: new Date()
    };
    setItems(prev => [item, ...prev]);
  };

  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  // Contar itens por categoria
  const itemCounts = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <ItemForm onAddItem={handleAddItem} />
        
        {items.length > 0 && (
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            itemCounts={itemCounts}
          />
        )}
        
        <ItemList
          items={items}
          selectedCategory={selectedCategory}
          onDeleteItem={handleDeleteItem}
        />
      </main>
    </div>
  );
}

export default App;