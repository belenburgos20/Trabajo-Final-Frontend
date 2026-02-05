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
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: 'inherit' }}>
        <img src="/assets/images/logo1.jpg" alt="logo" style={{ height: 40, cursor: 'pointer' }} />
        <h1 className="m-0" style={{ fontSize: 18, color: 'white', cursor: 'pointer' }}>
          Oleohidráulica Guardese
        </h1>
      </Link>

      <nav className="d-flex align-items-center" style={{ gap: 10 }}>
        <Link to="/" className="text-white text-decoration-none me-3">
          Inicio
        </Link>
        <Link to="/contact" className="text-white text-decoration-none me-3">
          Contacto
        </Link>

        {appCtx && appCtx.user ? (
          <>
            {appCtx.user.esAdmin ? (
              // si es admin, mostrar sólo el enlace a admin
              <>
                <Link to="/admin/dashboard" className="text-white text-decoration-none me-3">
                  Admin
                </Link>
                <button className="btn btn-sm btn-outline-light" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </>
            ) : (
              // usuario cliente: mostrar enlaces de cliente
              <>
                <Link to="/clientes/productos" className="text-white text-decoration-none me-3">
                  Productos
                </Link>
                <Link to="/clientes/perfil" className="text-white text-decoration-none me-3">
                  Perfil
                </Link>
                <button className="btn btn-sm btn-outline-light" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <Link to="/login-cliente" className="btn-header btn-header-primary">
              Ingresar
            </Link>
            <Link to="/register" className="btn-header btn-header-secondary">
              Registrarse
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
