/**
 * EJEMPLO: Integración de Hooks con AppContext
 *
 * Este archivo muestra cómo combinar los hooks personalizados
 * con el contexto global de la aplicación (AppContext)
 */

import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useAuth } from './useAuth';

/**
 * Hook personalizado que combina useAuth con AppContext
 * Proporciona funcionalidad de autenticación integrada con el estado global
 */
export function useAuthWithContext() {
  const context = useContext(AppContext);
  const { login: authLogin, logout: authLogout, isLoading, error } = useAuth();
  const navigate = useNavigate();

  if (!context) {
    throw new Error('useAuthWithContext debe usarse dentro de AppProvider');
  }

  const { user, setUser } = context;

  /**
   * Login con persistencia en contexto y localStorage
   */
  const login = async (email: string, password: string) => {
    const cliente = await authLogin(email, password);

    if (cliente) {
      // Transformar Cliente a User (formato del contexto)
      const userForContext = {
        id: String(cliente.id),
        name: cliente.nombre,
        email: cliente.email,
        esAdmin: cliente.esAdmin, // Asegurarse de incluir la propiedad esAdmin
      };

      // Guardar en contexto
      setUser(userForContext);

      // Persistir en localStorage
      localStorage.setItem('user', JSON.stringify(userForContext));

      // Guardar el token en localStorage
      if (cliente.token) {
        localStorage.setItem('token', cliente.token);
      } else {
        console.warn('No se recibió un token del backend.');
      }

      // Redirigir según tipo de usuario
      if (cliente.esAdmin) {
        navigate('/admin');
      } else {
        navigate('/clientes');
      }

      return cliente;
    }

    return null;
  };

  /**
   * Logout con limpieza de contexto y localStorage
   */
  const logout = async () => {
    const success = await authLogout();

    if (success) {
      // Limpiar contexto
      setUser(null);

      // Limpiar localStorage
      localStorage.removeItem('user');

      // Redirigir al login
      navigate('/login');

      return true;
    }

    return false;
  };

  return {
    user,
    login,
    logout,
    isLoading,
    error,
    isAuthenticated: !!user,
    isAdmin: user?.esAdmin || false,
  };
}

// ============================================
// EJEMPLO DE USO EN COMPONENTE DE LOGIN
// ============================================

/**
 * Ejemplo de componente Login usando el hook integrado
 */
export function LoginPageExample() {
  const { login, isLoading, error, isAuthenticated } = useAuthWithContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirigir si ya está autenticado
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    await login(email, password);
    // La redirección se maneja automáticamente en el hook
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input type="email" className="form-control" id="email" name="email" required />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Iniciando sesión...
                    </>
                  ) : (
                    'Iniciar Sesión'
                  )}
                </button>
              </form>

              <div className="text-center mt-3">
                <a href="/registro">¿No tienes cuenta? Regístrate</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// EJEMPLO DE USO EN HEADER/NAVBAR
// ============================================

/**
 * Ejemplo de componente Header con autenticación
 */
export function HeaderExample() {
  const { user, logout, isAuthenticated, isAdmin } = useAuthWithContext();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Mi Tienda
        </a>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">Hola, {user?.name || user?.email}</span>
                </li>

                {isAdmin && (
                  <li className="nav-item">
                    <a className="nav-link" href="/admin">
                      Panel Admin
                    </a>
                  </li>
                )}

                <li className="nav-item">
                  <a className="nav-link" href="/mis-presupuestos">
                    Mis Presupuestos
                  </a>
                </li>

                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={logout}>
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Iniciar Sesión
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/registro">
                    Registrarse
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

// ============================================
// EJEMPLO DE PROTECCIÓN DE RUTAS
// ============================================

/**
 * Componente para proteger rutas que requieren autenticación
 */
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthWithContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
}

/**
 * Componente para proteger rutas de administrador
 */
export function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAdmin, isLoading } = useAuthWithContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate('/login');
      } else if (!isAdmin) {
        navigate('/'); // Redirigir a home si no es admin
      }
    }
  }, [isAuthenticated, isAdmin, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return isAuthenticated && isAdmin ? <>{children}</> : null;
}
