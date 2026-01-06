
export default function Dashboard({ onViewChange, history }) {
  return (
    <div className="p-6 bg-yellow-100 min-h-screen">
      <h2 className="text-2xl font-bold text-red-600">✅ Dashboard cargado</h2>
      <p className="mt-4 text-gray-700">Historial: {history.length} mediciones</p>
    </div>
  );
}

