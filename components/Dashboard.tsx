
import React from "react";

export default function Dashboard({ onViewChange, history }) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>

      <button
        onClick={() => onViewChange("store")}
        className="block w-full bg-blue-600 text-white py-2 rounded mb-2"
      >
        Ir a Store
      </button>

      <button
        onClick={() => onViewChange("chat")}
        className="block w-full bg-green-600 text-white py-2 rounded mb-2"
      >
        Ir a Consultar
      </button>

      <button
        onClick={() => onViewChange("learn")}
        className="block w-full bg-purple-600 text-white py-2 rounded mb-2"
      >
        Ir a Aprender
      </button>

      <button
        onClick={() => onViewChange("tracker")}
        className="block w-full bg-orange-600 text-white py-2 rounded"
      >
        Ir a Mi Diabetes
      </button>
    </div>
  );
}
