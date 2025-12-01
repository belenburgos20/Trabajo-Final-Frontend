import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearCliente } from '../../services/clientesService';
import type { NuevoCliente } from '../../types/Cliente';
import { AppContext } from '../../context/AppContext';

export default function Register() {
  const navigate = useNavigate();

  const appCtx = useContext(AppContext);

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    contraseña: '',
    CUIT: '',
    direccion: '',
    telefono: '',
    localidad: '',
    esAdmin: false,
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.checked });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data: NuevoCliente = {
        nombre: form.nombre || undefined,
        email: form.email,
        contraseña: form.contraseña,
        CUIT: form.CUIT || undefined,
        direccion: form.direccion || undefined,
        telefono: form.telefono ? Number(form.telefono) : undefined,
        localidad: form.localidad || undefined,
        esAdmin: form.esAdmin,
      };

      const created = await crearCliente(data);
      // persistir en localStorage y en AppContext para que Perfil lo muestre inmediatamente
      try {
        localStorage.setItem('user', JSON.stringify(created));
      } catch {
        /* noop */
      }
      if (appCtx && appCtx.setUser) {
        appCtx.setUser({
          id: String(created.id),
          name: created.nombre,
          email: created.email,
          esAdmin: created.esAdmin,
        });
      }

      // Redirect: admin -> admin dashboard, cliente -> perfil
      if (created.esAdmin) navigate('/admin/dashboard');
      else navigate('/clientes/perfil');
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) setError(err.message || 'Error al registrar');
      else setError('Error al registrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content page">
      <div className="container">
        <section className="section mx-auto" style={{ maxWidth: '520px', padding: 28 }}>
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

            <input
              name="CUIT"
              value={form.CUIT}
              onChange={handleChange}
              placeholder="CUIT (opcional)"
              className="form-control"
            />

            <input
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              placeholder="Dirección"
              className="form-control"
            />

            <input
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              placeholder="Teléfono"
              className="form-control"
              type="tel"
            />

            <input
              name="localidad"
              value={form.localidad}
              onChange={handleChange}
              placeholder="Localidad"
              className="form-control"
            />

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="esAdmin"
                name="esAdmin"
                checked={form.esAdmin}
                onChange={handleCheckbox}
              />
              <label className="form-check-label" htmlFor="esAdmin">
                Registrarme como administrador
              </label>
            </div>

            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-accent" disabled={loading}>
                {loading ? 'Registrando...' : 'Registrarme'}
              </button>
            </div>
          </form>
          {error && <p className="mt-3 text-center text-danger">{error}</p>}
        </section>
      </div>
    </div>
  );
}
