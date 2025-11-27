import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearCliente } from '../../services/clientesService';
import type { NuevoCliente } from '../../types/Cliente';

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    contraseña: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data: NuevoCliente = {
        nombre: form.nombre || undefined,
        email: form.email,
        contraseña: form.contraseña,
      };

      await crearCliente(data);
      navigate('/login');
    } catch (err: React.ChangeEvent<HTMLInputElement>) {
      console.error(err);
      setError(err.message || 'Error al registrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <section className="section mx-auto" style={{ maxWidth: '400px' }}>
        {' '}
        <h1 className="text-primary mb-4 text-center">Registro</h1>
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            className="form-control"
            required
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            className="form-control"
            required
          />

          <input
            name="contraseña"
            value={form.contraseña}
            onChange={handleChange}
            placeholder="Contraseña"
            type="password"
            className="form-control"
            required
          />

          <button type="submit" className="btn btn-accent w-auto" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarme'}
          </button>
        </form>
        {error && <p className="mt-3 text-center text-danger">{error}</p>}
      </section>
    </div>
  );
}
