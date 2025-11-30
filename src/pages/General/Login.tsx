import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService } from '../../services/authService';
import { AppContext } from '../../context/AppContext';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const appCtx = useContext(AppContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await loginService({ email: form.email, password: form.password });
      localStorage.setItem('user', JSON.stringify(user));
      try {
        if (appCtx && appCtx.setUser) {
          const u = {
            id: String((user as any).id),
            name: (user as any).nombre || (user as any).name,
            email: (user as any).email,
            esAdmin: (user as any).esAdmin || false,
          };
          appCtx.setUser(u);
        }
      } catch (e) {}
      navigate('/clientes/productos');
    } catch (err: React.ChangeEvent<HTMLInputElement>) {
      console.error(err);
      const message = (err as any)?.message || 'Credenciales inválidas';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <section className="section mx-auto" style={{ maxWidth: '400px' }}>
        {' '}
        <h1 className="text-primary mb-4 text-center">Ingresar</h1>
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="form-control"
            required
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Contraseña"
            className="form-control"
            required
          />

          <button type="submit" className="btn btn-accent w-auto" disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
        {error && <p className="mt-3 text-center text-danger">{error}</p>}
      </section>
    </div>
  );
}
