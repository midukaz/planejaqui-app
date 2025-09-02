import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Header } from './components/Header';
import { ItemForm } from './components/ItemForm';
import { CategoryFilter } from './components/CategoryFilter';
import { ItemList } from './components/ItemList';
import { Modal } from './components/Modal';
import { Item, Category } from './types';
import initialData from '../data.json';

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      setIsModalOpen(true);
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

  const handleCloseModal = () => {
    setEditingItem(null);
    setIsModalOpen(false);
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
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
        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-8">
              <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-12 h-12 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Comece sua lista
              </h3>
              <p className="text-gray-600 mb-6">
                Adicione os itens que você precisa para sua casa nova
              </p>
              <button
                onClick={handleOpenAddModal}
                className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold text-lg"
              >
                Adicionar Primeiro Item
              </button>
            </div>
          </div>
        ) : (
          <>
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              itemCounts={itemCounts}
            />
            
            <ItemList
              items={items}
              selectedCategory={selectedCategory}
              onDeleteItem={handleDeleteItem}
              onEditItem={handleEditItem}
            />
          </>
        )}
      </main>

      {/* Botão flutuante para adicionar */}
      {items.length > 0 && (
        <button
          onClick={handleOpenAddModal}
          className="fixed bottom-6 right-6 bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 transition-all hover:scale-105 z-40"
          title="Adicionar novo item"
        >
          <Plus className="w-6 h-6" />
        </button>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingItem ? 'Editar Pendência' : 'Nova Pendência'}
      >
        <ItemForm
          onAddItem={editingItem ? handleUpdateItem : handleAddItem}
          editingItem={editingItem}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
}

export default App;