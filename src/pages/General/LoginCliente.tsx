import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthWithContext } from '../../hooks';
import '../../../public/assets/css/General/LoginCliente.css';

export default function LoginCliente() {
  const navigate = useNavigate();
  const { login, isLoading, error, isAuthenticated, isAdmin } = useAuthWithContext();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        setLocalError(
          'Esta es la página de ingreso para clientes. Los administradores deben usar el portal de administración.'
        );
        return;
      }
      navigate('/clientes/productos');
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
    <div className="login-cliente-page">
      <section className="login-cliente-hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Portal de Clientes</h1>
            <p className="hero-subtitle">
              Accede a nuestro catálogo completo de productos oleohidráulicos y gestiona tus
              presupuestos de forma sencilla.
            </p>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="login-cliente-wrapper">
          <div className="login-cliente-card">
            <div className="login-cliente-header">
              <div className="login-icon">🛒</div>
              <h2>Iniciar Sesión - Cliente</h2>
              <p>Ingresa tus credenciales para acceder a tu cuenta</p>
            </div>

            <form onSubmit={handleSubmit} className="login-cliente-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-wrapper">
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
                  <>Ingresar como Cliente</>
                )}
              </button>

              <div className="login-divider">
                <span>¿No tienes una cuenta?</span>
              </div>

              <Link to="/register" className="btn btn-outline-primary register-link">
                Crear cuenta nueva
              </Link>

              <div className="admin-link-section">
                <p>¿Eres administrador?</p>
                <Link to="/login-admin" className="admin-link">
                  Ingresar como administrador →
                </Link>
              </div>
            </form>
          </div>

          <div className="login-cliente-features">
            <h3>Beneficios de ser cliente</h3>
            <div className="features-list">
              <div className="feature-item">
                <span className="feature-icon">📦</span>
                <div>
                  <h4>Catálogo completo</h4>
                  <p>Accede a todos nuestros productos oleohidráulicos</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💰</span>
                <div>
                  <h4>Presupuestos personalizados</h4>
                  <p>Solicita presupuestos adaptados a tus necesidades</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🛒</span>
                <div>
                  <h4>Carrito de compras</h4>
                  <p>Gestiona tus pedidos de forma sencilla</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <div>
                  <h4>Seguimiento de pedidos</h4>
                  <p>Consulta el estado de tus presupuestos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
