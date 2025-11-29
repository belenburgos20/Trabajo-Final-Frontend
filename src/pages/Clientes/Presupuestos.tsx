import { useEffect, useState } from 'react';
import { getPresupuestosPorUsuario } from '../../services/presupuestosService';
import PresupuestoCard from '../../components/PresupuestoCard/Index';

export default function PresupuestosHistorial() {
  const [historial, setHistorial] = useState<any[]>([]);
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
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Error al obtener historiales');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="main-content">
      <section className="section mx-auto" style={{ maxWidth: '700px' }}>
        {' '}
        <h1 className="text-primary mb-4 text-center">Mis presupuestos</h1>
        {loading && <p className="text-center">Cargando presupuestos...</p>}
        {error && <p className="text-center text-danger">{error}</p>}
        {!loading && !error && historial.length === 0 && (
          <p className="text-center">No hay presupuestos.</p>
        )}
        <div className="d-flex flex-column gap-3">
          {historial.map((p) => (
            <PresupuestoCard key={p.id} presupuesto={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
