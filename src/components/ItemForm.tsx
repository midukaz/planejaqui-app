import React, { useState } from 'react';
import { Plus, Tag, DollarSign, Link, FileText } from 'lucide-react';
import { Item, CATEGORIES, Category } from '../types';

interface ItemFormProps {
  onAddItem: (item: Omit<Item, 'id' | 'createdAt'>) => void;
}

export function ItemForm({ onAddItem }: ItemFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    storeLink: '',
    category: '' as Category | ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

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

    setFormData({
      name: '',
      description: '',
      price: '',
      storeLink: '',
      category: ''
    });
    
    setIsExpanded(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isExpanded) {
    return (
      <div className="mb-8">
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full bg-white border-2 border-dashed border-emerald-300 rounded-xl p-8 hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-200 group"
        >
          <div className="flex items-center justify-center gap-3 text-emerald-600">
            <Plus className="w-8 h-8 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-semibold">Adicionar Nova Pendência</span>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Plus className="w-6 h-6 text-emerald-600" />
          <h2 className="text-2xl font-bold text-gray-800">Nova Pendência</h2>
        </div>

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
              Adicionar Item
            </button>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}