import { useEffect, useState } from 'react';
import { apiGet } from '../../services/api';

type Producto = { id: number };
type Cliente = { id: number };
type Presupuesto = { id: number; estado: string };

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [presupuestos, setPresupuestos] = useState<Presupuesto[]>([]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    Promise.all([
      apiGet<Producto[]>('/productos'),
      apiGet<Cliente[]>('/clientes'),
      apiGet<Presupuesto[]>('/presupuestos'),
    ])
      .then(([prods, clis, pres]) => {
        if (!mounted) return;
        setProductos(prods);
        setClientes(clis);
        setPresupuestos(pres);
      })
      .catch((e) => setError(String(e)))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  const totalProductos = productos.length;
  const totalClientes = clientes.length;
  const totalPresupuestos = presupuestos.length;
  const aprobados = presupuestos.filter((p) => p.estado === 'aprobado').length;
  const pendientes = presupuestos.filter((p) => p.estado === 'pendiente').length;

  return (
    <section>
      <h1>Dashboard</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
        }}
      >
        <Card title="Productos" value={totalProductos} />
        <Card title="Clientes" value={totalClientes} />
        <Card title="Presupuestos" value={totalPresupuestos} />
        <Card title="Aprobados" value={aprobados} />
        <Card title="Pendientes" value={pendientes} />
      </div>
    </section>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div style={{ border: '1px solid #eee', borderRadius: 8, padding: '1rem' }}>
      <div style={{ color: '#666', fontSize: 12 }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: 700 }}>{value}</div>
    </div>
  );
}
