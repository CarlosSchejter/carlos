
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, MessageCircle, ChevronRight, Calendar, MapPin, Users, ArrowLeft } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage, ChatSubView } from '../types';

interface ChatAssistantProps {
  onBack: () => void;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ onBack }) => {
  const [subView, setSubView] = useState<ChatSubView>('hub');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '¡Hola! Soy tu asistente experto de Farmatotal. ¿En qué puedo ayudarte hoy?', timestamp: new Date().toLocaleTimeString() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, subView]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    if (subView === 'hub') setSubView('ai-chat');

    const userMsg: ChatMessage = { role: 'user', text: textToSend, timestamp: new Date().toLocaleTimeString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const historyForGemini = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await getGeminiResponse(textToSend, historyForGemini);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'model', text: response, timestamp: new Date().toLocaleTimeString() }]);
  };

  const team = [
    { name: 'Patricia', role: 'Asesora Técnica en Diabetes' },
    { name: 'Micaela', role: 'Promotora de Salud' },
    { name: 'Natalia', role: 'Atención personalizada' },
    { name: 'Farmatotal', role: 'Atención al cliente' },
  ];

  const quickTopics = [
    'Control de glucosa', 'Uso de glucómetro', 'Nutrición', 
    'Medicación', 'Cobertura obra social', 'Otro tema'
  ];

  const workshops = [
    {
      title: 'Taller: Uso correcto del glucómetro',
      date: 'Sábado 25 de Enero • 10:00 hs.',
      location: 'Vicente Zapata 300, Ciudad, Mendoza',
      slots: '8 cupos disponibles de 15',
      progress: 53
    },
    {
      title: 'Charla: Nutrición para diabéticos',
      date: 'Miércoles 29 de Enero • 18:00 hs.',
      location: 'Vicente Zapata 300, Ciudad, Mendoza',
      slots: '12 cupos disponibles de 20',
      progress: 40
    }
  ];

  if (subView === 'ai-chat') {
    return (
      <div className="flex flex-col h-full bg-slate-50">
        <div className="bg-emerald-500 p-4 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <button onClick={() => setSubView('hub')} className="p-1 hover:bg-white/20 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h3 className="font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> IA Experta
              </h3>
              <p className="text-[10px] opacity-80">En línea ahora</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-2 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${m.role === 'model' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                  {m.role === 'model' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>
                <div className={`p-4 rounded-2xl shadow-sm text-sm ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                }`}>
                  {m.text}
                  <div className={`text-[9px] mt-2 opacity-50 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {m.timestamp}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-2 items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                 <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                 <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                 <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" />
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribí tu consulta..."
              className="flex-1 bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            />
            <button 
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="bg-emerald-500 text-white p-3 rounded-2xl disabled:opacity-50 transition-all active:scale-95 shadow-lg shadow-emerald-200"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50/50 space-y-8">
      {/* Team Section */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Hablá con nuestro equipo</h2>
        <div className="space-y-3">
          {team.map((member, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-gray-50 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{member.name}</h4>
                  <p className="text-xs text-gray-500">{member.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                 <button className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-3 py-1.5 rounded-full border border-emerald-100 flex items-center gap-1 hover:bg-emerald-600 hover:text-white transition-colors">
                   WhatsApp <ChevronRight className="w-3 h-3" />
                 </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Consult */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-1">Mini-consulta rápida</h2>
        <p className="text-xs text-gray-400 mb-4">¿Necesitás ayuda con algo específico?</p>
        <div className="grid grid-cols-2 gap-2">
          {quickTopics.map((topic, i) => (
            <button 
              key={i}
              onClick={() => handleSend(`Necesito ayuda con: ${topic}`)}
              className="bg-blue-50/50 text-blue-900 text-left p-3 rounded-xl text-xs font-medium border border-blue-100 hover:bg-blue-100 transition-colors"
            >
              {topic}
            </button>
          ))}
        </div>
      </section>

      {/* Workshops */}
      <section className="pb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Próximos talleres</h2>
        <div className="space-y-4">
          {workshops.map((ws, i) => (
            <div key={i} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-4">
              <h3 className="font-bold text-blue-900">{ws.title}</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-gray-500">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  {ws.date}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-gray-500">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  {ws.location}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-gray-500">
                  <Users className="w-3.5 h-3.5 text-blue-400" />
                  {ws.slots}
                </div>
              </div>
              
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full" style={{ width: `${ws.progress}%` }}></div>
              </div>

              <button className="w-full bg-[#2a4db7] text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-100 active:scale-95 transition-transform">
                Inscribirme
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ChatAssistant;
