import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useClientes } from '../../hooks';
import type { NuevoCliente } from '../../types/Cliente';
import { AppContext } from '../../context/AppContext';
import '../../../public/assets/css/General/Register.css';

// Código de acceso para registro de administradores (solo personal autorizado)
const ADMIN_ACCESS_CODE = 'GUARDESE2024';

export default function Register() {
  const navigate = useNavigate();
  const appCtx = useContext(AppContext);
  const { createCliente, isLoading, error: hookError } = useClientes();

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    CUIT: '',
    direccion: '',
    telefono: '',
    localidad: '',
    esAdmin: false,
    codigoAdmin: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (hookError) {
      setError(hookError); // Actualizar el estado de error cuando hookError cambie
    }
  }, [hookError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.checked });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reiniciar el estado de error antes de intentar registrar

    // Validar código de acceso si se intenta registrar como admin
    if (form.esAdmin) {
      if (!form.codigoAdmin || form.codigoAdmin.trim() === '') {
        setError(
          'Debes ingresar el código de acceso de administrador para registrarte como administrador.'
        );
        return;
      }
      if (form.codigoAdmin.trim() !== ADMIN_ACCESS_CODE) {
        setError(
          'Código de acceso de administrador incorrecto. Solo el personal autorizado puede registrarse como administrador.'
        );
        return;
      }
    }

    const data: NuevoCliente = {
      nombre: form.nombre || undefined,
      email: form.email,
      password: form.password,
      CUIT: form.CUIT || undefined,
      direccion: form.direccion || undefined,
      telefono: form.telefono ? Number(form.telefono) : undefined,
      localidad: form.localidad || undefined,
      esAdmin: form.esAdmin,
    };

    try {
      const created = await createCliente(data);
      if (!created) {
        setError(hookError || 'Error al registrar.');
        return;
      }

      // Si el registro es exitoso, limpiar el estado de error
      setError(null);
      localStorage.setItem('user', JSON.stringify(created));
      if (appCtx && appCtx.setUser) {
        appCtx.setUser({
          id: String(created.id),
          name: created.nombre,
          email: created.email,
          esAdmin: created.esAdmin,
        });
      }

      if (created.esAdmin) navigate('/admin/dashboard');
      else navigate('/clientes/perfil');
    } catch (err) {
      setError('Error inesperado al registrar.');
    }
  };

  return (
    <div className="register-page">
      <section className="register-hero">
        <div className="container">
          <div className="register-hero-content">
            <h1 className="register-hero-title">Crea tu cuenta</h1>
            <p className="register-hero-subtitle">
              Únete a nosotros y accede a productos y servicios de calidad
            </p>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="register-wrapper">
          <div className="register-card">
            <div className="register-header">
              <h2>Registro</h2>
              <p>Completa el formulario para crear tu cuenta</p>
            </div>

            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-section">
                <h3 className="form-section-title">Información Personal</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre completo *</label>
                    <div className="input-wrapper">
                      <input
                        id="nombre"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        placeholder="Tu nombre completo"
                        className="form-input"
                        required
                        autoComplete="name"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <div className="input-wrapper">
                      <input
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        type="email"
                        className="form-input"
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contraseña">Contraseña *</label>
                    <div className="input-wrapper">
                      <input
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Mínimo 6 caracteres"
                        type={showPassword ? 'text' : 'password'}
                        className="form-input"
                        required
                        autoComplete="new-password"
                        minLength={6}
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
                </div>
              </div>

              <div className="form-section">
                <h3 className="form-section-title">Información de Contacto (Opcional)</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="telefono">Teléfono</label>
                    <div className="input-wrapper">
                      <input
                        id="telefono"
                        name="telefono"
                        value={form.telefono}
                        onChange={handleChange}
                        placeholder="+54 9 11 1234-5678"
                        type="tel"
                        className="form-input"
                        autoComplete="tel"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="direccion">Dirección</label>
                    <div className="input-wrapper">
                      <input
                        id="direccion"
                        name="direccion"
                        value={form.direccion}
                        onChange={handleChange}
                        placeholder="Calle y número"
                        className="form-input"
                        autoComplete="street-address"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="localidad">Localidad</label>
                    <div className="input-wrapper">
                      <input
                        id="localidad"
                        name="localidad"
                        value={form.localidad}
                        onChange={handleChange}
                        placeholder="Ciudad"
                        className="form-input"
                        autoComplete="address-level2"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="CUIT">CUIT</label>
                    <div className="input-wrapper">
                      <input
                        id="CUIT"
                        name="CUIT"
                        value={form.CUIT}
                        onChange={handleChange}
                        placeholder="20-12345678-9"
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="form-section-title">Acceso de Administrador</h3>
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      id="esAdmin"
                      name="esAdmin"
                      checked={form.esAdmin}
                      onChange={handleCheckbox}
                      className="checkbox-input"
                    />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-text">Registrarme como administrador</span>
                  </label>
                  <p className="admin-warning">
                    ⚠️ Solo personal autorizado de la oficina puede registrarse como administrador
                  </p>
                </div>

                {form.esAdmin && (
                  <div className="form-group admin-code-group">
                    <label htmlFor="codigoAdmin">Código de acceso de administrador *</label>
                    <div className="input-wrapper">
                      <input
                        id="codigoAdmin"
                        name="codigoAdmin"
                        value={form.codigoAdmin}
                        onChange={handleChange}
                        placeholder="Ingresa el código de acceso"
                        type="password"
                        className="form-input admin-code-input"
                        required={form.esAdmin}
                        autoComplete="off"
                      />
                    </div>
                    <p className="admin-code-hint">
                      Este código solo está disponible para el personal autorizado de la empresa.
                    </p>
                  </div>
                )}
              </div>

              {error && (
                <div className="form-error">
                  <span className="error-icon">⚠️</span>
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-accent register-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Registrando...
                  </>
                ) : (
                  <>
                    <span>✨</span>
                    Crear cuenta
                  </>
                )}
              </button>

              <div className="register-divider">
                <span>¿Ya tienes una cuenta?</span>
              </div>

              <Link to="/login" className="btn btn-outline-primary login-link">
                Iniciar sesión
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
