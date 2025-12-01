import { useEffect, useState } from 'react';
import type { Producto } from '../../types/Producto';
import { getProductos, eliminarProducto } from '../../services/productosService';
import ProductCard from '../../components/ProductCard/Index';
import { crearProducto, actualizarProducto } from '../../services/productosService';
import type { NuevoProducto } from '../../types/Producto';

export default function ProductosAdmin() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getProductos();
        setProductos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onDelete = async (codigo: string) => {
    try {
      await eliminarProducto(codigo);
      setProductos((prev) => prev.filter((p) => String(p.idProducto) !== String(codigo)));
    } catch (err) {
      console.error(err);
    }
  };

  // admin: crear nuevo producto
  const [newProduct, setNewProduct] = useState<NuevoProducto>({
    nombre: '',
    descripcion: '',
    idCategoria: 0,
    stock: 0,
    precio: 0,
  });
  const [creating, setCreating] = useState(false);

  const handleNewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]:
        name === 'idCategoria' || name === 'stock' || name === 'precio' ? Number(value) : value,
    }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const created = await crearProducto(newProduct);
      setProductos((prev) => [...prev, created]);
      setNewProduct({ nombre: '', descripcion: '', idCategoria: 0, stock: 0, precio: 0 });
    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  //  editar precio
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingPrice, setEditingPrice] = useState<number>(0);

  const startEdit = (p: Producto) => {
    setEditingId(p.idProducto);
    setEditingPrice(p.precio);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingPrice(0);
  };

  const savePrice = async () => {
    if (editingId == null) return;
    try {
      const updated = await actualizarProducto(String(editingId), { precio: editingPrice });
      if (updated) {
        setProductos((prev) =>
          prev.map((p) => (p.idProducto === updated.idProducto ? updated : p))
        );
      }
      cancelEdit();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div className="main-content page">
      <div className="container">
        <h1 className="text-primary mb-4">Gestión de Productos</h1>
        {/* nuevo producto */}
        <section className="section mb-4">
          <h2 className="mb-3">Agregar producto</h2>
          <form onSubmit={handleCreate} className="d-flex flex-column gap-3">
            <input
              name="nombre"
              value={newProduct.nombre}
              onChange={handleNewChange}
              placeholder="Nombre"
              className="form-control"
              required
            />
            <input
              name="descripcion"
              value={newProduct.descripcion}
              onChange={handleNewChange}
              placeholder="Descripción"
              className="form-control"
            />
            <div className="d-flex gap-3">
              <input
                name="precio"
                type="number"
                value={newProduct.precio}
                onChange={handleNewChange}
                placeholder="Precio"
                className="form-control"
              />
              <input
                name="stock"
                type="number"
                value={newProduct.stock}
                onChange={handleNewChange}
                placeholder="Stock"
                className="form-control"
              />
            </div>
            <div>
              <button className="btn btn-primary" type="submit" disabled={creating}>
                {creating ? 'Creando...' : 'Crear producto'}
              </button>
            </div>
          </form>
        </section>

        <div className="d-flex flex-wrap gap-3">
          {productos.map((p) => (
            <div key={p.idProducto} style={{ width: 260 }}>
              <ProductCard
                producto={p}
                cantidad={0}
                onAdd={() => null}
                onRemove={() => null}
                onDelete={() => onDelete(String(p.idProducto))}
              />
              <div className="card p-2 mt-2">
                <div className="d-flex align-items-center gap-2">
                  <strong>Precio:</strong>
                  {editingId === p.idProducto ? (
                    <>
                      <input
                        type="number"
                        value={editingPrice}
                        onChange={(e) => setEditingPrice(Number(e.target.value))}
                        className="form-control"
                        style={{ width: 120 }}
                      />
                      <button className="btn btn-sm btn-primary" onClick={savePrice}>
                        Guardar
                      </button>
                      <button className="btn btn-sm btn-outline-primary" onClick={cancelEdit}>
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <span style={{ marginLeft: 8 }}>${p.precio}</span>
                      <button
                        className="btn btn-sm btn-primary ms-auto"
                        onClick={() => startEdit(p)}
                      >
                        Editar precio
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
