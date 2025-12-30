
import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Search, ShoppingBag, Plus } from 'lucide-react';

interface StoreProps {
  onBack: () => void;
}

const Store: React.FC<StoreProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const categories = ['Todos', 'Monitoreo', 'Insumos', 'Accesorios'];

  const filteredProducts = activeCategory === 'Todos' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Catálogo</h2>
        <div className="relative">
          <ShoppingBag className="w-6 h-6 text-gray-700" />
          <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input 
          type="text" 
          placeholder="Buscar producto..." 
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
              activeCategory === cat ? 'bg-blue-900 text-white' : 'bg-white text-gray-500 border border-gray-100 shadow-sm'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-4 mt-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-3xl p-4 flex gap-4 shadow-sm border border-gray-50 group">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider mb-1">{product.category}</p>
                <h4 className="font-bold text-gray-900 leading-tight">{product.name}</h4>
                <p className="text-xs text-gray-400 line-clamp-2 mt-1">{product.description}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-lg text-gray-900">${product.price.toLocaleString()}</span>
                <button className="bg-blue-50 p-2 rounded-xl text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
