import { useState } from 'react';
import { type NuevoCliente } from '../../types/Cliente';

interface Props {
  onSubmit: (data: NuevoCliente) => void;
}

export default function UsuarioForm({ onSubmit }: Props) {
  const [form, setForm] = useState<NuevoCliente>({
    nombre: '',
    email: '',
    CUIT: '',
    direccion: '',
    telefono: 0,
    localidad: '',
    contraseña: '',
  });

  const handleChange = <K extends keyof NuevoCliente>(field: K, value: NuevoCliente[K]) => {
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
          type="text"
          className="form-control"
          value={form.nombre}
          onChange={(e) => handleChange('nombre', e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">CUIT</label>
        <input
          type="text"
          className="form-control"
          value={form.CUIT}
          onChange={(e) => handleChange('CUIT', e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Dirección</label>
        <input
          type="text"
          className="form-control"
          value={form.direccion}
          onChange={(e) => handleChange('direccion', e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Teléfono</label>
        <input
          type="number"
          className="form-control"
          value={form.telefono}
          onChange={(e) => handleChange('telefono', Number(e.target.value))}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Localidad</label>
        <input
          type="text"
          className="form-control"
          value={form.localidad}
          onChange={(e) => handleChange('localidad', e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Contraseña</label>
        <input
          type="password"
          className="form-control"
          value={form.contraseña}
          onChange={(e) => handleChange('contraseña', e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-accent">
        Crear Usuario
      </button>
    </form>
  );
}
