import { type Producto } from '../../types/Producto';

interface Props {
  producto: Producto;
  cantidad: number;
  onAdd: () => void;
  onRemove: () => void;
  onDelete: () => void;
}

export default function ProductCard({ producto, cantidad, onAdd, onRemove, onDelete }: Props) {
  return (
    <div className="c card h-100 shadow-sm">
      {producto.imagen ? (
        <div className="i">
          <img src={producto.imagen} alt={producto.nombre} />
        </div>
      ) : (
        <div className="i">
          <span style={{ color: 'var(--muted)' }}>Sin imagen</span>
        </div>
      )}

      <div className="b">
        <h5 className="card-title text-primary" style={{ fontSize: 16 }}>
          {producto.nombre}
        </h5>
        <p className="card-text" style={{ color: 'var(--muted)' }}>
          Precio: <strong style={{ color: 'var(--text)' }}>${producto.precio}</strong>
        </p>

        <div className="a mt-auto">
          <button className="btn btn-sm btn-success" onClick={onAdd}>
            +
          </button>
          <button className="btn btn-sm btn-warning" onClick={onRemove} disabled={cantidad === 0}>
            -
          </button>
          <button
            className="btn btn-sm btn-danger ms-auto"
            onClick={onDelete}
            disabled={cantidad === 0}
          >
            Eliminar
          </button>
        </div>

        <p className="mt-2 mb-0 small">
          Cantidad: <strong>{cantidad}</strong>
        </p>
      </div>
    </div>
  );
}
