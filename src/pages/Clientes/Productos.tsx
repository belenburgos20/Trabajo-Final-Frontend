import { useEffect, useState } from 'react';
import type { Producto } from '../../types/Producto';
import { getProductos } from '../../services/productosService';
import ProductCard from '../../components/ProductCard/Index';

export default function ProductosList() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [carrito, setCarrito] = useState<(Producto & { cantidad: number })[]>([]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const data = await getProductos();
        setProductos(data);

        const stored = JSON.parse(localStorage.getItem('carrito') || '[]');
        setCarrito(stored);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Error cargando productos');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const actualizarCarrito = (producto: Producto, cantidad: number) => {
    const index = carrito.findIndex((p) => p.idProducto === producto.idProducto);
    const copy = [...carrito];

    if (index === -1 && cantidad > 0) {
      copy.push({ ...producto, cantidad });
    } else if (index !== -1) {
      if (cantidad <= 0) {
        copy.splice(index, 1);
      } else {
        copy[index] = { ...copy[index], cantidad };
      }
    }

    setCarrito(copy);
    localStorage.setItem('carrito', JSON.stringify(copy));
  };

  if (loading) return <p className="text-center">Cargando productos...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  return (
    <div className="main-content">
      <section className="section mx-auto" style={{ maxWidth: '900px' }}>
        {' '}
        <h1 className="text-primary mb-4 text-center">Productos</h1>{' '}
        <div className="d-flex flex-wrap gap-3 justify-content-center">
          {productos.map((p) => {
            const itemCarrito = carrito.find((c) => c.idProducto === p.idProducto);

            return (
              <ProductCard
                key={p.idProducto}
                producto={p}
                cantidad={itemCarrito?.cantidad || 0}
                onAdd={() => actualizarCarrito(p, (itemCarrito?.cantidad || 0) + 1)}
                onRemove={() => actualizarCarrito(p, (itemCarrito?.cantidad || 0) - 1)}
                onDelete={() => actualizarCarrito(p, 0)}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
