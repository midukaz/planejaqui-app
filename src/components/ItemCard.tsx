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
      'Sala de Estar': 'text-purple-600 border-purple-200 bg-purple-50/80',
      'Cozinha': 'text-amber-600 border-amber-200 bg-amber-50/80',
      'Quarto': 'text-pink-600 border-pink-200 bg-pink-50/80',
      'Banheiro': 'text-brand-700 border-brand-200 bg-brand-50/80',
      'Área Externa': 'text-brand-700 border-brand-200 bg-brand-50/80',
      'Decoração': 'text-brand-700 border-brand-200 bg-brand-50/80',
      'Eletrodomésticos': 'text-stone-600 border-stone-200 bg-stone-50/80',
      'Outros': 'text-slate-600 border-slate-200 bg-slate-50/80'
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

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white shadow-lg backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl">
      {/* Botão de deletar que fica atrás */}
      <div className="absolute inset-0 flex items-center justify-end pr-5 bg-brand-500 md:hidden">
        <button
          onClick={() => {
            onDelete(item.id);
            setSwipeOffset(0);
          }}
          className="rounded-2xl bg-white/10 p-2.5 text-white transition-all hover:bg-white/20"
          title="Remover item"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Card principal que desliza */}
      <div
        ref={cardRef}
        className="relative rounded-3xl bg-white p-5 sm:p-6 transition-transform duration-200"
        style={{
          transform: `translateX(-${swipeOffset}px)`,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3 sm:gap-4">
            <div className="flex-1 space-y-2.5">
              <div className={`inline-flex items-center gap-2 rounded-full border px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-semibold ${getCategoryColor(item.category)}`}>
                <Tag className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                {item.category}
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">{item.name}</h3>
                {item.description && (
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 text-right">
              <span className="text-[11px] sm:text-xs font-medium uppercase tracking-wide text-slate-500">Registrado em</span>
              <span className="text-xs sm:text-sm font-semibold text-slate-700">
                {new Intl.DateTimeFormat('pt-BR', {
                  day: '2-digit',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit'
                }).format(new Date(item.createdAt))}
              </span>
              <div className="hidden md:flex justify-end gap-2">
                <button
                  onClick={() => onEdit(item.id)}
                  className="rounded-xl border border-brand-100 px-2.5 py-1.5 text-brand-700 transition-all hover:border-brand-200 hover:text-brand-600"
                  title="Editar item"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="rounded-xl border border-brand-100 px-2.5 py-1.5 text-brand-700 transition-all hover:border-brand-200 hover:text-brand-600"
                  title="Remover item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
        </div>

          <div className="flex items-center justify-between gap-3 sm:gap-4 rounded-2xl border border-brand-100 bg-brand-50 px-3.5 sm:px-4 py-2.5 sm:py-3">
            <div>
              <p className="text-[11px] sm:text-xs uppercase tracking-wide text-brand-600">Investimento estimado</p>
              <p className="text-xl sm:text-2xl font-semibold text-brand-700">{formatPrice(item.price)}</p>
            </div>

            {item.storeLink ? (
              <a
                href={item.storeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-2xl bg-brand-500 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white shadow hover:bg-brand-600 transition-all"
              >
                Ver na loja
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : (
              <span className="rounded-2xl border border-dashed border-slate-300 px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium text-slate-500">
                Adicione um link quando estiver pronto
              </span>
            )}
          </div>

          <div className="md:hidden flex justify-end gap-2 pt-2">
            <button
              onClick={() => onEdit(item.id)}
              className="rounded-xl border border-brand-100 px-3 py-2 text-brand-700 transition-all hover:border-brand-200 hover:text-brand-600"
              title="Editar item"
            >
              <Edit2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}