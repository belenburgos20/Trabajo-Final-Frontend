import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="main-content page">
      <div className="container">
        <section className="section hero text-center">
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h1 className="text-primary mb-3">Bienvenido a Oleohidráulica Guardese</h1>
            <p className="mb-4" style={{ color: 'var(--muted)' }}>
              Encuentra productos y solicita presupuestos rápidamente.
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link to="/login" className="btn btn-accent">
                Ingresar
              </Link>
              <Link to="/contact" className="btn btn-outline-primary">
                Contacto
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
