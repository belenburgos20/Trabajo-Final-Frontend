import { useEffect, useState } from 'react';
import type { Presupuesto } from '../../types/Presupuesto';
import { getPresupuestos } from '../../services/presupestosService';

export default function PresupuestosAdmin() {
  const [presupuestos, setPresupuestos] = useState<Presupuesto[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPresupuestos();
        setPresupuestos(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div>
      <h1 className="text-primary mb-4">Gestión de Presupuestos</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>Usuario</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {presupuestos.map((p) => (
            <tr key={p.idPresupuesto}>
              <td>{p.idPresupuesto}</td>
              <td>{p.idUsuario}</td>
              <td>{p.fecha}</td>
              <td>{p.montoTotal}</td>
              <td>{p.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
