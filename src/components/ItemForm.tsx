import React, { useState, useEffect } from 'react';
import { Tag, DollarSign, Link, FileText, Sparkles } from 'lucide-react';
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
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="rounded-3xl border border-slate-100 bg-white/70 p-5 sm:p-6 shadow-sm">
        <div className="mb-5 sm:mb-6 flex items-center gap-2.5 sm:gap-3">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 text-white shadow">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900">
              {editingItem ? 'Atualize os detalhes do item' : 'Vamos registrar um novo sonho para a casa?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">Preencha o que já sabe e volte depois para completar.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-slate-600">
              <Tag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Nome do item *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white/80 px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-700 shadow-sm transition-all focus:border-emerald-200 focus:bg-white focus:ring-2 focus:ring-emerald-100"
              placeholder="Ex: Conjunto de panelas antiaderentes"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-slate-600">
              <Tag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Categoria *
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white/80 px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-700 shadow-sm transition-all focus:border-emerald-200 focus:bg-white focus:ring-2 focus:ring-emerald-100"
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

        <div className="space-y-2">
          <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-slate-600">
            <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Descrição
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white/80 px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm text-slate-700 shadow-sm transition-all focus:border-emerald-200 focus:bg-white focus:ring-2 focus:ring-emerald-100 h-24 sm:h-28 resize-none"
            placeholder="Detalhe cores, medidas, link de referência ou ideias sobre como usar."
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-slate-600">
              <DollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Preço estimado (R$) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => handleChange('price', e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white/80 px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-700 shadow-sm transition-all focus:border-emerald-200 focus:bg-white focus:ring-2 focus:ring-emerald-100"
              placeholder="0,00"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-slate-600">
              <Link className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Link da loja
            </label>
            <input
              type="url"
              value={formData.storeLink}
              onChange={(e) => handleChange('storeLink', e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white/80 px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-700 shadow-sm transition-all focus:border-emerald-200 focus:bg-white focus:ring-2 focus:ring-emerald-100"
              placeholder="https://www.exemplo.com/meu-item"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 sm:gap-3 md:flex-row">
        <button
          type="submit"
          className="gradient-button flex-1 rounded-2xl px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold shadow-lg transition-all hover:opacity-95"
        >
          {editingItem ? 'Salvar alterações' : 'Adicionar à minha casa dos sonhos'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-2xl border border-slate-200 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-slate-500 transition-all hover:border-slate-300 hover:text-slate-700"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}