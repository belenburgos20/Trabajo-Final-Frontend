import { useEffect, useState } from 'react';
import type { Cliente } from '../../types/Cliente';
import { listarClientes } from '../../services/clientesService';

export default function ClientesAdmin() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [allClientes, setAllClientes] = useState<Cliente[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await listarClientes();
        setClientes(data);
        setAllClientes(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className="main-content page">
      <div className="container">
        <h1 className="text-primary mb-4">Gestión de Clientes</h1>

        <section className="section mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mb-0">Clientes</h2>
            <input
              placeholder="Buscar por nombre o email"
              className="form-control"
              style={{ width: 320 }}
              onChange={(e) => {
                const q = e.target.value.toLowerCase();
                if (!q) {
                  if (allClientes) setClientes(allClientes);
                  return;
                }
                const source = allClientes ?? clientes;
                setClientes(
                  source.filter(
                    (c) =>
                      (c.nombre || '').toLowerCase().includes(q) ||
                      (c.email || '').toLowerCase().includes(q)
                  )
                );
              }}
            />
          </div>
        </section>

        <section className="section">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>CUIT</th>
                  <th>Localidad</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.nombre}</td>
                    <td>{c.email}</td>
                    <td>{c.CUIT}</td>
                    <td>{c.localidad}</td>
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
