
import React, { useState, useEffect } from 'react';
import { Home, Activity, MessageCircle, BookOpen, ShoppingCart } from 'lucide-react';
import { AppView, GlucoseReading } from './types.ts';
import { MOCK_HISTORY } from './constants.tsx';
import Dashboard from './components/Dashboard.tsx';
import Store from './components/Store.tsx';
import ChatAssistant from './components/ChatAssistant.tsx';
import LearningHub from './components/LearningHub.tsx';
import Tracker from './components/Tracker.tsx';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [history, setHistory] = useState<GlucoseReading[]>(MOCK_HISTORY);
  const [isAdmin, setIsAdmin] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    try {
      const savedAdmin = localStorage.getItem('farmatotal_admin_mode') === 'true';
      setIsAdmin(savedAdmin);
    } catch (e) {
      console.warn("LocalStorage no disponible");
    }
  }, []);

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-blue-900 text-white p-10 text-center">
        <h1 className="text-6xl font-black mb-4">+</h1>
        <h2 className="text-xl font-bold uppercase mb-4">Ocurrió un error</h2>
        <button onClick={() => window.location.reload()} className="bg-white text-blue-900 px-8 py-4 rounded-full font-black">REINTENTAR</button>
      </div>
    );
  }

  const renderView = () => {
    try {
      switch (currentView) {
        case 'dashboard': return <Dashboard onViewChange={setCurrentView} history={history} isAdmin={isAdmin} />;
        case 'tracker': return <Tracker onBack={() => setCurrentView('dashboard')} history={history} setHistory={setHistory} />;
        case 'chat': return <ChatAssistant onBack={() => setCurrentView('dashboard')} isAdmin={isAdmin} />;
        case 'learn': return <LearningHub />;
        case 'store': return <Store onBack={() => setCurrentView('dashboard')} />;
        default: return <Dashboard onViewChange={setCurrentView} history={history} isAdmin={isAdmin} />;
      }
    } catch (e) {
      console.error("View render error:", e);
      setHasError(true);
      return null;
    }
  };

  const handleLogoClick = () => {
    const newClicks = logoClicks + 1;
    if (newClicks >= 5) {
      const newState = !isAdmin;
      setIsAdmin(newState);
      localStorage.setItem('farmatotal_admin_mode', String(newState));
      setLogoClicks(0);
      alert(newState ? "🔓 MODO FARMACIA" : "🔒 MODO PACIENTE");
    } else {
      setLogoClicks(newClicks);
      setTimeout(() => setLogoClicks(0), 2000);
    }
  };

  const NavButton = ({ view, icon: Icon, label }: { view: AppView, icon: any, label: string }) => (
    <button 
      onClick={() => setCurrentView(view)}
      className={`flex flex-col items-center justify-center gap-1 flex-1 py-4 transition-all active:scale-90 ${
        currentView === view ? 'text-blue-900' : 'text-slate-400'
      }`}
    >
      <div className={`p-2 rounded-2xl transition-all ${currentView === view ? 'bg-blue-100/50' : 'bg-transparent'}`}>
        <Icon className={`w-6 h-6 ${currentView === view ? 'stroke-[3.5px]' : 'stroke-[2px]'}`} />
      </div>
      <span className={`text-[8px] font-black uppercase tracking-tighter ${currentView === view ? 'opacity-100' : 'opacity-70'}`}>
        {label}
      </span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-white shadow-2xl relative overflow-hidden border-x border-slate-100">
      <header className="p-5 border-b-2 border-slate-50 sticky top-0 bg-white z-[60] shadow-sm">
        <div className="flex flex-col items-center cursor-pointer select-none" onClick={handleLogoClick}>
          <div className="flex items-center gap-2 mb-1">
            <div className="bg-red-600 rounded-md w-5 h-5 flex items-center justify-center shadow-md">
               <span className="text-white text-[12px] font-black">+</span>
            </div>
            <h1 className="text-[#1e3a8a] font-black text-3xl tracking-tighter uppercase leading-none border-b-[4px] border-blue-900/10 pb-1">
              FARMATOTAL
            </h1>
          </div>
          <div className="bg-[#1e3a8a] px-6 py-1 rounded-full">
             <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Diabetes Care</span>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto bg-slate-50/20">
        {renderView()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-100 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] px-2 py-1 flex items-center justify-between z-[100] safe-area-bottom">
        <NavButton view="dashboard" icon={Home} label="Inicio" />
        <NavButton view="tracker" icon={Activity} label="Azúcar" />
        <NavButton view="chat" icon={MessageCircle} label="IA Chat" />
        <NavButton view="learn" icon={BookOpen} label="Aprender" />
        <NavButton view="store" icon={ShoppingCart} label="Tienda" />
      </nav>
    </div>
  );
};

export default App;
