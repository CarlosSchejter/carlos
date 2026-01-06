import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, MessageCircle, ChevronRight, Calendar, MapPin, ArrowLeft, Lock, ShieldCheck, MapPinned } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage, ChatSubView } from '../types';

interface ChatAssistantProps {
  onBack: () => void;
  isAdmin?: boolean;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ isAdmin }) => {
  const [subView, setSubView] = useState<ChatSubView>('hub');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '¡Hola! Soy tu asistente de Farmatotal Mendoza. ¿En qué puedo ayudarte?', timestamp: new Date().toLocaleTimeString() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // WhatsApp de Patricia: 5492616798352
  const PATRICIA_PHONE = "5492616798352";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, subView]);

  const handleSend = async () => {
    if (!input.trim()) return;

    if (subView === 'hub') setSubView('ai-chat');

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date().toLocaleTimeString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const historyForGemini = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await getGeminiResponse(input, historyForGemini);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'model', text: response, timestamp: new Date().toLocaleTimeString() }]);
  };

  const RestrictedChat = () => (
    <div className="flex flex-col items-center justify-center h-full p-10 text-center animate-in fade-in zoom-in duration-500">
      <div className="bg-slate-900 w-28 h-28 rounded-[3rem] flex items-center justify-center mb-8 shadow-2xl relative">
        <Lock className="w-12 h-12 text-white" />
        <div className="absolute -top-2 -right-2 bg-rose-500 p-2 rounded-full border-4 border-white">
           <ShieldCheck className="w-5 h-5 text-white" />
        </div>
      </div>
      <h3 className="text-3xl font-black text-slate-900 mb-4">Acceso Reservado</h3>
      <p className="text-base text-slate-500 font-medium mb-10 leading-relaxed">
        El asistente por IA está disponible para pacientes que retiran sus insumos en nuestras sucursales.
      </p>
      <div className="bg-blue-50 p-6 rounded-[2.5rem] w-full border border-blue-100 mb-8 space-y-4">
        <div className="flex items-center gap-4 text-left">
           <MapPinned className="w-6 h-6 text-blue-600 flex-shrink-0" />
           <p className="text-xs text-blue-900 font-black">Validá tu cuenta en Farmatotal (Mendoza) para activar el servicio.</p>
        </div>
      </div>
      <button 
        onClick={() => setSubView('hub')}
        className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]"
      >
        Volver
      </button>
    </div>
  );

  if (subView === 'ai-chat') {
    if (!isAdmin) return <RestrictedChat />;

    return (
      <div className="flex flex-col h-full bg-slate-50 pb-20">
        <div className="bg-blue-600 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSubView('hub')} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h3 className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Asistente IA
            </h3>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-5 rounded-[2rem] text-sm shadow-sm max-w-[85%] ${
                m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {isTyping && <div className="text-[10px] text-slate-400 font-black ml-4">ESCRIBIENDO...</div>}
        </div>

        <div className="p-4 bg-white border-t border-slate-100 sticky bottom-0">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribí aquí..."
              className="flex-1 bg-slate-50 rounded-[2rem] px-6 py-4 text-sm font-bold outline-none"
            />
            <button 
              onClick={handleSend}
              className="bg-blue-600 text-white p-4 rounded-full shadow-lg shadow-blue-100"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-slate-50/50 space-y-8 animate-in fade-in duration-500 pb-20">
      <section>
        <h2 className="text-2xl font-black text-slate-900 mb-6">Canales de Atención</h2>
        <div className="space-y-4">
          {[
            { name: 'Patricia', role: 'Asesora Técnica', phone: PATRICIA_PHONE },
            { name: 'WhatsApp Central', role: 'Farmacia General', phone: PATRICIA_PHONE },
            { name: 'Natalia', role: 'Atención Personalizada', phone: PATRICIA_PHONE }
          ].map((member, i) => (
            <div key={i} className="bg-white p-5 rounded-[2.5rem] flex items-center justify-between shadow-sm border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                  <MessageCircle className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm">{member.name}</h4>
                  <p className="text-[10px] text-slate-400 font-black uppercase">{member.role}</p>
                </div>
              </div>
              <button 
                onClick={() => window.open(`https://wa.me/${member.phone}?text=${encodeURIComponent(`Hola ${member.name}! Te escribo desde la App de Farmatotal.`)}`, '_blank')}
                className="bg-emerald-500 text-white p-3 rounded-2xl shadow-lg shadow-emerald-50 active:scale-90 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section 
        onClick={() => setSubView('ai-chat')}
        className="bg-white p-8 rounded-[3rem] border border-blue-100 shadow-xl shadow-blue-900/5 relative overflow-hidden group cursor-pointer"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-600 p-4 rounded-3xl shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 leading-tight">Asistente IA</h3>
              <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">Disponible ahora</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
            Consultá sobre alimentación, mediciones y cuidados de forma instantánea.
          </p>
          <div className="flex items-center justify-end text-[10px] font-black text-blue-600 uppercase tracking-widest">
            Comenzar <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChatAssistant;