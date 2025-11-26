import { useEffect, useMemo, useState } from 'react';
import { apiGet } from '../../services/api';

type Producto = { id: number; nombre: string; precio: number };

export default function ProductosAdmin() {
  const [data, setData] = useState<Producto[]>([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    apiGet<Producto[]>('/productos')
      .then((res) => {
        if (mounted) setData(res);
      })
      .catch((e) => setError(String(e)))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return data;
    return data.filter((p) => p.nombre.toLowerCase().includes(t));
  }, [data, q]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section>
      <h1>Productos</h1>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar por nombre"
        style={{ padding: '0.5rem', margin: '0.5rem 0', width: '100%', maxWidth: 400 }}
      />
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '0.5rem' }}>
              Nombre
            </th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '0.5rem' }}>
              Precio
            </th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p.id}>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0' }}>{p.nombre}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0' }}>${p.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}