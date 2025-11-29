import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="App-header d-flex justify-content-between align-items-center px-4">
      <h1 className="m-0">Oleohidráulica Guardese</h1>

      <nav className="d-flex align-items-center">
        <Link to="/" className="text-white text-decoration-none me-3">
          Home
        </Link>
        <Link to="/contact" className="text-white text-decoration-none me-3">
          Contacto
        </Link>
        <Link to="/login" className="btn btn-sm btn-accent me-2">
          Ingresar
        </Link>
        <Link to="/register" className="btn btn-sm btn-accent">
          Registrarse
        </Link>
      </nav>
    </header>
  );
}
