import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Search, MessageCircle, ShoppingBag, Loader2, ExternalLink } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  // WhatsApp de Patricia: 5492616798352
  const PATRICIA_PHONE = "5492616798352";

  const handleConsult = () => {
    const message = `¡Hola Patricia! 👋 Quisiera consultar disponibilidad y precio del producto: *${product.name}*`;
    window.open(`https://wa.me/${PATRICIA_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-5 flex flex-col shadow-sm border border-slate-100 active:scale-[0.98] transition-all">
      <div className="w-full aspect-square rounded-[2rem] overflow-hidden bg-white flex items-center justify-center relative mb-4 border border-slate-50">
        {!imgLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
            <Loader2 className="w-8 h-8 text-blue-200 animate-spin" />
          </div>
        )}
        <img 
          src={product.image} 
          alt={product.name} 
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-contain p-4 transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
        />
      </div>
      
      <div className="flex-1 flex flex-col space-y-3">
        <div>
          <span className="text-[9px] text-blue-800 font-black uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-full">
            {product.category}
          </span>
          <h4 className="font-black text-slate-900 leading-tight text-lg mt-2">
            {product.name}
          </h4>
          <p className="text-xs text-slate-500 font-medium mt-1 leading-snug line-clamp-2">
            {product.description}
          </p>
        </div>
        
        <button 
          onClick={handleConsult}
          className="w-full bg-emerald-500 text-white py-4 rounded-2xl shadow-lg shadow-emerald-100 flex items-center justify-center gap-3 font-black text-[11px] uppercase tracking-widest active:scale-95 transition-all"
        >
          <MessageCircle className="w-5 h-5 fill-current" /> Consultar Patricia
        </button>
      </div>
    </div>
  );
};

interface StoreProps {
  onBack: () => void;
}

const Store: React.FC<StoreProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const PATRICIA_PHONE = "5492616798352";
  
  const filteredProducts = MOCK_PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-slate-50 min-h-full pb-32">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">Insumos</h2>
          <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">Catálogo Disponible</p>
        </div>
        <div className="bg-blue-900 p-4 rounded-3xl shadow-lg">
          <ShoppingBag className="w-7 h-7 text-white" />
        </div>
      </div>

      <div className="relative mb-8">
        <div className="absolute left-5 top-1/2 -translate-y-1/2">
          <Search className="w-5 h-5 text-slate-300" />
        </div>
        <input 
          type="text" 
          placeholder="¿Qué insumo necesitás?" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-14 pr-6 py-5 bg-white border-none rounded-[2rem] shadow-sm text-sm font-bold outline-none"
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-10 bg-blue-900 p-8 rounded-[3rem] text-white text-center space-y-4">
        <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
          <MessageCircle className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-black">Asesoría de Patricia</h3>
        <p className="text-sm font-medium opacity-80">Si no encontrás lo que buscás, enviá tu receta a Patricia por WhatsApp.</p>
        <button 
          onClick={() => window.open(`https://wa.me/${PATRICIA_PHONE}?text=${encodeURIComponent('Hola Patricia, estoy buscando un insumo para mi tratamiento que no encuentro en la lista.')}`, '_blank')}
          className="w-full bg-white text-blue-900 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2"
        >
          Contactar Ahora <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Store;