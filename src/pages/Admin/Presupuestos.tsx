import { useEffect, useState } from 'react';
import type { Presupuesto } from '../../types/Presupuesto';
import { getPresupuestos } from '../../services/presupestosService';

export default function PresupuestosAdmin() {
  const [presupuestos, setPresupuestos] = useState<Presupuesto[]>([]);
  const [filter, setFilter] = useState<string>('all');

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

  const filtered =
    filter === 'all' ? presupuestos : presupuestos.filter((p) => p.estado === filter);

  return (
    <div className="main-content page">
      <div className="container">
        <h1 className="text-primary mb-4">Gestión de Presupuestos</h1>

        <section className="section mb-3 d-flex justify-content-between align-items-center">
          <h2 className="mb-0">Presupuestos</h2>
          <div className="d-flex gap-2 align-items-center">
            <label className="mb-0">Estado:</label>
            <select
              className="form-control"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Todos</option>
              <option value="pendiente">Pendiente</option>
              <option value="aprobado">Aprobado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
        </section>

        <section className="section">
          <div className="table-responsive">
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
                {filtered.map((p) => (
                  <tr key={p.idPresupuesto}>
                    <td>{p.idPresupuesto}</td>
                    <td>{p.idUsuario}</td>
                    <td>{p.fecha}</td>
                    <td>{p.montoTotal}</td>
                    <td>
                      <span
                        className={`badge ${p.estado === 'pendiente' ? 'pending' : p.estado === 'aprobado' ? 'approved' : 'cancelled'}`}
                      >
                        {p.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
