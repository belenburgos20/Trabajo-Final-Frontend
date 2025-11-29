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
        setUsuario(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsuario((prev) => (prev ? { ...prev, [e.target.name]: e.target.value } : prev));

  const guardar = async () => {
    if (!usuario) return;
    setSaving(true);
    setMessage(null);
    try {
      const updated = await actualizarCliente(usuario.id, usuario);
      setUsuario(updated);
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
      <div className="main-content">
        {' '}
        <section className="section text-center">Cargando...</section>{' '}
      </div>
    );
  if (!usuario)
    return (
      <div className="main-content">
        {' '}
        <section className="section text-center">No se encontró usuario.</section>{' '}
      </div>
    );

  return (
    <div className="main-content">
      <section className="section mx-auto" style={{ maxWidth: '500px' }}>
        {' '}
        <h1 className="text-primary mb-4 text-center">Mi perfil</h1>
        <div className="d-flex flex-column gap-3">
          <div>
            <label className="form-label">Nombre</label>
            <input
              name="nombre"
              value={usuario.nombre ?? ''}
              onChange={handleChange}
              className="form-control"
            />
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
            <label className="form-label">Teléfono</label>
            <input
              name="telefono"
              value={usuario.telefono ?? ''}
              onChange={handleChange}
              className="form-control"
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
  );
}
