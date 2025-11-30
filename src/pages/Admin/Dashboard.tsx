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
    <div>
      <h1 className="text-primary mb-4">Panel de administrador</h1>
      <div className="d-flex gap-3 mb-3">
        <div className="card p-3">
          <h2>Total productos</h2>
          <p>{productos.length}</p>
        </div>

        <div className="card p-3">
          <h2>Total presupuestos</h2>
          <p>{presupuestos.length}</p>
        </div>
      </div>
    </div>
  );
}
