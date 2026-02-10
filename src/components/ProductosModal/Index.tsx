import { type Producto } from '../../types/Producto';
import ProductCard from '../ProductCard/Index';

interface Props {
  producto: Producto;
  productosRelacionados: Producto[];
  loading: boolean;
  onClose: () => void;
  carrito: (Producto & { cantidad: number })[];
  onActualizarCarrito: (producto: Producto, cantidad: number) => void;
}

export default function ProductosModal({
  producto,
  productosRelacionados,
  loading,
  onClose,
  carrito,
  onActualizarCarrito
}: Props) {
  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
    >
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--surface)',
          borderRadius: '12px',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 className="text-primary">Producto: {producto.nombre}</h2>
          <button 
            className="btn btn-secondary"
            onClick={onClose}
            style={{ 
              border: 'none', 
              background: 'transparent', 
              fontSize: '24px', 
              cursor: 'pointer',
              color: 'var(--text)'
            }}
          >
            ×
          </button>
        </div>

        <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: 'var(--background)', borderRadius: '8px' }}>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {producto.imagen && (
              <div style={{ flex: '0 0 200px' }}>
                <img 
                  src={producto.imagen} 
                  alt={producto.nombre} 
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              </div>
            )}
            <div style={{ flex: '1', minWidth: '200px' }}>
              <h4 className="text-primary">{producto.nombre}</h4>
              <p style={{ color: 'var(--muted)', marginBottom: '8px' }}>
                <strong>Precio:</strong> ${producto.precio}
              </p>
              {producto.descripcion && (
                <p style={{ color: 'var(--text)', marginBottom: '8px' }}>
                  <strong>Descripción:</strong> {producto.descripcion}
                </p>
              )}
              {producto.idCategoria && (
                <p style={{ color: 'var(--muted)', marginBottom: '8px' }}>
                  <strong>Categoría:</strong> {producto.idCategoria.nombre}
                </p>
              )}
              <p style={{ color: 'var(--muted)' }}>
                <strong>Stock:</strong> {producto.stock} unidades
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-primary mb-3">
            Productos relacionados de la misma categoría
            {productosRelacionados.length > 0 && (
              <span className="badge bg-primary ms-2">{productosRelacionados.length}</span>
            )}
          </h3>
          
          {loading ? (
            <p className="text-center">Cargando productos relacionados...</p>
          ) : productosRelacionados.length === 0 ? (
            <p className="text-center text-muted">No hay productos relacionados disponibles</p>
          ) : (
            <div className="g">
              {productosRelacionados.map((p) => {
                const itemCarrito = carrito.find((c) => c.idProducto === p.idProducto);
                return (
                  <ProductCard
                    key={p.idProducto}
                    producto={p}
                    cantidad={itemCarrito?.cantidad || 0}
                    onAdd={() => onActualizarCarrito(p, (itemCarrito?.cantidad || 0) + 1)}
                    onRemove={() => onActualizarCarrito(p, (itemCarrito?.cantidad || 0) - 1)}
                    onDelete={() => onActualizarCarrito(p, 0)}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

