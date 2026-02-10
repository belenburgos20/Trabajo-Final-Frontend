import { useEffect, useContext } from 'react';
import { usePresupuestos } from '../../hooks';
import { AppContext } from '../../context/AppContext';
import PresupuestoCard from '../../components/PresupuestoCard/Index';
import type { Presupuesto } from '../../types/Presupuesto';

export default function PresupuestosHistorial() {
  const appCtx = useContext(AppContext);
  const { presupuestos, isLoading, error, fetchPresupuestosPorUsuario } = usePresupuestos(false);

  const normalizePresupuesto = (presupuesto: any): Presupuesto => {
    return {
      idPresupuesto: presupuesto.id,
      idUsuario: presupuesto.idUsuario,
      fecha: presupuesto.fecha_creacion,
      detalle: [],
      montoTotal: Number(presupuesto.monto_total) || 0,
      estado: presupuesto.estado || 'desconocido',
    };
  };

  useEffect(() => {
    const user = appCtx?.user;
    if (user?.id) {
      const userId = Number(user.id);
      if (isNaN(userId)) {
        console.error('ID del usuario no es un número válido:', user.id);
        return;
      }
      fetchPresupuestosPorUsuario(userId.toString());
    } else {
      console.error('ID de usuario no definido en el contexto'); // Log de error si el ID no está definido
    }
  }, [appCtx?.user?.id, fetchPresupuestosPorUsuario]);

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  const presupuestosNormalizados = presupuestos.map(normalizePresupuesto);

  return (
    <div className="main-content page">
      <div className="container">
        <section className="section" style={{ maxWidth: '760px', margin: '0 auto' }}>
          <h1 className="text-primary mb-4 text-center">Mis presupuestos</h1>
          {isLoading && <p className="text-center">Cargando presupuestos...</p>}
          {error && <p className="text-center text-danger">{error}</p>}
          {!isLoading && !error && presupuestos.length === 0 && (
            <p className="text-center">No hay presupuestos.</p>
          )}

          <div className="d-flex flex-column gap-3">
            {presupuestosNormalizados.map((p) => (
              <PresupuestoCard
                key={p.idPresupuesto}
                presupuesto={p}
                //  onActualizarEstado={handleActualizarEstado}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
