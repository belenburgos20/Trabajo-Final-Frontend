import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthWithContext } from '../../hooks';
import '../../../public/assets/css/General/LoginAdmin.css';

export default function LoginAdmin() {
  const navigate = useNavigate();
  const { login, isLoading, error, isAuthenticated, isAdmin } = useAuthWithContext();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  useEffect(() => {
    if (isAuthenticated) {
      if (!isAdmin) {
        setLocalError(
          'Esta es la página de ingreso para administradores. Los clientes deben usar el portal de clientes.'
        );
        return;
      }
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    const user = await login(form.email, form.password);

    if (!user) {
      setLocalError(error || 'Credenciales inválidas');
    }
  };

  return (
    <div className="login-admin-page">
      <section className="login-admin-hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Portal de Administración</h1>
            <p className="hero-subtitle">
              Gestiona productos, clientes y presupuestos desde el panel de administración.
            </p>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="login-admin-wrapper">
          <div className="login-admin-card">
            <div className="login-admin-header">
              <div className="login-icon">⚙️</div>
              <h2>Iniciar Sesión - Administrador</h2>
              <p>Acceso exclusivo para personal autorizado</p>
            </div>

            <form onSubmit={handleSubmit} className="login-admin-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-wrapper">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="admin@empresa.com"
                    className="form-input"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <div className="input-wrapper">
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

              {localError && (
                <div className="form-error">
                  <span className="error-icon">⚠️</span>
                  {localError}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-accent login-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Ingresando...
                  </>
                ) : (
                  <>Ingresar como Administrador</>
                )}
              </button>

              <div className="client-link-section">
                <p>¿Eres cliente?</p>
                <Link to="/login-cliente" className="client-link">
                  Ingresar como cliente →
                </Link>
              </div>
            </form>
          </div>

          <div className="login-admin-features">
            <h3>Funciones de administración</h3>
            <div className="features-list">
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <div>
                  <h4>Dashboard</h4>
                  <p>Vista general de estadísticas y métricas</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">👥</span>
                <div>
                  <h4>Gestión de clientes</h4>
                  <p>Administra la información de los clientes</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📦</span>
                <div>
                  <h4>Gestión de productos</h4>
                  <p>Administra el catálogo de productos</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📋</span>
                <div>
                  <h4>Gestión de presupuestos</h4>
                  <p>Revisa y aprueba presupuestos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
