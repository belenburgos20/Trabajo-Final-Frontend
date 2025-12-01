import { useEffect, useState } from 'react';
import { getPresupuestosPorUsuario } from '../../services/presupestosService';
import PresupuestoCard from '../../components/PresupuestoCard/Index';
import type { Presupuesto } from '../../types/Presupuesto';

export default function PresupuestosHistorial() {
  const [historial, setHistorial] = useState<Presupuesto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const id = user?.id;
        if (!id) {
          setError('Usuario no autenticado');
          setLoading(false);
          return;
        }
        const data = await getPresupuestosPorUsuario(String(id));
        setHistorial(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err);
          setError(err.message);
        } else {
          setError('Error desconocido al obtener historiales');
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="main-content page">
      <div className="container">
        <section className="section" style={{ maxWidth: '760px', margin: '0 auto' }}>
          <h1 className="text-primary mb-4 text-center">Mis presupuestos</h1>
          {loading && <p className="text-center">Cargando presupuestos...</p>}
          {error && <p className="text-center text-danger">{error}</p>}
          {!loading && !error && historial.length === 0 && (
            <p className="text-center">No hay presupuestos.</p>
          )}

          <div className="d-flex flex-column gap-3">
            {historial.map((p) => (
              <PresupuestoCard key={p.idPresupuesto} presupuesto={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
