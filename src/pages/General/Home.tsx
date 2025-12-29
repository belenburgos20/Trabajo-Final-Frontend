import { Link } from 'react-router-dom';
import '../../../public/assets/css/General/Home.css';

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Bienvenido a Oleohidráulica Guardese</h1>
            <p className="hero-subtitle">
              Soluciones integrales en oleohidráulica. Encuentra productos de calidad y solicita presupuestos personalizados.
            </p>
            <div className="hero-buttons">
              <Link to="/login" className="btn btn-accent btn-hero">
                Ingresar
              </Link>
              <Link to="/register" className="btn btn-outline-primary btn-hero">
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className='quienes-somos'>
        <h2 className="section-title">¿Quienes somos?</h2>
        <p className="section-subtitle">
        Somos una empresa dedicada a la reparación y venta de sistemas hidráulicos, viales, agrícolas y de uso particular.
        </p>
        <div className="quienes-somos-grid">
          <div className="quienes-somos-card">
            <h3>Misión</h3>
            <p>Ofrecer soluciones hidráulicas de alta calidad a nuestros clientes, garantizando la eficiencia y durabilidad de sus sistemas.</p>
          </div>
          <div className="quienes-somos-card">
            <h3>Visión</h3>
            <p>Ser una empresa líder en la venta de productos oleohidráulicos de alta calidad y en la prestación de servicios de alta calidad a nuestros clientes.</p>
          </div>
          <div className="quienes-somos-card">
            <h3>Historia</h3>
            <p>Fundada en 2010 por Claudio Omar Guardese, comenzamos como una pequeña empresa de reparación de sistemas hidráulicos, y hoy en día somos una empresa dedicada en la venta de productos oleohidráulicos de alta calidad y la mejor prestación de servicios, generando confianza y satisfacción en nuestros clientes.</p>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Características */}
        <section className="features-section">
          <h2 className="section-title">¿Por qué elegirnos?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Respuesta Rápida</h3>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔧</div>
              <h3>Productos de Calidad</h3>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Atención Personalizada</h3>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📦</div>
              <h3>Gestión Simplificada</h3>
            </div>
          </div>
        </section>

        {/* Productos Destacados */}
        <section className="products-section">
          <h2 className="section-title">Algunos de nuestros productos</h2>
          <p className="section-subtitle">
            Explora nuestra amplia gama de productos oleohidráulicos de alta calidad
          </p>
          <p className="section-subtitle-2">
          Ofrecemos trabajos con garantía de 6 meses
          </p>
          <div className="products-grid">
            <div className="product-showcase">
              <div className="product-image-wrapper">
                <img 
                  src="/assets/images/bombas-hidraulicas.jpg" 
                  alt="Bombas Hidráulicas" 
                  className="product-image"
                />
                <div className="product-overlay">
                  <h3>Bombas Hidráulicas</h3>
                  <p>Equipos de alta eficiencia para sistemas oleohidráulicos</p>
                </div>
              </div>
            </div>
            <div className="product-showcase">
              <div className="product-image-wrapper">
                <img 
                  src="/assets/images/cilindro-de-piston.jpg" 
                  alt="Cilindros de Pistón" 
                  className="product-image"
                />
                <div className="product-overlay">
                  <h3>Cilindros de Pistón</h3>
                  <p>Componentes robustos para aplicaciones industriales</p>
                </div>
              </div>
            </div>
            <div className="product-showcase">
              <div className="product-image-wrapper">
                <img 
                  src="/assets/images/manguera-reforzada.jpg" 
                  alt="Mangueras Reforzadas" 
                  className="product-image"
                />
                <div className="product-overlay">
                  <h3>Mangueras Reforzadas</h3>
                  <p>Mangueras de alta resistencia para sistemas de presión</p>
                </div>
              </div>
            </div>
            <div className="product-showcase">
              <div className="product-image-wrapper">
                <img 
                  src="/assets/images/Conectores.jpg" 
                  alt="Conectores" 
                  className="product-image"
                />
                <div className="product-overlay">
                  <h3>Conectores</h3>
                  <p>Conectores de alta calidad para sistemas hidráulicos</p>
                </div>
              </div>
            </div>
            <div className="product-showcase">
              <div className="product-image-wrapper">
                <img 
                  src="/assets/images/O'rings.jpg" 
                  alt="O'rings" 
                  className="product-image"
                />
                <div className="product-overlay">
                  <h3>O'rings</h3>
                  <p>Juntas tóricas de sellado para sistemas hidráulicos</p>
                </div>
              </div>
            </div>
            <div className="product-showcase">
              <div className="product-image-wrapper">
                <img 
                  src="/assets/images/TEE.jpg" 
                  alt="Tees" 
                  className="product-image"
                />
                <div className="product-overlay">
                  <h3>Tees</h3>
                  <p>Conectores en T para distribución de fluidos</p>
                </div>
              </div>
            </div>
            <div className="product-showcase">
              <div className="product-image-wrapper">
                <img 
                  src="/assets/images/Terminales.jpg" 
                  alt="Terminales" 
                  className="product-image"
                />
                <div className="product-overlay">
                  <h3>Terminales</h3>
                  <p>Terminales y accesorios para conexiones hidráulicas</p>
                </div>
              </div>
            </div>
            <div className="product-showcase">
              <div className="product-image-wrapper">
                <img 
                  src="/assets/images/WIPER.jpg" 
                  alt="Wipers" 
                  className="product-image"
                />
                <div className="product-overlay">
                  <h3>Wipers</h3>
                  <p>Retenes y limpiadores para cilindros hidráulicos</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>¿Listo para comenzar?</h2>
            <p>
              Regístrate ahora y accede a nuestro catálogo completo de productos oleohidráulicos.
              Solicita presupuestos personalizados y gestiona tus pedidos de forma sencilla.
            </p>
            <div className="cta-buttons">
              <Link to="/register" className="btn btn-accent btn-large">
                Crear Cuenta Gratis
              </Link>
              <Link to="/contact" className="btn btn-outline-primary btn-large">
                Contactar
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
