import { useEffect, useState, useMemo } from 'react';
import type { Producto } from '../../types/Producto';
import { useProductos } from '../../hooks/useProductos';
import ProductCard from '../../components/ProductCard/Index';

export default function ProductosList() {
  const { productos, isLoading, error, fetchProductosPorCategoria } = useProductos(true);

  /* 
     Estados
*/
  const [carrito, setCarrito] = useState<(Producto & { cantidad: number })[]>([]);

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null);
  const [productosCategoriaActual, setProductosCategoriaActual] = useState<Producto[]>([]);
  const [loadingCategoria, setLoadingCategoria] = useState(false);
  const [productosSeleccionados, setProductosSeleccionados] = useState<number[]>([]);

  /* 
     Carrito (localStorage)
  */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('carrito') || '[]');
    setCarrito(stored);
  }, []);

  /* Agrupar productos por categoría*/
  const productosPorCategoria = useMemo(() => {
    const map = new Map<number, Producto[]>();

    productos.forEach((producto) => {
      if (!map.has(producto.idCategoria)) {
        map.set(producto.idCategoria, []);
      }
      map.get(producto.idCategoria)!.push(producto);
    });

    return Array.from(map.entries()).map(([idCategoria, productos]) => ({
      idCategoria,
      productos,
    }));
  }, [productos]);

  /* 
     CARRITO */
  const actualizarCarrito = (producto: Producto, cantidad: number) => {
    // Aseguramos que el producto tenga la propiedad idProducto
    const productoTransformado = {
      ...producto,
      idProducto: producto.idProducto || producto.idProducto, // Compatibilidad con ambos formatos
    };

    setCarrito((prev) => {
      const index = prev.findIndex((p) => p.idProducto === productoTransformado.idProducto);

      const nuevo = [...prev];

      if (index === -1 && cantidad > 0) {
        nuevo.push({ ...productoTransformado, cantidad });
      } else if (index !== -1) {
        if (cantidad <= 0) {
          nuevo.splice(index, 1);
        } else {
          nuevo[index] = { ...nuevo[index], cantidad };
        }
      }

      console.log('Carrito actualizado:', nuevo); // Depuración del estado del carrito

      localStorage.setItem('carrito', JSON.stringify(nuevo));
      return nuevo;
    });
  };

  /* 
     Categorías
    */
  const handleCategoriaClick = async (idCategoria: number) => {
    setCategoriaSeleccionada(idCategoria);
    setLoadingCategoria(true);

    try {
      const data = await fetchProductosPorCategoria(idCategoria.toString());
      setProductosCategoriaActual(data);
    } finally {
      setLoadingCategoria(false);
    }
  };

  const handleVolverACategorias = () => {
    setCategoriaSeleccionada(null);
    setProductosCategoriaActual([]);
  };

  /*
     Producto / relacionados
 */
  const handleProductoSeleccion = (idProducto: number) => {
    setProductosSeleccionados((prev) => {
      if (prev.includes(idProducto)) {
        return prev.filter((id) => id !== idProducto);
      } else {
        return [...prev, idProducto];
      }
    });
  };

  const isProductoSeleccionado = (idProducto: number) => {
    return productosSeleccionados.includes(idProducto);
  };

  /*
     UI helpers
 */

  const getCategoriaNombre = (idCategoria: number): string => {
    if (idCategoria === 1) return 'Mangueras';
    if (idCategoria === 2) return 'Terminales';
    if (idCategoria === 3) return 'Conectores';
    if (idCategoria === 4) return 'TEEs';
    if (idCategoria === 5) return 'O-rings';
    if (idCategoria === 6) return 'Wipers';
    return 'Categoría desconocida';
  };

  const getCategoriaIcon = (idCategoria: number): string => {
    if (idCategoria === 1) return '';
    if (idCategoria === 2) return '';
    if (idCategoria === 3) return '';
    if (idCategoria === 4) return '';
    if (idCategoria === 5) return '';
    if (idCategoria === 6) return '';
    return '📦';
  };

  /*
     Estados globales
     */
  if (isLoading && productos.length === 0) {
    return <p className="text-center">Cargando productos...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  /* 
     Vista categorías
 */
  if (categoriaSeleccionada === null) {
    return (
      <div className="main-content page">
        <div className="container">
          <section className="section" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="text-center mb-5">
              <h1 className="text-primary mb-3">Categorías de Productos</h1>
              <p className="text-muted" style={{ fontSize: '1.1rem' }}>
                Explora nuestra amplia gama de productos organizados por categorías
              </p>
            </div>

            <div className="categorias-grid">
              {productosPorCategoria.map(({ idCategoria, productos }) => (
                <div
                  key={idCategoria}
                  className="categoria-card-enhanced"
                  onClick={() => handleCategoriaClick(idCategoria)}
                >
                  <span className="categoria-icon">{getCategoriaIcon(idCategoria)}</span>
                  <h2>{getCategoriaNombre(idCategoria)}</h2>
                  <p>{productos.length} productos</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  /* 
     Vista productos
*/
  return (
    <div className="main-content page">
      <div className="container">
        <section className="section" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="categoria-header mb-5">
            <button className="btn-back-categoria" onClick={handleVolverACategorias}>
              <span className="btn-back-icon">←</span>
              <span>Volver a categorías</span>
            </button>
            <div className="categoria-header-content">
              <div>
                <h1 className="categoria-header-title">
                  {getCategoriaNombre(categoriaSeleccionada)}
                </h1>
                <p className="categoria-header-subtitle">
                  {productosCategoriaActual.length}{' '}
                  {productosCategoriaActual.length === 1
                    ? 'producto disponible'
                    : 'productos disponibles'}
                </p>
              </div>
            </div>
          </div>
          {loadingCategoria ? (
            <p className="text-center">Cargando productos...</p>
          ) : (
            <div className="g">
              {productosCategoriaActual.map((p) => {
                const itemCarrito = carrito.find((c) => c.idProducto === p.idProducto);

                return (
                  <ProductCard
                    key={p.idProducto}
                    producto={p}
                    cantidad={itemCarrito?.cantidad || 0}
                    onAdd={() => actualizarCarrito(p, (itemCarrito?.cantidad || 0) + 1)}
                    onRemove={() => actualizarCarrito(p, (itemCarrito?.cantidad || 0) - 1)}
                    onDelete={() => actualizarCarrito(p, 0)}
                    onClick={() => handleProductoSeleccion(p.idProducto)}
                    isSelected={isProductoSeleccionado(p.idProducto)}
                  />
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
