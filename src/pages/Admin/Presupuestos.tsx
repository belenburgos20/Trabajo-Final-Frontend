import { useState } from 'react';
import type { Presupuesto } from '../../types/Presupuesto';
import { usePresupuestos } from '../../hooks';
import PresupuestoCard from '../../components/PresupuestoCard/Index';
import '../../../public/assets/css/admin/Presupuestos.css';

export default function PresupuestosAdmin() {
  const { presupuestos, isLoading, updatePresupuesto, fetchPresupuestos } = usePresupuestos(true);

  const [filter, setFilter] = useState<string>('all');
  const [selected, setSelected] = useState<Presupuesto | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleActualizarEstado = async (id: number, nuevoEstado: string) => {
    const updated = await updatePresupuesto(String(id), { estado: nuevoEstado });
    if (updated) {
      await fetchPresupuestos();
      if (selected?.idPresupuesto === id) {
        setSelected((prev) => (prev ? { ...prev, estado: nuevoEstado } : null));
      }
    }
  };

  const filtered =
    filter === 'all' ? presupuestos : presupuestos.filter((p) => p.estado === filter);

  const searched = searchQuery
    ? filtered.filter(
        (p) =>
          String(p.idPresupuesto).includes(searchQuery) ||
          String(p.idUsuario).includes(searchQuery) ||
          String(p.montoTotal).includes(searchQuery)
      )
    : filtered;

  const presupuestosPendientes = presupuestos.filter((p) => p.estado === 'pendiente').length;
  const presupuestosAprobados = presupuestos.filter((p) => p.estado === 'aprobado').length;
  const totalMonto = presupuestos.filter(p => p.estado?.toLowerCase() === "aprobado").reduce((sum, p) => sum + p.montoTotal, 0);

  if (isLoading) {
    return (
      <div className="admin-presupuestos">
        <div className="container">
          <div className="loading-state">
            <div className="spinner-large"></div>
            <p>Cargando presupuestos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-presupuestos">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Gestión de Presupuestos</h1>
          <p className="page-subtitle">Revisa y administra todos los presupuestos solicitados</p>
        </div>
      </div>

      <div className="container">
        <div className="quick-stats">
          <div className="quick-stat-card">
            <span className="quick-stat-icon">📋</span>
            <div>
              <p className="quick-stat-value">{presupuestos.length}</p>
              <p className="quick-stat-label">Total Presupuestos</p>
            </div>
          </div>
          <div className="quick-stat-card stat-warning">
            <span className="quick-stat-icon">⏳</span>
            <div>
              <p className="quick-stat-value">{presupuestosPendientes}</p>
              <p className="quick-stat-label">Pendientes</p>
            </div>
          </div>
          <div className="quick-stat-card stat-success">
            <span className="quick-stat-icon">✅</span>
            <div>
              <p className="quick-stat-value">{presupuestosAprobados}</p>
              <p className="quick-stat-label">Aprobados</p>
            </div>
          </div>
          <div className="quick-stat-card stat-info">
            <span className="quick-stat-icon">💵</span>
            <div>
              <p className="quick-stat-value">${totalMonto.toLocaleString()}</p>
              <p className="quick-stat-label">Monto Total</p>
            </div>
          </div>
        </div>

        <div className="filters-section">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Buscar por ID, usuario o monto..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery('')}>
                ✕
              </button>
            )}
          </div>
          <div className="filter-wrapper">
            <label>Filtrar por estado:</label>
            <select
              className="filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Todos</option>
              <option value="pendiente">Pendiente</option>
              <option value="aprobado">Aprobado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
        </div>

        <div className="table-section">
          <div className="table-header">
            <h2>Lista de Presupuestos</h2>
            <span className="table-count">
              {searched.length} {searched.length === 1 ? 'presupuesto' : 'presupuestos'}
            </span>
          </div>
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Usuario</th>
                  <th>Fecha</th>
                  <th>Monto Total</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                  {searched.map((p) => (
                    <>
                    <tr
                      key={p.idPresupuesto}
                      className={selected?.idPresupuesto === p.idPresupuesto ? 'selected' : ''}
                    >
                      <td className="table-id">#{p.idPresupuesto}</td>
                      <td>Cliente {p.idUsuario}</td>
                      <td>{p.fecha ? new Date(p.fecha).toLocaleDateString('es-AR') : "-"}</td>
                      <td className="table-amount">${p.montoTotal.toLocaleString()}</td>
                      <td>
                        <span className={`status-badge status-${p.estado}`}>{p.estado}</span>
                      </td>
                      <td>
                        <button className='btn btn-outline-primary btn-sm'
                          onClick={() =>
                            setSelected(
                              selected?.idPresupuesto === p.idPresupuesto ? null : p
                            )
                          }                     
                        >
                          {selected?.idPresupuesto === p.idPresupuesto ? 'Ocultar' : 'Ver Detalle'}
                        </button>
                      </td>
                    </tr>
                   
                    {selected?.idPresupuesto === p.idPresupuesto && (
                      <tr className="detalle-row">
                        <td colSpan={6} className="detalle-cell">
                          <PresupuestoCard
                            presupuesto={p}
                            onActualizarEstado={handleActualizarEstado}
                          />
                          {p.estado === 'pendiente' && (
                            <div className="acciones-presupuesto">
                              
                               <button className='btn btn-outline-primary btn-sm'
                                onClick={() => handleActualizarEstado(p.idPresupuesto, 'aprobado')}
                              >
                                Aceptar Presupuesto
                              </button>
                              <button className='btn btn-outline-primary btn-sm'
                              
                                onClick={() => handleActualizarEstado(p.idPresupuesto, 'cancelado')}
                              >
                                Cancelar Presupuesto
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                  </>
                  ))}

              </tbody>
                 <tr>
                   <td colSpan={7} className="empty-state">
                    {searchQuery || filter !== 'all'
              //           ? 'No se encontraron presupuestos con ese criterio'
              //           : 'No hay presupuestos registrados'}
                   } 
                   </td>
                 </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
