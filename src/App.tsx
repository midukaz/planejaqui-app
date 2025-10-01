import React, { useMemo, useState, useEffect } from 'react';
import { Plus, ShoppingBag, CheckCircle2, PiggyBank, Calendar, ChevronDown } from 'lucide-react';
import { Header } from './components/Header';
import { ItemForm } from './components/ItemForm';
import { CategoryFilter } from './components/CategoryFilter';
import { ItemList } from './components/ItemList';
import { Modal } from './components/Modal';
import { Item, Category } from './types';

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Carregar dados do localStorage
  useEffect(() => {
    const savedItems = localStorage.getItem('planejaqui-items');
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
    localStorage.setItem('planejaqui-items', JSON.stringify(items));
  }, [items]);

  // Detectar scroll para ajustar layout
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
  const { itemCounts, totalValue } = useMemo(() => {
    const counts = items.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const total = items.reduce((sum, item) => sum + item.price, 0);

    return { itemCounts: counts, totalValue: total };
  }, [items]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);

  const plannedItems = items.filter(item => item.price > 0).length;

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className={`container mx-auto px-4 sm:px-6 transition-all duration-300 ${
        isScrolled ? 'pt-40 pb-14' : 'pt-32 pb-20'
      }`}>
        <section className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
          <div className="glass-card rounded-3xl p-5 sm:p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Itens cadastrados</p>
                <p className="text-2xl sm:text-3xl font-semibold text-slate-900">{items.length}</p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-5 sm:p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                <PiggyBank className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Investimento total</p>
                <p className="text-2xl sm:text-3xl font-semibold text-slate-900">{formatCurrency(totalValue)}</p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-5 sm:p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-teal-100 text-teal-600">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Itens planejados</p>
                <p className="text-2xl sm:text-3xl font-semibold text-slate-900">{plannedItems}</p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-5 sm:p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Última atualização</p>
                <p className="text-base sm:text-lg font-semibold text-slate-900">
                  {items[0]?.createdAt
                    ? new Intl.DateTimeFormat('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        hour: '2-digit',
                        minute: '2-digit'
                      }).format(new Date(items[0].createdAt))
                    : 'Ainda não iniciado'}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="neutral-section p-6 sm:p-8 mb-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-2.5">
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">Seu enxoval, sonho a sonho</h2>
              <p className="text-sm sm:text-base text-slate-600">
                Priorize cômodos, acompanhe links de lojas e defina o investimento ideal para transformar cada ambiente da casa nova.
              </p>
            </div>
            <div className="flex gap-2.5 flex-wrap">
              <button
                onClick={handleOpenAddModal}
                className="gradient-button px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-sm sm:text-base font-semibold flex items-center gap-2 hover:opacity-95 transition-all"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                Registrar novo item
              </button>
              {/* <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="rounded-2xl border border-slate-200 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-slate-600 hover:border-slate-300 hover:text-slate-800 transition-all"
              >
                Voltar ao topo
              </button> */}
            </div>
          </div>
        </section>

        {items.length === 0 ? (
          <div className="neutral-section p-8 sm:p-12 text-center flex flex-col items-center gap-5 sm:gap-6">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-emerald-100/60 blur-xl" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 text-white shadow-xl">
                <Plus className="w-12 h-12" />
              </div>
            </div>
            <div className="space-y-2 max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-semibold text-slate-900">Comece sua jornada de casa nova</h3>
              <p className="text-sm sm:text-base text-slate-600">
                Adicione o primeiro item e monte sua coleção personalizada de prioridades, ideias e links favoritos para cada ambiente.
              </p>
            </div>
            <button
              onClick={handleOpenAddModal}
              className="gradient-button px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl text-sm sm:text-base font-semibold flex items-center gap-2 hover:opacity-95 transition-all"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              Adicionar primeiro item
            </button>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            <div className="neutral-section overflow-hidden">
              <button
                onClick={() => setFiltersOpen(prev => !prev)}
                className="flex w-full items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left transition-colors hover:bg-white/80"
              >
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-wide text-slate-500">Filtros</p>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900">Filtrar por ambiente</h3>
                  <p className="text-xs sm:text-sm text-slate-500">Toque para {filtersOpen ? 'ocultar' : 'visualizar'} categorias</p>
                </div>
                <div className={`flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all ${
                  filtersOpen ? 'rotate-180' : 'rotate-0'
                }`}>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>

              {filtersOpen && (
                <div className="border-t border-slate-200/70 px-5 sm:px-6 py-5 sm:py-6 bg-gradient-to-b from-white/90 to-white">
                  <CategoryFilter
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    itemCounts={itemCounts}
                  />
                </div>
              )}
            </div>

            <ItemList
              items={items}
              selectedCategory={selectedCategory}
              onDeleteItem={handleDeleteItem}
              onEditItem={handleEditItem}
            />
          </div>
        )}
      </main>

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