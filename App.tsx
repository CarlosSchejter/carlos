
import React, { useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { User, Bell, ChevronLeft, Menu, Settings } from 'lucide-react';
import { AppView, GlucoseReading } from './types';
import { MOCK_HISTORY } from './constants';
import Dashboard from './components/Dashboard';
import Store from './components/Store';
import ChatAssistant from './components/ChatAssistant';
import LearningHub from './components/LearningHub';
import Tracker from './components/Tracker';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [history, setHistory] = useState<GlucoseReading[]>(MOCK_HISTORY);

  const getViewTitle = () => {
    switch(currentView) {
      case 'store': return 'Comprar';
      case 'chat': return 'Consultar';
      case 'learn': return 'Aprender';
      case 'tracker': return 'Mi Diabetes';
      default: return '';
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onViewChange={setCurrentView} history={history} />;
      case 'store':
        return <Store onBack={() => setCurrentView('dashboard')} />;
      case 'chat':
        return <ChatAssistant onBack={() => setCurrentView('dashboard')} />;
      case 'learn':
        return <LearningHub onBack={() => setCurrentView('dashboard')} />;
      case 'tracker':
        return <Tracker onBack={() => setCurrentView('dashboard')} history={history} setHistory={setHistory} />;
      default:
        return <Dashboard onViewChange={setCurrentView} history={history} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-white shadow-xl relative">
      {/* Header aligned to the screenshot */}
      <header className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-50">
        <div className="flex items-center gap-3">
          {currentView === 'dashboard' ? (
            <div className="bg-[#1e3a8a] px-3 py-1.5 rounded-lg flex items-center gap-2">
              <div className="bg-red-500 rounded-full p-0.5 w-4 h-4 flex items-center justify-center">
                 <span className="text-white text-[10px] font-bold">+</span>
              </div>
              <span className="text-white font-bold text-sm tracking-tight uppercase">farmatotal</span>
            </div>
          ) : (
            <button onClick={() => setCurrentView('dashboard')} className="p-1 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
          )}
        </div>

        <div className="flex-1 px-4">
           <span className="font-bold text-gray-800">{getViewTitle()}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Bell className="w-5 h-5 text-gray-400 cursor-pointer" />
            <span className="absolute -top-1 -right-1 bg-red-500 w-2.5 h-2.5 rounded-full border-2 border-white"></span>
          </div>
          <User className="w-5 h-5 text-gray-400 cursor-pointer" />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-4">
        {renderView()}
      </main>

      {currentView === 'dashboard' && (
        <footer className="p-4 flex justify-center border-t border-gray-100 bg-gray-50">
          <button className="flex items-center gap-2 text-[10px] text-gray-400 hover:text-gray-600 uppercase tracking-widest font-bold">
            <Settings className="w-3 h-3" />
            Acceso administrador
          </button>
        </footer>
      )}
    </div>
  );
};

export default App;
