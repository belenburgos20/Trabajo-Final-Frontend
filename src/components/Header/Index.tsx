import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

export default function Header() {
  const navigate = useNavigate();
  const appCtx = useContext(AppContext);

  const handleLogout = () => {
    try {
      localStorage.removeItem('user');
    } catch {
      /* ignore */
    }
    if (appCtx && appCtx.setUser) appCtx.setUser(null);
    navigate('/');
  };

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

        {appCtx && appCtx.user ? (
          <>
            {appCtx.user.esAdmin && (
              <Link to="/admin/dashboard" className="text-white text-decoration-none me-3">
                Admin
              </Link>
            )}
            <Link to="/clientes/perfil" className="text-white text-decoration-none me-3">
              Perfil
            </Link>
            <button className="btn btn-sm btn-outline-light" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-sm btn-accent me-2">
              Ingresar
            </Link>
            <Link to="/register" className="btn btn-sm btn-accent">
              Registrarse
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
