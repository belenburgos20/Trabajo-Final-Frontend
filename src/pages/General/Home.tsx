import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="main-content">
      {' '}
      <section className="section text-center">
        {' '}
        <h1 className="text-primary mb-3">Bienvenido</h1>{' '}
        <p className="mb-4">Portal general de la empresa.</p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link to="/login" className="btn btn-accent">
            Ingresar
          </Link>
          <Link to="/contact" className="btn btn-outline-primary">
            Contacto
          </Link>
        </div>
      </section>
    </div>
  );
}
