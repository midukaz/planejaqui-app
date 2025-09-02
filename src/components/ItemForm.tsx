import React, { useState, useEffect } from 'react';
import { Plus, Tag, DollarSign, Link, FileText } from 'lucide-react';
import { Item, CATEGORIES, Category } from '../types';

interface ItemFormProps {
  onAddItem: (item: Omit<Item, 'id' | 'createdAt'>) => void;
  editingItem?: Item | null;
  onCancel: () => void;
}

export function ItemForm({ onAddItem, editingItem, onCancel }: ItemFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    storeLink: '',
    category: '' as Category | ''
  });

  // Atualizar formulário quando receber item para editar
  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name,
        description: editingItem.description,
        price: editingItem.price.toString(),
        storeLink: editingItem.storeLink,
        category: editingItem.category
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        storeLink: '',
        category: ''
      });
    }
  }, [editingItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.price) return;

    onAddItem({
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      storeLink: formData.storeLink,
      category: formData.category as Category
    });

    // Fechar modal após salvar
    onCancel();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Tag className="w-4 h-4" />
                Nome do Item *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="Ex: Sofá 3 lugares"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Tag className="w-4 h-4" />
                Categoria *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Selecione uma categoria</option>
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4" />
              Descrição
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all h-24 resize-none"
              placeholder="Descreva detalhes do item, cor, material, etc..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4" />
                Preço (R$) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="0,00"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Link className="w-4 h-4" />
                Link da Loja
              </label>
              <input
                type="url"
                value={formData.storeLink}
                onChange={(e) => handleChange('storeLink', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
            >
              {editingItem ? 'Salvar Alterações' : 'Adicionar Item'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              Cancelar
            </button>
          </div>
        </form>
  );
}