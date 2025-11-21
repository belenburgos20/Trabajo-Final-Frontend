import { useEffect, useMemo, useState } from 'react';
import { apiGet } from '../../services/api';

type Presupuesto = { id: number; cliente: string; estado: string; total: number };

const ESTADOS = ['todos', 'pendiente', 'aprobado', 'rechazado'] as const;

type Filtro = (typeof ESTADOS)[number];

export default function PresupuestosAdmin() {
  const [data, setData] = useState<Presupuesto[]>([]);
  const [estado, setEstado] = useState<Filtro>('todos');
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    apiGet<Presupuesto[]>('/presupuestos')
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
    let result = data;
    if (estado !== 'todos') result = result.filter((p) => p.estado === estado);
    const t = q.trim().toLowerCase();
    if (t) result = result.filter((p) => p.cliente.toLowerCase().includes(t));
    return result;
  }, [data, estado, q]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section>
      <h1>Presupuestos</h1>
      <div style={{ display: 'flex', gap: '0.5rem', margin: '0.5rem 0', flexWrap: 'wrap' }}>
        <select value={estado} onChange={(e) => setEstado(e.target.value as Filtro)}>
          {ESTADOS.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por cliente"
          style={{ padding: '0.5rem', width: 240 }}
        />
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '0.5rem' }}>
              Cliente
            </th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '0.5rem' }}>
              Estado
            </th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '0.5rem' }}>
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p.id}>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0' }}>{p.cliente}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0' }}>{p.estado}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0' }}>${p.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
