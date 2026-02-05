import { useState } from 'react';
import { type NuevaCategoria } from '../../types/Categoria';

interface Props {
  onSubmit: (data: NuevaCategoria) => void;
}

export default function CategoriaForm({ onSubmit }: Props) {
  const [nombre, setNombre] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ nombre });
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-white shadow-sm rounded">
      <div className="mb-3">
        <label className="form-label">Nombre de categoría</label>
        <input
          type="text"
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-accent">
        Guardar
      </button>
    </form>
  );
}
