import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // Fechar modal com ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Previne scroll do body
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/80 bg-white/90 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center justify-between gap-2.5 sm:gap-3 border-b border-slate-200/80 bg-gradient-to-r from-white/60 to-white/20 px-6 sm:px-8 py-5 sm:py-6">
            <div>
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-emerald-500">planejaqui</p>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">{title}</h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-2xl border border-slate-200 bg-white/80 p-2 text-slate-400 transition-all hover:border-emerald-200 hover:text-emerald-600"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 sm:px-8 py-5 sm:py-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
