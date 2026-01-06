src/components/Dashboard.tsx


export default function LearningHub({ onBack }) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Learning Hub</h2>
      <button onClick={onBack} className="text-blue-600 underline">Volver</button>
    </div>
  );
}

