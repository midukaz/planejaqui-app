import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ItemForm } from './components/ItemForm';
import { CategoryFilter } from './components/CategoryFilter';
import { ItemList } from './components/ItemList';
import { Item, Category } from './types';
import initialData from '../data.json';

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  // Carregar dados do data.json
  useEffect(() => {
    try {
      const parsedItems = (initialData as any[]).map((item: any) => ({
        ...item,
        createdAt: new Date(item.createdAt)
      }));
      setItems(parsedItems);
    } catch (error) {
      console.error('Erro ao carregar dados do JSON:', error);
    }
  }, []);

  // Salvar dados no data.json
  const saveToDataJson = async (data: Item[]) => {
    try {
      const response = await fetch('/api/save-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        console.log('✅ Dados salvos no data.json!');
      }
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  };

  // Salvar automaticamente quando houver mudanças
  useEffect(() => {
    if (items.length > 0) {
      saveToDataJson(items);
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

  const handleEditItem = (id: string) => {
    const itemToEdit = items.find(item => item.id === id);
    if (itemToEdit) {
      setEditingItem(itemToEdit);
    }
  };

  const handleUpdateItem = (updatedItem: Omit<Item, 'id' | 'createdAt'>) => {
    if (editingItem) {
      const updated: Item = {
        ...editingItem,
        ...updatedItem
      };
      setItems(prev => prev.map(item => 
        item.id === editingItem.id ? updated : item
      ));
      setEditingItem(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
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
        {editingItem ? (
          <ItemForm 
            onAddItem={handleUpdateItem}
            editingItem={editingItem}
            onCancel={handleCancelEdit}
          />
        ) : (
          <ItemForm onAddItem={handleAddItem} />
        )}
        
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
          onEditItem={handleEditItem}
        />
      </main>
    </div>
  );
}

export default App;