import { Link } from 'react-router-dom';
import '../../../public/assets/css/General/Login.css';

export default function Login() {
  return (
    <div className="login-select-page">
      <section className="login-select-hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Bienvenido de vuelta</h1>
            <p className="hero-subtitle">
              Selecciona el tipo de cuenta para acceder a tu portal
            </p>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="login-select-wrapper">
          <div className="login-select-card cliente-card">
            <div className="card-icon">🛒</div>
            <h2>Portal de Clientes</h2>
            <p>Accede a nuestro catálogo completo de productos oleohidráulicos, gestiona tus presupuestos y realiza pedidos.</p>
            <ul className="card-features">
              <li>📦 Catálogo completo de productos</li>
              <li>💰 Presupuestos personalizados</li>
              <li>🛒 Carrito de compras</li>
              <li>📊 Seguimiento de pedidos</li>
            </ul>
            <Link to="/login-cliente" className="btn btn-accent card-button">
              Ingresar como Cliente
            </Link>
          </div>

          <div className="login-select-card admin-card">
            <div className="card-icon">⚙️</div>
            <h2>Portal de Administración</h2>
            <p>Gestiona productos, clientes y presupuestos desde el panel de administración.</p>
            <ul className="card-features">
              <li>📊 Dashboard con estadísticas</li>
              <li>👥 Gestión de clientes</li>
              <li>📦 Gestión de productos</li>
              <li>📋 Gestión de presupuestos</li>
            </ul>
            <Link to="/login-admin" className="btn btn-primary card-button">
              Ingresar como Admin
            </Link>
          </div>
        </div>

        <div className="register-section">
          <p>¿No tienes una cuenta?</p>
          <Link to="/register" className="btn btn-outline-primary">
            Crear cuenta nueva
          </Link>
        </div>
      </div>
    </div>
  );
}
