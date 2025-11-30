import { useEffect, useState } from 'react';
import type { Producto } from '../../types/Producto';
import { getProductos, eliminarProducto } from '../../services/productosService';
import ProductCard from '../../components/ProductCard/Index';

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

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div>
      <h1 className="text-primary mb-4">Gestión de Productos</h1>
      <div className="d-flex flex-wrap gap-3">
        {productos.map((p) => (
          <ProductCard
            key={p.idProducto}
            producto={p}
            cantidad={0}
            onAdd={() => null}
            onRemove={() => null}
            onDelete={() => onDelete(String(p.idProducto))}
          />
        ))}
      </div>
    </div>
  );
}
