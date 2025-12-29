import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login as loginService } from '../../services/authService';
import { AppContext } from '../../context/AppContext';
import type { Cliente } from '../../types/Cliente';
import '../../../public/assets/css/General/Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
            id: String((user as Cliente).id),
            name: (user as Cliente).nombre || (user as Cliente).nombre,
            email: (user as Cliente).email,
            esAdmin: (user as Cliente).esAdmin || false,
          };
          appCtx.setUser(u);
        }
      } catch {
        /* non-critical */
      }
      // redirigir según rol
      const isAdmin = (user as Cliente).esAdmin || false;
      if (isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/clientes/productos');
      }
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : 'Credenciales inválidas';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Hero Section */}
      <section className="login-hero">
        <div className="container">
          <div className="login-hero-content">
            <h1 className="login-hero-title">Bienvenido de vuelta</h1>
            <p className="login-hero-subtitle">
              Ingresa a tu cuenta para acceder a nuestros productos y servicios
            </p>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="login-wrapper">
          <div className="login-card">
            <div className="login-header">
              <h2>Iniciar Sesión</h2>
              <p>Ingresa tus credenciales para continuar</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-wrapper">
                  <span className="input-icon">✉️</span>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className="form-input"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Ingresa tu contraseña"
                    className="form-input"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Recordarme</span>
                </label>
                <a href="#" className="forgot-password">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {error && (
                <div className="form-error">
                  <span className="error-icon">⚠️</span>
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                className="btn btn-accent login-submit-btn" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Ingresando...
                  </>
                ) : (
                  <>
                    <span>🚀</span>
                    Ingresar
                  </>
                )}
              </button>

              <div className="login-divider">
                <span>¿No tienes una cuenta?</span>
              </div>

              <Link to="/register" className="btn btn-outline-primary register-link">
                Crear cuenta nueva
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
