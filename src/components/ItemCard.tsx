import React, { useState, useRef } from 'react';
import { ExternalLink, Tag, Trash2, Edit2 } from 'lucide-react';
import { Item } from '../types';

interface ItemCardProps {
  item: Item;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export function ItemCard({ item, onDelete, onEdit }: ItemCardProps) {
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const currentX = useRef(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Sala de Estar': 'bg-blue-100 text-blue-800',
      'Cozinha': 'bg-orange-100 text-orange-800',
      'Quarto': 'bg-purple-100 text-purple-800',
      'Banheiro': 'bg-cyan-100 text-cyan-800',
      'Área Externa': 'bg-green-100 text-green-800',
      'Decoração': 'bg-pink-100 text-pink-800',
      'Eletrodomésticos': 'bg-yellow-100 text-yellow-800',
      'Outros': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors['Outros'];
  };

  // Funções de swipe para mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    currentX.current = e.touches[0].clientX;
    const diffX = startX.current - currentX.current;
    
    // Só permite arrastar para a esquerda (valores positivos)
    if (diffX > 0) {
      setSwipeOffset(Math.min(diffX, 80)); // Máximo 80px
    } else {
      setSwipeOffset(0);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    // Se arrastou mais que 40px, mantém aberto
    if (swipeOffset > 40) {
      setSwipeOffset(80);
    } else {
      setSwipeOffset(0);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    currentX.current = e.clientX;
    const diffX = startX.current - currentX.current;
    
    if (diffX > 0) {
      setSwipeOffset(Math.min(diffX, 80));
    } else {
      setSwipeOffset(0);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    
    if (swipeOffset > 40) {
      setSwipeOffset(80);
    } else {
      setSwipeOffset(0);
    }
  };

  return (
    <div className="relative overflow-hidden bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-200">
      {/* Botão de deletar que fica atrás */}
      <div className="absolute inset-0 flex items-center justify-end pr-6 bg-red-500">
        <button
          onClick={() => {
            onDelete(item.id);
            setSwipeOffset(0);
          }}
          className="p-3 text-white hover:bg-red-600 rounded-lg transition-all"
          title="Remover item"
        >
          <Trash2 className="w-6 h-6" />
        </button>
      </div>

      {/* Card principal que desliza */}
      <div
        ref={cardRef}
        className="relative bg-white rounded-xl p-6 transition-transform duration-200"
        style={{
          transform: `translateX(-${swipeOffset}px)`,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                {item.category}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
            <p className="text-gray-600 leading-relaxed">{item.description}</p>
          </div>
          
          {/* Botões - apenas desktop */}
          <div className="hidden md:flex gap-1">
            <button
              onClick={() => onEdit(item.id)}
              className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
              title="Editar item"
            >
              <Edit2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              title="Remover item"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          {/* Botão de editar apenas para mobile */}
          <div className="md:hidden">
            <button
              onClick={() => onEdit(item.id)}
              className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
              title="Editar item"
            >
              <Edit2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-2xl font-bold text-emerald-600">
            {formatPrice(item.price)}
          </div>
          
          {item.storeLink && (
            <a
              href={item.storeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
            >
              Ver na Loja
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}