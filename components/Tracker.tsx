
import React, { useState, useEffect, useMemo } from 'react';
import { GlucoseReading } from '../types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Check, Coffee, Utensils, Sun, Moon, Trash2 } from 'lucide-react';

interface TrackerProps {
  onBack: () => void;
  history: GlucoseReading[];
  setHistory: React.Dispatch<React.SetStateAction<GlucoseReading[]>>;
}

const Tracker: React.FC<TrackerProps> = ({ history, setHistory }) => {
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');
  const [newValue, setNewValue] = useState('');
  const [selectedMeal, setSelectedMeal] = useState<'desayuno' | 'almuerzo' | 'merienda' | 'cena'>('desayuno');
  const [selectedTiming, setSelectedTiming] = useState<'antes' | 'despues'>('antes');

  const addReading = () => {
    if (!newValue || isNaN(Number(newValue))) return;
    const reading: GlucoseReading = {
      id: Date.now().toString(),
      value: Number(newValue),
      timestamp: new Date().toISOString(),
      mealtime: selectedMeal,
      timing: selectedTiming
    };
    setHistory(prev => [...prev, reading]);
    setNewValue('');
    setActiveTab('history');
  };

  const chartData = useMemo(() => {
    return history.slice(-7).map(r => ({
      name: new Date(r.timestamp).toLocaleDateString([], { day: '2-digit' }),
      value: r.value
    }));
  }, [history]);

  return (
    <div className="bg-slate-50 min-h-full pb-24">
      <div className="p-4">
        <div className="flex bg-white p-2 rounded-[2.5rem] mb-8 shadow-sm border border-slate-100">
          <button 
            onClick={() => setActiveTab('new')}
            className={`flex-1 py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-widest transition-all ${
              activeTab === 'new' ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-400'
            }`}
          >
            Anotar Hoy
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-widest transition-all ${
              activeTab === 'history' ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-400'
            }`}
          >
            Historial
          </button>
        </div>

        {activeTab === 'new' ? (
          <div className="space-y-6 animate-in slide-in-from-bottom-5">
            <div className="bg-white p-10 rounded-[3.5rem] shadow-xl shadow-blue-900/5 text-center border border-slate-50">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Valor del Glucómetro</p>
               <div className="flex items-center justify-center gap-4">
                 <input 
                   type="number"
                   value={newValue}
                   onChange={(e) => setNewValue(e.target.value)}
                   className="w-48 text-8xl font-black text-blue-900 text-center outline-none bg-slate-50 rounded-[2.5rem] py-8 border-none"
                   placeholder="0"
                 />
                 <span className="text-xl font-black text-slate-300">mg/dL</span>
               </div>
            </div>

            <div className="bg-white p-8 rounded-[3.5rem] shadow-sm border border-slate-50">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 text-center">Momento del día</p>
               <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'desayuno', label: 'Desayuno', icon: <Coffee className="w-8 h-8" /> },
                    { id: 'almuerzo', label: 'Almuerzo', icon: <Utensils className="w-8 h-8" /> },
                    { id: 'merienda', label: 'Merienda', icon: <Sun className="w-8 h-8" /> },
                    { id: 'cena', label: 'Cena', icon: <Moon className="w-8 h-8" /> },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedMeal(opt.id as any)}
                      className={`flex flex-col items-center gap-3 p-6 rounded-[2.5rem] border-4 transition-all ${
                        selectedMeal === opt.id ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-inner' : 'bg-white border-slate-50 text-slate-400 opacity-60'
                      }`}
                    >
                      {opt.icon}
                      <span className="text-[10px] font-black uppercase">{opt.label}</span>
                    </button>
                  ))}
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <button 
                 onClick={() => setSelectedTiming('antes')}
                 className={`p-6 rounded-[3rem] border-4 flex flex-col items-center gap-2 transition-all ${
                   selectedTiming === 'antes' ? 'bg-emerald-50 border-emerald-600 text-emerald-900 shadow-inner' : 'bg-white border-slate-50 text-slate-400 opacity-60'
                 }`}
               >
                 <span className="text-2xl">🍽️</span>
                 <span className="text-[10px] font-black uppercase tracking-widest">Antes</span>
               </button>
               <button 
                 onClick={() => setSelectedTiming('despues')}
                 className={`p-6 rounded-[3rem] border-4 flex flex-col items-center gap-2 transition-all ${
                   selectedTiming === 'despues' ? 'bg-orange-50 border-orange-600 text-orange-900 shadow-inner' : 'bg-white border-slate-50 text-slate-400 opacity-60'
                 }`}
               >
                 <span className="text-2xl">🍱</span>
                 <span className="text-[10px] font-black uppercase tracking-widest">Después</span>
               </button>
            </div>

            <button 
              onClick={addReading}
              className="w-full bg-[#1e3a8a] text-white py-8 rounded-[3rem] font-black text-xl shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-4 uppercase tracking-widest"
            >
              <Check className="w-10 h-10" /> Guardar
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-white p-8 rounded-[3.5rem] shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Tendencia</h3>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <Line type="monotone" dataKey="value" stroke="#1e3a8a" strokeWidth={8} dot={{r: 8, fill: '#1e3a8a'}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-4">
               {history.slice().reverse().map(reading => (
                 <div key={reading.id} className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-50 flex items-center justify-between">
                    <div>
                       <p className="text-2xl font-black text-slate-900 leading-none mb-2">
                         {new Date(reading.timestamp).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}
                       </p>
                       <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{reading.mealtime} • {reading.timing}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className={`text-6xl font-black ${reading.value > 140 ? 'text-rose-500' : 'text-emerald-500'}`}>
                        {reading.value}
                      </div>
                      <button onClick={() => setHistory(prev => prev.filter(r => r.id !== reading.id))} className="p-3 bg-slate-50 text-slate-300 rounded-full">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracker;
