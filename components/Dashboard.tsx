import React, { useState, useEffect } from 'react';
import { AppView, GlucoseReading } from '../types';
import { Heart, Plus, MessageCircle, MapPin, Navigation, Settings, QrCode, Copy, Share2, X, AlertCircle, ExternalLink, ChevronRight, Info, CheckCircle2, Download, Globe, Rocket, Link2, Monitor, Smartphone, Check } from 'lucide-react';

interface DashboardProps {
  onViewChange: (view: AppView) => void;
  history: GlucoseReading[];
  isAdmin: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewChange, history, isAdmin }) => {
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [copied, setCopied] = useState(false);
  const [officialUrl, setOfficialUrl] = useState('');
  
  // WhatsApp de Patricia: 5492616798352
  const PATRICIA_PHONE = "5492616798352";
  
  useEffect(() => {
    const savedUrl = localStorage.getItem('farmatotal_official_url');
    if (savedUrl) {
      setOfficialUrl(savedUrl);
    } else {
      const current = window.location.href.split('?')[0].split('#')[0];
      if (current.includes('github.io')) {
        setOfficialUrl(current);
        localStorage.setItem('farmatotal_official_url', current);
      }
    }
  }, []);

  const handleSaveUrl = (url: string) => {
    const cleanUrl = url.trim();
    setOfficialUrl(cleanUrl);
    localStorage.setItem('farmatotal_official_url', cleanUrl);
  };

  const isGitHub = officialUrl.toLowerCase().includes('github.io');
  const isCurrentlyInPreview = window.location.href.includes('lovable.app') || window.location.href.includes('preview');
  const linkToUse = officialUrl || window.location.href;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${encodeURIComponent(linkToUse)}&bgcolor=ffffff&color=1e3a8a&margin=20`;

  const copyLink = () => {
    navigator.clipboard.writeText(linkToUse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = qrUrl;
    link.target = '_blank';
    link.download = 'QR_Farmatotal_Diabetes.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const lastReading = history.length > 0 ? history[history.length - 1] : null;
  const lastDate = lastReading 
    ? new Date(lastReading.timestamp).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' }) 
    : '---';

  return (
    <div className="p-6 pb-40 space-y-8 animate-in fade-in duration-500">
      
      {isAdmin && (
        <div className="bg-slate-900 rounded-[2.5rem] p-1 shadow-2xl border border-white/10">
          <button 
            onClick={() => setShowAdminPanel(true)}
            className={`w-full ${isGitHub ? 'bg-emerald-600' : 'bg-amber-500'} text-white p-5 rounded-[2.2rem] flex items-center justify-between px-8 font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 group`}
          >
            <div className="flex items-center gap-4">
              <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              <span>{isGitHub ? 'Sistema Configurado' : 'Configuración Pendiente'}</span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full">
              <span className={`w-2 h-2 rounded-full animate-pulse ${isGitHub ? 'bg-white' : 'bg-amber-200'}`}></span>
              <span className="text-[8px] font-black">ADMIN</span>
            </div>
          </button>
        </div>
      )}

      <div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter">¡Hola!</h1>
        <p className="text-slate-500 font-bold text-lg">¿Cómo estás hoy?</p>
      </div>

      <button 
        onClick={() => onViewChange('tracker')}
        className="w-full bg-white p-10 rounded-[4rem] border-2 border-slate-50 shadow-2xl shadow-blue-900/10 text-left active:scale-95 transition-all group"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-rose-500 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Último Registro</p>
            <p className="text-sm font-bold text-slate-900">{lastDate}</p>
          </div>
        </div>
        
        <div className="flex items-baseline justify-between mb-10">
          <span className="text-[10rem] font-black text-slate-900 tracking-tighter leading-none">
            {lastReading?.value || '--'}
          </span>
          <span className="text-lg font-black text-slate-300 uppercase tracking-widest">mg/dL</span>
        </div>
        
        <div className="bg-blue-800 text-white py-6 rounded-[2.5rem] flex items-center justify-center gap-4 font-black text-lg uppercase tracking-widest shadow-xl group-hover:bg-blue-700 transition-colors">
           <Plus className="w-8 h-8 stroke-[4px]" /> Nuevo Control
        </div>
      </button>

      <button 
        onClick={() => window.open(`https://wa.me/${PATRICIA_PHONE}?text=${encodeURIComponent('Hola Patricia de Farmatotal, necesito ayuda con mi tratamiento para la diabetes.')}`, '_blank')}
        className="w-full bg-emerald-500 text-white p-8 rounded-[3.5rem] flex items-center justify-center gap-6 shadow-xl active:scale-95 transition-all"
      >
        <div className="bg-white/20 p-4 rounded-full">
           <MessageCircle className="w-10 h-10 fill-current" />
        </div>
        <div className="text-left">
           <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Asesoramiento</p>
           <h3 className="text-2xl font-black leading-tight">Hablar con Farmacia</h3>
        </div>
      </button>

      {showAdminPanel && (
        <div className="fixed inset-0 z-[200] bg-slate-900/98 backdrop-blur-2xl flex items-center justify-center p-6 overflow-y-auto">
          <div className="bg-white w-full max-w-md rounded-[4rem] p-8 md:p-12 shadow-2xl relative my-auto animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setShowAdminPanel(false)}
              className="absolute top-8 right-8 p-3 bg-slate-100 rounded-full text-slate-400"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-8">
              <div className="text-center">
                <div className={`w-20 h-20 rounded-[2.5rem] flex items-center justify-center mx-auto text-white shadow-xl mb-4 ${isGitHub ? 'bg-emerald-600' : 'bg-amber-500'}`}>
                  {isGitHub ? <CheckCircle2 className="w-10 h-10" /> : <AlertCircle className="w-10 h-10" />}
                </div>
                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Setup de la App</h3>
                <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">Asegurá el funcionamiento del QR</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 px-2">
                  <div className="bg-blue-100 text-blue-900 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black">1</div>
                  <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Link de Producción (GitHub)</p>
                </div>
                
                <div className="relative group">
                  <input 
                    type="text" 
                    value={officialUrl}
                    onChange={(e) => handleSaveUrl(e.target.value)}
                    placeholder="https://tu-usuario.github.io/tu-repo/"
                    className="w-full bg-slate-100 border-2 border-slate-200 rounded-3xl px-6 py-5 text-xs font-bold text-blue-900 outline-none focus:border-blue-600 focus:bg-white transition-all"
                  />
                  <Link2 className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-blue-600" />
                </div>
              </div>

              <div className="bg-slate-50 p-8 rounded-[3.5rem] border-2 border-slate-100 shadow-inner flex flex-col items-center">
                <div className="bg-white p-4 rounded-3xl shadow-sm mb-6 border border-slate-200">
                  <img src={qrUrl} alt="QR de la Farmacia" className="w-44 h-44 rounded-xl" />
                </div>
                
                <div className="w-full grid grid-cols-1 gap-3">
                  <button 
                    onClick={downloadQR}
                    className="w-full bg-blue-900 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg"
                  >
                    <Download className="w-5 h-5" /> Descargar QR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="text-center py-6 opacity-20">
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Farmatotal • Diabetes Care</p>
      </div>

    </div>
  );
};

export default Dashboard;