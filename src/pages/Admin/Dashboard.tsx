import { useEffect, useState } from 'react';
import type { Producto } from '../../types/Producto';
import type { Presupuesto } from '../../types/Presupuesto';
import { getProductos } from '../../services/productosService';
import { getPresupuestos } from '../../services/presupestosService';

export default function Dashboard() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [presupuestos, setPresupuestos] = useState<Presupuesto[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const [p, pres] = await Promise.all([getProductos(), getPresupuestos()]);
        setProductos(p);
        setPresupuestos(pres);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className="main-content page">
      <div className="container">
        <h1 className="text-primary mb-4">Panel de administrador</h1>

        <div className="stat-grid">
          <div className="stat-card">
            <h3>Total productos</h3>
            <p>{productos.length}</p>
            <p className="small">Productos disponibles en catálogo</p>
          </div>

          <div className="stat-card">
            <h3>Total presupuestos</h3>
            <p>{presupuestos.length}</p>
            <p className="small">Presupuestos solicitados por usuarios</p>
          </div>

          <div className="stat-card">
            <h3>Últimos productos</h3>
            <p className="small">
              {productos
                .slice(-3)
                .map((p) => p.nombre)
                .join(', ') || '—'}
            </p>
          </div>
        </div>

        <section className="section">
          <h2 className="mb-3">Actividad reciente</h2>
          <p className="small">Resumen rápido de la actividad del sistema.</p>
        </section>
      </div>
    </div>
  );
}
