import { useEffect, useState, useContext } from 'react';
import { useClientes } from '../../hooks';
import { AppContext } from '../../context/AppContext';
import type { Cliente } from '../../types/Cliente';

export default function Perfil() {
  const {
    fetchClienteById,
    updateCliente,
    isLoading: hookLoading,
    error: hookError,
  } = useClientes();
  const appCtx = useContext(AppContext);
  const [usuario, setUsuario] = useState<Cliente | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const id = appCtx?.user?.id; // Obtener el ID del usuario autenticado desde el contexto
        if (!id) {
          console.error('ID de usuario no definido en el contexto');
          return;
        }
        const data = await fetchClienteById(Number(id));
        if (data) setUsuario(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [fetchClienteById, appCtx?.user?.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const editable = new Set(['email', 'direccion', 'telefono', 'localidad']);
    const name = e.target.name;
    if (!editable.has(name)) return;
    setUsuario((prev) => (prev ? { ...prev, [name]: e.target.value } : prev));
  };

  const guardar = async () => {
    if (!usuario) return;
    if (!usuario.id || isNaN(Number(usuario.id))) {
      setMessage('El ID del usuario no es válido o no está definido.');
      return;
    }

    setSaving(true);
    setMessage(null);
    try {
      const payload = {
        email: usuario.email,
        direccion: usuario.direccion,
        telefono: usuario.telefono ? Number(usuario.telefono) : undefined,
        localidad: usuario.localidad,
        password: usuario.password,
      } as Partial<typeof usuario>;

      const updated = await updateCliente(usuario.id, payload);
      if (updated) {
        setUsuario(updated);
        setMessage('Datos actualizados');
      } else {
        setMessage(hookError || 'Error al actualizar');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        setMessage(err.message);
      } else {
        setMessage('Error desconocido al guardar');
      }
    } finally {
      setSaving(false);
    }
  };

  if (hookLoading)
    return (
      <div className="main-content page">
        <div className="container">
          <section className="section text-center">Cargando...</section>
        </div>
      </div>
    );
  if (!usuario)
    return (
      <div className="main-content page">
        <div className="container">
          <section className="section text-center">No se encontró usuario.</section>
        </div>
      </div>
    );

  return (
    <div className="main-content page">
      <div className="container">
        <section className="section mx-auto" style={{ maxWidth: '500px' }}>
          <h1 className="text-primary mb-4 text-center">Mi perfil</h1>
          <div className="d-flex flex-column gap-3">
            <div>
              <label className="form-label">Nombre</label>
              <input name="nombre" value={usuario.nombre ?? ''} className="form-control" readOnly />
            </div>
            <div>
              <label className="form-label">CUIT</label>
              <input name="cuit" value={usuario.cuit ?? ''} className="form-control" readOnly />
            </div>

            <div>
              <label className="form-label">Email</label>
              <input
                name="email"
                value={usuario.email ?? ''}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div>
              <label className="form-label">Dirección</label>
              <input
                name="direccion"
                value={usuario.direccion ?? ''}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div>
              <label className="form-label">Teléfono</label>
              <input
                name="telefono"
                value={usuario.telefono ?? ''} // Manejar valores null
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div>
              <label className="form-label">Localidad</label>
              <input
                name="localidad"
                value={usuario.localidad ?? ''}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div>
              <label className="form-label">Contraseña</label>
              <input
                name="password"
                value={usuario.password ? '********' : ''}
                onChange={handleChange}
                className="form-control"
                readOnly
              />
            </div>

            <button className="btn btn-accent w-auto mt-2" onClick={guardar} disabled={saving}>
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </button>

            {message && (
              <p
                className={`mt-3 text-center ${message.includes('Error') ? 'text-danger' : 'text-success'}`}
              >
                {message}
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
