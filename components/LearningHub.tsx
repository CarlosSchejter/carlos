
import React, { useState } from 'react';
import { PlayCircle, FileText, ChevronRight, Youtube, GraduationCap, Calendar, MapPin, Users, Send, CheckCircle2, X } from 'lucide-react';

interface Workshop {
  id: string;
  title: string;
  date: string;
  location: string;
  totalSpots: number;
  availableSpots: number;
}

const LearningHub: React.FC = () => {
  const [videos] = useState([
    {
      id: "6fGSc65h6-o",
      title: "Uso correcto del Glucómetro",
      duration: "4:15",
      description: "Aprendé a medirte sin dolor y obtené resultados exactos.",
      url: "https://www.youtube.com/watch?v=6fGSc65h6-o"
    },
    {
      id: "P0GvWv6l8sc",
      title: "Alimentación y Diabetes",
      duration: "6:30",
      description: "Cómo elegir tus porciones para mantener la glucosa estable.",
      url: "https://www.youtube.com/watch?v=P0GvWv6l8sc"
    }
  ]);

  const [articles] = useState([
    { title: 'Cuidado Integral de los Pies', source: 'Mayo Clinic', url: 'https://www.mayoclinic.org/es/diseases-conditions/diabetes/in-depth/amputation-and-diabetes/art-20045762' },
    { title: '¿Qué hacer ante una Hipoglucemia?', source: 'Fundación Diabetes', url: 'http://www.fad.org.ar/educacion/que-es-la-hipoglucemia' }
  ]);

  const [workshops, setWorkshops] = useState<Workshop[]>([
    {
      id: 'taller-1',
      title: 'Próximo Taller (Temática a confirmar)',
      date: 'Fecha y hora a confirmar',
      location: 'Lugar a confirmar',
      totalSpots: 30,
      availableSpots: 30
    },
    {
      id: 'taller-2',
      title: 'Nueva Charla Informativa (A confirmar)',
      date: 'Fecha y hora a confirmar',
      location: 'Lugar a confirmar',
      totalSpots: 20,
      availableSpots: 20
    }
  ]);

  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleOpenLink = (url: string) => {
    window.open(url, '_blank');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWorkshop) return;

    setWorkshops(prev => prev.map(w => 
      w.id === selectedWorkshop.id 
        ? { ...w, availableSpots: Math.max(0, w.availableSpots - 1) }
        : w
    ));

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setSelectedWorkshop(null);
      setFormData({ name: '', phone: '', email: '' });
    }, 3000);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-full pb-32">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">Aprender</h2>
          <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">Educación Farmatotal</p>
        </div>
        <div className="bg-blue-600 p-4 rounded-3xl shadow-lg">
          <GraduationCap className="w-8 h-8 text-white" />
        </div>
      </div>

      <h3 className="text-[10px] font-black text-slate-400 mb-6 flex items-center gap-3 uppercase tracking-[0.3em] px-2">
         <Calendar className="w-4 h-4 text-blue-800" /> Próximos Talleres
      </h3>

      <div className="space-y-4 mb-10">
        {workshops.map((workshop) => (
          <button 
            key={workshop.id}
            onClick={() => setSelectedWorkshop(workshop)}
            disabled={workshop.availableSpots === 0}
            className={`w-full text-left bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 transition-all active:scale-[0.98] relative overflow-hidden ${workshop.availableSpots === 0 ? 'opacity-60 grayscale' : 'hover:border-blue-200'}`}
          >
            <h4 className="text-lg font-black text-slate-900 leading-tight mb-4 pr-12">{workshop.title}</h4>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-slate-500">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold">{workshop.date}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold">{workshop.location}</span>
              </div>
            </div>

            <div className="mt-5 pt-5 border-t border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-400" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {workshop.availableSpots > 0 ? `${workshop.availableSpots} Lugares libres` : 'Cupo Lleno'}
                </span>
              </div>
              <div className="bg-blue-900 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                {workshop.availableSpots > 0 ? 'Inscribirse' : 'Agotado'}
              </div>
            </div>
          </button>
        ))}
      </div>

      <h3 className="text-[10px] font-black text-slate-400 mb-6 flex items-center gap-3 uppercase tracking-[0.3em] px-2">
         <Youtube className="w-4 h-4 text-red-600" /> Videos Tutoriales
      </h3>

      <div className="grid grid-cols-1 gap-6 mb-10">
        {videos.map((video, idx) => (
          <div 
            key={idx}
            onClick={() => handleOpenLink(video.url)}
            className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 cursor-pointer active:scale-[0.98] transition-all"
          >
            <div className="h-44 bg-slate-900 relative">
              <img 
                src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} 
                className="w-full h-full object-cover opacity-70" 
                alt={video.title} 
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <PlayCircle className="w-12 h-12 text-white/90 fill-current" />
              </div>
              <div className="absolute bottom-4 right-4 bg-black/60 text-white text-[10px] font-black px-2 py-1 rounded-md backdrop-blur-sm">
                {video.duration}
              </div>
            </div>
            <div className="p-6">
              <h4 className="text-lg font-black text-slate-900 leading-tight mb-2">{video.title}</h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">{video.description}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-[10px] font-black text-slate-400 mb-6 flex items-center gap-3 uppercase tracking-[0.3em] px-2">
         <FileText className="w-4 h-4 text-blue-600" /> Notas de Interés
      </h3>

      <div className="space-y-4">
        {articles.map((article, i) => (
          <div 
            key={i} 
            onClick={() => handleOpenLink(article.url)}
            className="bg-white p-6 rounded-[2.5rem] flex items-center justify-between shadow-sm border border-slate-100 active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-0.5">{article.source}</p>
                <h4 className="font-bold text-slate-900 text-sm leading-tight">{article.title}</h4>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300" />
          </div>
        ))}
      </div>

      {selectedWorkshop && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-sm rounded-[3rem] p-8 shadow-2xl relative animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setSelectedWorkshop(null)}
              className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            {isSuccess ? (
              <div className="py-10 text-center space-y-4">
                <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">¡Inscripción Exitosa!</h3>
                <p className="text-sm font-bold text-slate-500">Te esperamos el día del taller. Guardá este recordatorio.</p>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-6">
                <div>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Completá tus datos</p>
                  <h3 className="text-xl font-black text-slate-900 leading-tight">Inscripción a: {selectedWorkshop.title}</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-1 block">Nombre Completo</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Ej: Juan Perez"
                      className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-2 ring-blue-600/20"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-1 block">Celular de Contacto</label>
                    <input 
                      required
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="261..."
                      className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-2 ring-blue-600/20"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-blue-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all"
                >
                  <Send className="w-5 h-5" /> Confirmar Mi Lugar
                </button>
                <p className="text-[8px] text-center text-slate-400 font-bold uppercase tracking-widest">Al confirmar, descontaremos 1 cupo de la lista.</p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningHub;
