import { useState } from 'react';
import { type NuevoProducto } from '../../types/Producto';
import { type Categoria } from '../../types/Categoria';

interface Props {
  categorias: Categoria[];
  onSubmit: (data: NuevoProducto) => void;
}

export default function ProductoForm({ categorias, onSubmit }: Props) {
  const [form, setForm] = useState<NuevoProducto>({
    nombre: '',
    descripcion: '',
    idCategoria: 0,
    stock: 0,
    precio: undefined,
  });

  const handleChange = <K extends keyof NuevoProducto>(field: K, value: NuevoProducto[K]) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-white shadow-sm rounded">
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          className="form-control"
          value={form.nombre}
          onChange={(e) => handleChange('nombre', e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <input
          className="form-control"
          value={form.descripcion}
          onChange={(e) => handleChange('descripcion', e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Categoría</label>
        <select
          className="form-select"
          value={form.idCategoria}
          onChange={(e) => handleChange('idCategoria', Number(e.target.value))}
          required
        >
          <option value={0}>Seleccionar categoría</option>
          {categorias.map((c) => (
            <option key={c.idCategoria} value={c.idCategoria}>
              {c.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Stock</label>
        <input
          type="number"
          className="form-control"
          value={form.stock}
          onChange={(e) => handleChange('stock', Number(e.target.value))}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Precio (opcional)</label>
        <input
          type="number"
          className="form-control"
          value={form.precio ?? ''}
          onChange={(e) =>
            handleChange('precio', e.target.value ? Number(e.target.value) : undefined)
          }
        />
      </div>

      <button type="submit" className="btn btn-accent">
        Guardar
      </button>
    </form>
  );
}
