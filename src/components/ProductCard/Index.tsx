import { type Producto } from '../../types/Producto';
import { getProductImageUrl } from '../../utils/productImage';

interface Props {
  producto: Producto;
  cantidad: number;
  onAdd: () => void;
  onRemove: () => void;
  onDelete: () => void;
  onClick?: () => void;
  isSelected?: boolean; // Nueva propiedad para indicar si el producto está seleccionado
}

export default function ProductCard({
  producto,
  cantidad,
  onAdd,
  onRemove,
  onDelete,
  onClick,
  isSelected,
}: Props) {
  return (
    <div
      className={`product-card-enhanced ${isSelected ? 'selected' : ''}`}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div
        className="product-card-image"
        onClick={onClick}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      >
        <img
          src={getProductImageUrl(producto)}
          alt={producto.nombre}
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
        <div className="product-card-no-image" style={{ display: 'none' }}>
          <span>📦</span>
          <p>Sin imagen</p>
        </div>
        {producto.stock < 10 && <div className="product-stock-badge">Stock bajo</div>}
      </div>

      <div className="product-card-body">
        <h5
          className="product-card-title"
          onClick={onClick}
          style={{ cursor: onClick ? 'pointer' : 'default' }}
        >
          {producto.nombre}
        </h5>

        <div className="product-card-price">
          <span className="price-label">Precio</span>
          <span className="price-value">${producto.precio.toLocaleString('es-AR')}</span>
        </div>

        {producto.idCategoria && (
          <div className="product-card-category">
            <span className="category-badge">Categoría {producto.idCategoria}</span>
          </div>
        )}

        <div className="product-card-actions">
          <div className="quantity-controls">
            <button
              className="btn-quantity btn-quantity-minus"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              disabled={cantidad === 0}
              title="Disminuir cantidad"
            >
              −
            </button>
            <span className="quantity-display">{cantidad}</span>
            <button
              className="btn-quantity btn-quantity-plus"
              onClick={(e) => {
                e.stopPropagation();
                onAdd();
              }}
              title="Aumentar cantidad"
            >
              +
            </button>
          </div>

          {cantidad > 0 && (
            <button
              className="btn-remove-item"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              title="Eliminar del carrito"
            >
              🗑️
            </button>
          )}
        </div>

        {cantidad > 0 && (
          <div className="product-card-subtotal">
            <span>
              Subtotal: <strong>${(producto.precio * cantidad).toLocaleString('es-AR')}</strong>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
