import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Producto } from '../../types/Producto';
import type { Presupuesto } from '../../types/Presupuesto';
import { getProductos } from '../../services/productosService';
import { getPresupuestos } from '../../services/presupestosService';
import { listarClientes } from '../../services/clientesService';
import type { Cliente } from '../../types/Cliente';
import '../../../public/assets/css/admin/Dashboard.css';

export default function Dashboard() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [presupuestos, setPresupuestos] = useState<Presupuesto[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [p, pres, cli] = await Promise.all([
          getProductos(),
          getPresupuestos(),
          listarClientes(),
        ]);
        setProductos(p);
        setPresupuestos(pres);
        setClientes(cli);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="container">
          <div className="loading-state">
            <div className="spinner-large"></div>
            <p>Cargando datos...</p>
          </div>
        </div>
      </div>
    );
  }

  const presupuestosPendientes = presupuestos.filter((p) => p.estado === 'pendiente').length;
  const presupuestosAprobados = presupuestos.filter((p) => p.estado === 'aprobado').length;
  const presupuestosCancelados = presupuestos.filter((p) => p.estado === 'cancelado').length;
  const totalMonto = presupuestos.filter(p => p.estado?.toLowerCase() === "aprobado").reduce((sum, p) => sum + p.montoTotal, 0);
  const clientesActivos = clientes.filter((c) => !c.esAdmin).length;
  const admins = clientes.filter((c) => c.esAdmin).length;

  const productosBajoStock = productos.filter((p) => p.stock < 10).length;
  const ultimosPresupuestos = presupuestos.slice(-5).reverse();

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="container">
          <h1 className="dashboard-title">Panel de Administración</h1>
          <p className="dashboard-subtitle">Bienvenido al centro de control de Oleohidráulica Guardese</p>
        </div>
      </div>

      <div className="container">
        <div className="stats-grid">
          <div className="stat-card stat-primary">
            <div className="stat-icon">📦</div>
            <div className="stat-content">
              <h3>Productos</h3>
              <p className="stat-value">{productos.length}</p>
              <p className="stat-label">Total en catálogo</p>
            </div>
            <Link to="/admin/productos" className="stat-link">
              Ver todos →
            </Link>
          </div>

          <div className="stat-card stat-success">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <h3>Presupuestos</h3>
              <p className="stat-value">{presupuestos.length}</p>
              <p className="stat-label">Total solicitados</p>
            </div>
            <Link to="/admin/presupuestos" className="stat-link">
              Ver todos →
            </Link>
          </div>

          <div className="stat-card stat-info">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>Clientes</h3>
              <p className="stat-value">{clientesActivos}</p>
              <p className="stat-label">Clientes activos</p>
            </div>
            <Link to="/admin/clientes" className="stat-link">
              Ver todos →
            </Link>
          </div>

          <div className="stat-card stat-warning">
            <div className="stat-icon">💵</div>
            <div className="stat-content">
              <h3>Ingresos Totales</h3>
              <p className="stat-value">${totalMonto.toLocaleString()}</p>
              <p className="stat-label">Monto total presupuestado</p>
            </div>
          </div>
        </div>

        <div className="secondary-stats-grid">
          <div className="secondary-stat-card">
            <div className="secondary-stat-header">
              <span className="secondary-stat-icon">⏳</span>
              <h4>Presupuestos Pendientes</h4>
            </div>
            <p className="secondary-stat-value">{presupuestosPendientes}</p>
          </div>

          <div className="secondary-stat-card">
            <div className="secondary-stat-header">
              <span className="secondary-stat-icon">✅</span>
              <h4>Presupuestos Aprobados</h4>
            </div>
            <p className="secondary-stat-value">{presupuestosAprobados}</p>
          </div>

          <div className="secondary-stat-card">
            <div className="secondary-stat-header">
              <span className="secondary-stat-icon">❌</span>
              <h4>Presupuestos Cancelados</h4>
            </div>
            <p className="secondary-stat-value">{presupuestosCancelados}</p>
          </div>

          <div className="secondary-stat-card">
            <div className="secondary-stat-header">
              <span className="secondary-stat-icon">⚠️</span>
              <h4>Productos Bajo Stock</h4>
            </div>
            <p className="secondary-stat-value">{productosBajoStock}</p>
          </div>

          <div className="secondary-stat-card">
            <div className="secondary-stat-header">
              <span className="secondary-stat-icon">👨‍💼</span>
              <h4>Administradores</h4>
            </div>
            <p className="secondary-stat-value">{admins}</p>
          </div>
        </div>

        <div className="dashboard-sections">
          <section className="dashboard-section">
            <div className="section-header">
              <h2>Presupuestos Recientes</h2>
              <Link to="/admin/presupuestos" className="section-link">
                Ver todos →
              </Link>
            </div>
            <div className="recent-list">
              {ultimosPresupuestos.length > 0 ? (
                ultimosPresupuestos.map((pres) => (
                  <Link to={`/admin/presupuestos/`} key={pres.idPresupuesto} className="recent-item">
                    <div className="recent-item-content">
                      <h4>Presupuesto #{pres.idPresupuesto}</h4>
                      <p>Cliente ID: {pres.idUsuario} • ${pres.montoTotal.toLocaleString()}</p>
                      <span className="recent-date">{pres.fecha}</span>
                    </div>
                    <span className={`status-badge status-${pres.estado}`}>
                      {pres.estado}
                    </span>
                    </Link>
                ))
              ) : (
                <p className="empty-state">No hay presupuestos recientes</p>
              )}
            </div>
          </section>

          <section className="dashboard-section">
            <div className="section-header">
              <h2>Accesos Rápidos</h2>
            </div>
            <div className="quick-actions">
              <Link to="/admin/productos" className="quick-action-card">
                <span className="quick-action-icon">📦</span>
                <h4>Gestionar Productos</h4>
                <p>Agregar, editar o eliminar productos</p>
              </Link>
              <Link to="/admin/clientes" className="quick-action-card">
                <span className="quick-action-icon">👥</span>
                <h4>Gestionar Clientes</h4>
                <p>Ver y administrar clientes</p>
              </Link>
              <Link to="/admin/presupuestos" className="quick-action-card">
                <span className="quick-action-icon">💰</span>
                <h4>Gestionar Presupuestos</h4>
                <p>Revisar y aprobar presupuestos</p>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
