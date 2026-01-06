
export default function Tracker({ onBack, history }) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Mi Diabetes</h2>

      <p className="text-gray-600 mb-4">
        Historial de mediciones: {history.length}
      </p>

      <button onClick={onBack} className="text-blue-600 underline">Volver</button>
    </div>
  );
}

