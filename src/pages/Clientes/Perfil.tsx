import { useEffect, useState } from 'react';
import { getClienteById, actualizarCliente } from '../../services/clientesService';
import type { Cliente } from '../../types/Cliente';

export default function Perfil() {
  const [usuario, setUsuario] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const stored: Partial<Cliente> = JSON.parse(localStorage.getItem('user') || '{}');
        const id = stored?.id;
        if (!id) {
          setUsuario(stored as Cliente);
          setLoading(false);
          return;
        }
        const data = await getClienteById(Number(id));
        // si el mock/backend no devuelve el usuario (por ejemplo, mock no persistente),
        // fallback a los datos guardados en localStorage para que el perfil muestre lo cargado al registrarse
        if (data) setUsuario(data);
        else setUsuario(stored as Cliente);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow editing of specific fields from the client UI
    const editable = new Set(['email', 'direccion', 'telefono', 'localidad']);
    const name = e.target.name;
    if (!editable.has(name)) return;
    setUsuario((prev) => (prev ? { ...prev, [name]: e.target.value } : prev));
  };

  const guardar = async () => {
    if (!usuario) return;
    setSaving(true);
    setMessage(null);
    try {
      const payload = {
        email: usuario.email,
        direccion: usuario.direccion,
        telefono: usuario.telefono ? Number(usuario.telefono) : undefined,
        localidad: usuario.localidad,
      } as Partial<typeof usuario>;
      const updated = await actualizarCliente(usuario.id, payload);
      setUsuario(updated);
      // keep localStorage user data in sync
      localStorage.setItem('user', JSON.stringify(updated));
      setMessage('Datos actualizados');
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

  if (loading)
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
              <label className="form-label">ID</label>
              <input name="id" value={usuario.id} className="form-control" readOnly />
            </div>
            <div>
              <label className="form-label">Nombre</label>
              <input name="nombre" value={usuario.nombre ?? ''} className="form-control" readOnly />
            </div>
            <div>
              <label className="form-label">CUIT</label>
              <input name="CUIT" value={usuario.CUIT ?? ''} className="form-control" readOnly />
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
                value={usuario.telefono ?? ''}
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
              <label className="form-label">Administrador</label>
              <input
                name="esAdmin"
                value={usuario.esAdmin ? 'Sí' : 'No'}
                className="form-control"
                readOnly
              />
            </div>

            <div>
              <label className="form-label">Contraseña</label>
              <input
                name="contraseña"
                value={usuario.contraseña ? '********' : ''}
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
