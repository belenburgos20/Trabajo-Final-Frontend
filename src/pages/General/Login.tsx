import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || 'Error en login');
      }

      const user = await res.json();
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/clientes/productos');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Credenciales inválidas');
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
