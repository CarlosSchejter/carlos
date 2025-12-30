
import React, { useState, useEffect } from 'react';
import { GlucoseReading } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Plus, History, BrainCircuit } from 'lucide-react';
import { summarizeHealthProgress } from '../services/geminiService';

interface TrackerProps {
  onBack: () => void;
  history: GlucoseReading[];
  setHistory: React.Dispatch<React.SetStateAction<GlucoseReading[]>>;
}

const Tracker: React.FC<TrackerProps> = ({ history, setHistory }) => {
  const [newValue, setNewValue] = useState('');
  const [aiSummary, setAiSummary] = useState('Analizando tus tendencias...');

  useEffect(() => {
    const fetchSummary = async () => {
      if (history.length > 0) {
        const text = history.map(h => h.value).join(', ');
        const summary = await summarizeHealthProgress(text);
        setAiSummary(summary);
      }
    };
    fetchSummary();
  }, [history]);

  const addReading = () => {
    if (!newValue || isNaN(Number(newValue))) return;
    const reading: GlucoseReading = {
      id: Date.now().toString(),
      value: Number(newValue),
      timestamp: new Date().toISOString(),
    };
    setHistory(prev => [...prev, reading]);
    setNewValue('');
  };

  const chartData = history.map(h => ({
    time: new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    value: h.value
  }));

  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Mi Progreso</h2>
        <p className="text-sm text-gray-500">Mantené tus niveles bajo control</p>
      </div>

      {/* AI Insight */}
      <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-5 rounded-3xl text-white mb-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <BrainCircuit className="w-5 h-5 text-blue-200" />
            <span className="text-xs font-bold uppercase tracking-widest text-blue-100">AI Insight</span>
          </div>
          <p className="text-sm leading-relaxed">{aiSummary}</p>
        </div>
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 mb-8 h-64">
        <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
           <History className="w-3 h-3" /> Tendencias Recientes
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
            <YAxis hide domain={[60, 200]} />
            <Tooltip 
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              labelStyle={{ fontWeight: 'bold' }}
            />
            <ReferenceLine y={100} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Ideal', position: 'right', fill: '#10b981', fontSize: 10 }} />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#ef4444" 
              strokeWidth={3} 
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 4, stroke: '#fff' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Add Entry */}
      <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-4">Nueva medición</h3>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input 
              type="number" 
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder="Ej: 110"
              className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 focus:ring-2 focus:ring-rose-500 outline-none font-bold text-lg"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-bold">mg/dL</span>
          </div>
          <button 
            onClick={addReading}
            className="bg-rose-500 text-white p-4 rounded-2xl shadow-lg shadow-rose-200 active:scale-95 transition-transform"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      {/* Table-like history list */}
      <div className="mt-8">
         <h3 className="text-sm font-bold text-gray-700 mb-4">Historial</h3>
         <div className="space-y-3">
           {history.slice().reverse().map(reading => (
             <div key={reading.id} className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-gray-50">
               <div>
                 <p className="text-xs text-gray-400">{new Date(reading.timestamp).toLocaleString()}</p>
                 <p className="font-bold text-gray-800">Medición manual</p>
               </div>
               <div className={`px-4 py-2 rounded-xl font-bold ${
                 reading.value > 140 ? 'bg-orange-50 text-orange-600' :
                 reading.value < 70 ? 'bg-amber-50 text-amber-600' :
                 'bg-emerald-50 text-emerald-600'
               }`}>
                 {reading.value} <span className="text-[10px] ml-1">mg/dL</span>
               </div>
             </div>
           ))}
         </div>
      </div>
    </div>
  );
};

export default Tracker;
