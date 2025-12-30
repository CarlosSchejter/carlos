
import React from 'react';
import { PlayCircle, FileText, Lightbulb, ChevronRight } from 'lucide-react';

interface LearningHubProps {
  onBack: () => void;
}

const LearningHub: React.FC<LearningHubProps> = () => {
  const articles = [
    { id: 1, title: 'Control del conteo de carbohidratos', time: '5 min lectura', type: 'guide', icon: <FileText className="w-4 h-4" /> },
    { id: 2, title: 'Diabetes Tipo 2: Primeros pasos', time: '12 min video', type: 'video', icon: <PlayCircle className="w-4 h-4" /> },
    { id: 3, title: 'Importancia de la hidratación', time: '3 min lectura', type: 'tip', icon: <Lightbulb className="w-4 h-4" /> },
  ];

  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Aprender</h2>
        <p className="text-sm text-gray-500">Educación para una vida saludable</p>
      </div>

      {/* Featured Content */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 mb-8">
        <div className="h-40 bg-sky-500 relative">
          <img src="https://picsum.photos/seed/health/600/400" className="w-full h-full object-cover opacity-60" alt="Learning" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 p-3 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
              <PlayCircle className="w-10 h-10 text-sky-600" />
            </div>
          </div>
        </div>
        <div className="p-5">
          <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest bg-sky-50 px-2 py-1 rounded-md">Recomendado</span>
          <h3 className="text-lg font-bold text-gray-900 mt-2">Cómo usar tu nuevo Glucómetro Pro</h3>
          <p className="text-sm text-gray-500 mt-1">Aprendé paso a paso el proceso de medición para evitar errores comunes.</p>
        </div>
      </div>

      <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">Contenido Reciente</h3>
      
      <div className="space-y-4">
        {articles.map(article => (
          <div key={article.id} className="bg-white p-5 rounded-3xl flex items-center justify-between shadow-sm border border-gray-50 cursor-pointer hover:border-sky-200 transition-colors group">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${
                article.type === 'guide' ? 'bg-blue-50 text-blue-500' :
                article.type === 'video' ? 'bg-rose-50 text-rose-500' :
                'bg-amber-50 text-amber-500'
              }`}>
                {article.icon}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">{article.title}</h4>
                <p className="text-[10px] text-gray-400 font-medium uppercase mt-0.5">{article.time}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-sky-500 transition-colors" />
          </div>
        ))}
      </div>

      {/* Newsletter/CTA */}
      <div className="mt-10 bg-sky-50 p-6 rounded-3xl border border-sky-100">
        <h4 className="font-bold text-sky-900 mb-2">¿Querés saber más?</h4>
        <p className="text-sm text-sky-700 leading-relaxed mb-4">Unite a nuestro programa de educación semanal y recibí consejos directo en tu mail.</p>
        <button className="w-full bg-sky-600 text-white font-bold py-3 rounded-2xl shadow-lg shadow-sky-200 transition-transform active:scale-95">
          Suscribirme Gratis
        </button>
      </div>
    </div>
  );
};

export default LearningHub;
