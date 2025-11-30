import { useEffect, useState } from 'react';
import type { Cliente } from '../../types/Cliente';
import { listarClientes } from '../../services/clientesService';

export default function ClientesAdmin() {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await listarClientes();
        setClientes(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div>
      <h1 className="text-primary mb-4">Gestión de Clientes</h1>
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
  );
}
