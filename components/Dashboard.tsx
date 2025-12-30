
import React from 'react';
import { AppView, GlucoseReading } from '../types';
import { NAVIGATION_CARDS } from '../constants';
import { ArrowUpRight, TrendingDown } from 'lucide-react';

interface DashboardProps {
  onViewChange: (view: AppView) => void;
  history: GlucoseReading[];
}

const Dashboard: React.FC<DashboardProps> = ({ onViewChange, history }) => {
  const lastReading = history[history.length - 1];
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">¡Hola! 👋</h1>
        <p className="text-gray-500">Bienvenido a tu centro de cuidado para diabetes.</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-blue-50 p-2 rounded-lg">
               <TrendingDown className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 font-medium">Última medición</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-blue-900">{lastReading?.value || '--'}</span>
            <span className="text-[10px] text-gray-400 uppercase">mg/dL</span>
          </div>
          <p className="text-[10px] text-gray-400 mt-1">Hoy 8:30</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-emerald-50 p-2 rounded-lg">
               <ArrowUpRight className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 font-medium">Tus puntos</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-emerald-600">1.250</span>
          </div>
          <p className="text-[10px] text-gray-400 mt-1">Canjealos por descuentos</p>
        </div>
      </div>

      <h2 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">¿Qué necesitás?</h2>

      <div className="space-y-4">
        {NAVIGATION_CARDS.map((card) => (
          <button
            key={card.id}
            onClick={() => card.id !== 'delivery' && onViewChange(card.id as AppView)}
            className={`w-full p-5 rounded-3xl flex items-center gap-4 transition-transform active:scale-95 shadow-lg ${card.color} text-left relative overflow-hidden group`}
          >
            <div className="bg-white/20 p-3 rounded-2xl">
              {card.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1">{card.title}</h3>
              <p className="text-white/80 text-sm leading-tight">{card.subtitle}</p>
            </div>
            
            {/* Visual Flair */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 transition-all group-hover:bg-white/20" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
