import { useState } from 'react';
import type { Producto } from '../../types/Producto';
import { useProductos } from '../../hooks';
import type { NuevoProducto } from '../../types/Producto';
import '../../../public/assets/css/admin/Productos.css';

export default function ProductosAdmin() {
  const { productos, isLoading, createProducto, updateProducto, deleteProducto, fetchProductos } =
    useProductos(true);

  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState<NuevoProducto>({
    nombre: '',
    descripcion: '',
    idCategoria: 1,
    stock: 0,
    precio: 0,
  });
  const [creating, setCreating] = useState(false);
  const [editingStock, setEditingStock] = useState<number>(0);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingPrice, setEditingPrice] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]:
        name === 'id_categoria' || name === 'stock' || name === 'precio' ? Number(value) : value,
    }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    const created = await createProducto({
      ...newProduct,
      id_categoria: newProduct.idCategoria, // Cambiar el nombre del campo para coincidir con el backend
    });
    if (created) {
      setNewProduct({ nombre: '', descripcion: '', idCategoria: 1, stock: 0, precio: 0 });
      setShowForm(false);
    }
    setCreating(false);
  };

  const onDelete = async (id: number) => {
    if (!confirm(`¿Estás seguro de eliminar el producto #${id}?`)) return;
    await deleteProducto(String(id));
  };

  const startEdit = (p: Producto) => {
    setEditingId(p.idProducto);
    setEditingPrice(p.precio);
    setEditingStock(p.stock);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingPrice(0);
    setEditingStock(0);
  };

  const savePrice = async () => {
    if (editingId == null) return;
    const updated = await updateProducto(String(editingId), { precio: editingPrice });
    if (updated) {
      await fetchProductos();
    }
    cancelEdit();
  };

  const saveStock = async () => {
    if (editingId == null) return;
    const updated = await updateProducto(String(editingId), { stock: editingStock });
    if (updated) {
      await fetchProductos();
    }
    cancelEdit();
  };

  const filteredProductos = productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const productosBajoStock = productos.filter((p) => p.stock < 10).length;
  const totalProductos = productos.length;

  if (isLoading) {
    return (
      <div className="admin-productos">
        <div className="container">
          <div className="loading-state">
            <div className="spinner-large"></div>
            <p>Cargando productos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-productos">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Gestión de Productos</h1>
          <p className="page-subtitle">Administra el catálogo de productos oleohidráulicos</p>
        </div>
      </div>

      <div className="container">
        <div className="quick-stats">
          <div className="quick-stat-card">
            <span className="quick-stat-icon">📦</span>
            <div>
              <p className="quick-stat-value">{totalProductos}</p>
              <p className="quick-stat-label">Total Productos</p>
            </div>
          </div>
          <div className="quick-stat-card stat-warning">
            <span className="quick-stat-icon">⚠️</span>
            <div>
              <p className="quick-stat-value">{productosBajoStock}</p>
              <p className="quick-stat-label">Bajo Stock</p>
            </div>
          </div>
        </div>

        <div className="actions-bar">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Buscar productos..."
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
          <button
            className="btn btn-primary add-product-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '✕ Cancelar' : '+ Agregar Producto'}
          </button>
        </div>

        {showForm && (
          <div className="new-product-form">
            <h3>Nuevo Producto</h3>
            <form onSubmit={handleCreate} className="product-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre del Producto *</label>
                  <input
                    name="nombre"
                    value={newProduct.nombre}
                    onChange={handleNewChange}
                    placeholder="Ej: Bomba hidráulica"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Precio *</label>
                  <input
                    name="precio"
                    type="number"
                    value={newProduct.precio}
                    onChange={handleNewChange}
                    placeholder="0"
                    className="form-input"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  name="descripcion"
                  value={newProduct.descripcion}
                  onChange={handleNewChange}
                  placeholder="Descripción del producto..."
                  className="form-input"
                  rows={3}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Stock *</label>
                  <input
                    name="stock"
                    type="number"
                    value={newProduct.stock}
                    onChange={handleNewChange}
                    placeholder="0"
                    className="form-input"
                    min="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>ID Categoría</label>
                  <input
                    name="idCategoria"
                    type="number"
                    value={newProduct.idCategoria}
                    onChange={handleNewChange}
                    placeholder="1"
                    className="form-input"
                    min="1"
                  />
                </div>
              </div>
              <button className="btn btn-primary" type="submit" disabled={creating}>
                {creating ? 'Creando...' : 'Crear Producto'}
              </button>
            </form>
          </div>
        )}

        <div className="products-grid">
          {filteredProductos.length > 0 ? (
            filteredProductos.map((p) => (
              <div key={p.idProducto} className="product-admin-card">
                {p.imagen ? (
                  <div className="product-image">
                    <img src={p.imagen} alt={p.nombre} />
                  </div>
                ) : (
                  <div className="product-image no-image">
                    <span>📦</span>
                  </div>
                )}
                <div className="product-content">
                  <div className="product-header">
                    <h4>{p.nombre}</h4>
                    <span className={`stock-badge ${p.stock < 10 ? 'low-stock' : 'in-stock'}`}>
                      Stock: {p.stock}
                    </span>
                  </div>
                  <p className="product-description">{p.descripcion || 'Sin descripción'}</p>
                  <div className="product-category">
                    Categoría: {p.categoria_nombre || 'Sin categoría'}
                  </div>
                  <div className="product-price-section">
                    {editingId === p.idProducto ? (
                      <div className="edit-stock">
                        <input
                          type="number"
                          value={editingStock}
                          onChange={(e) => setEditingStock(Number(e.target.value))}
                          className="form-input"
                          min="0"
                        />
                        <button className="btn btn-sm btn-primary" onClick={saveStock}>
                          Guardar Stock
                        </button>
                        <button className="btn btn-sm btn-secondary" onClick={cancelEdit}>
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn btn-sm btn-warning edit-stock-btn"
                        onClick={() => startEdit(p)}
                      >
                        ✏️ Editar Stock
                      </button>
                    )}
                  </div>
                  <button
                    className="btn btn-sm btn-danger delete-btn"
                    onClick={() => onDelete(p.idProducto)}
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              {searchQuery
                ? 'No se encontraron productos con ese criterio'
                : 'No hay productos registrados'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
