import { useState, useEffect } from "react";

export default function App() {
  const [medicamentos, setMedicamentos] = useState(() => {
    return JSON.parse(localStorage.getItem("medicamentos")) || [];
  });
  const [nuevo, setNuevo] = useState({ nombre: "", dosis: "", cantidad: "", caducidad: "" });

  useEffect(() => {
    localStorage.setItem("medicamentos", JSON.stringify(medicamentos));
  }, [medicamentos]);

  const agregar = () => {
    if (!nuevo.nombre || !nuevo.dosis || !nuevo.cantidad || !nuevo.caducidad) return;
    setMedicamentos([...medicamentos, nuevo]);
    setNuevo({ nombre: "", dosis: "", cantidad: "", caducidad: "" });
  };

  const eliminar = (index) => {
    setMedicamentos(medicamentos.filter((_, i) => i !== index));
  };

  const diasRestantes = (fecha) => {
    const hoy = new Date();
    const cad = new Date(fecha);
    const diff = (cad - hoy) / (1000 * 60 * 60 * 24);
    return Math.ceil(diff);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Registro de Medicamentos</h1>

      <div className="space-y-2 mb-4">
        <input
          className="border p-2 w-full"
          placeholder="Nombre"
          value={nuevo.nombre}
          onChange={e => setNuevo({ ...nuevo, nombre: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          placeholder="Dosis (mg/ml)"
          value={nuevo.dosis}
          onChange={e => setNuevo({ ...nuevo, dosis: e.target.value })}
        />
        <input
          type="number"
          className="border p-2 w-full"
          placeholder="Cantidad"
          value={nuevo.cantidad}
          onChange={e => setNuevo({ ...nuevo, cantidad: e.target.value })}
        />
        <input
          type="date"
          className="border p-2 w-full"
          value={nuevo.caducidad}
          onChange={e => setNuevo({ ...nuevo, caducidad: e.target.value })}
        />
        <button
          onClick={agregar}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Agregar
        </button>
      </div>

      <ul className="space-y-2">
        {medicamentos.map((med, i) => {
          const dias = diasRestantes(med.caducidad);
          return (
            <li
              key={i}
              className={`p-2 border rounded ${
                dias <= 7
                  ? "bg-red-100"
                  : dias <= 30
                  ? "bg-yellow-100"
                  : "bg-green-100"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <strong>{med.nombre}</strong> - {med.dosis}
                  <div>Cantidad: {med.cantidad}</div>
                  <div>Caduca en: {dias} días</div>
                </div>
                <button
                  onClick={() => eliminar(i)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  X
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
