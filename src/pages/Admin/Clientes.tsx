import { useEffect, useState } from 'react';
import type { Cliente } from '../../types/Cliente';
import { listarClientes } from '../../services/clientesService';
import '../../../public/assets/css/admin/Clientes.css';

export default function ClientesAdmin() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [allClientes, setAllClientes] = useState<Cliente[] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await listarClientes();
        setClientes(data);
        setAllClientes(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value.toLowerCase();
    setSearchQuery(q);
    if (!q) {
      if (allClientes) setClientes(allClientes);
      return;
    }
    const source = allClientes ?? clientes;
    setClientes(
      source.filter(
        (c) =>
          (c.nombre || '').toLowerCase().includes(q) ||
          (c.email || '').toLowerCase().includes(q) ||
          (c.CUIT || '').toLowerCase().includes(q) ||
          (c.localidad || '').toLowerCase().includes(q)
      )
    );
  };

  const clientesActivos = clientes.filter((c) => !c.esAdmin).length;
  const admins = clientes.filter((c) => c.esAdmin).length;

  if (loading) {
    return (
      <div className="admin-clientes">
        <div className="container">
          <div className="loading-state">
            <div className="spinner-large"></div>
            <p>Cargando clientes...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-clientes">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Gestión de Clientes</h1>
          <p className="page-subtitle">Administra y visualiza todos los clientes registrados</p>
        </div>
      </div>

      <div className="container">
        <div className="quick-stats">
          <div className="quick-stat-card">
            <span className="quick-stat-icon">👥</span>
            <div>
              <p className="quick-stat-value">{clientesActivos}</p>
              <p className="quick-stat-label">Clientes Activos</p>
            </div>
          </div>
          <div className="quick-stat-card">
            <span className="quick-stat-icon">👨‍💼</span>
            <div>
              <p className="quick-stat-value">{admins}</p>
              <p className="quick-stat-label">Administradores</p>
            </div>
          </div>
          <div className="quick-stat-card">
            <span className="quick-stat-icon">📊</span>
            <div>
              <p className="quick-stat-value">{clientes.length}</p>
              <p className="quick-stat-label">Total Usuarios</p>
            </div>
          </div>
        </div>

        <div className="search-section">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Buscar por nombre, email, CUIT o localidad..."
              className="search-input"
              value={searchQuery}
              onChange={handleSearch}
            />
            {searchQuery && (
              <button
                className="clear-search"
                onClick={() => {
                  setSearchQuery('');
                  if (allClientes) setClientes(allClientes);
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="table-section">
          <div className="table-header">
            <h2>Lista de Clientes</h2>
            <span className="table-count">{clientes.length} {clientes.length === 1 ? 'cliente' : 'clientes'}</span>
          </div>
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>CUIT</th>
                  <th>Teléfono</th>
                  <th>Localidad</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {clientes.length > 0 ? (
                  clientes.map((c) => (
                    <tr key={c.id}>
                      <td className="table-id">#{c.id}</td>
                      <td className="table-name">
                        {c.nombre || <span className="empty-field">Sin nombre</span>}
                      </td>
                      <td className="table-email">{c.email}</td>
                      <td>{c.CUIT || <span className="empty-field">—</span>}</td>
                      <td>
                        {c.telefono ? (
                          <a href={`tel:${c.telefono}`} className="table-link">
                            {c.telefono}
                          </a>
                        ) : (
                          <span className="empty-field">—</span>
                        )}
                      </td>
                      <td>{c.localidad || <span className="empty-field">—</span>}</td>
                      <td>
                        {c.esAdmin ? (
                          <span className="badge badge-admin">Admin</span>
                        ) : (
                          <span className="badge badge-cliente">Cliente</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="empty-state">
                      {searchQuery ? 'No se encontraron clientes con ese criterio' : 'No hay clientes registrados'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
