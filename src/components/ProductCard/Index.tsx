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
    <div className="card h-100 shadow-sm rounded">
      {producto.imagen && (
        <img
          src={producto.imagen}
          className="card-img-top"
          alt={producto.nombre}
          style={{ objectFit: 'cover', height: '150px' }}
        />
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-primary">{producto.nombre}</h5>
        <p className="card-text">
          Precio: <strong>${producto.precio}</strong>
        </p>

        <div className="d-flex align-items-center mb-2 mt-auto">
          <button className="btn btn-sm btn-success me-2" onClick={onAdd}>
            +
          </button>
          <button
            className="btn btn-sm btn-warning me-2"
            onClick={onRemove}
            disabled={cantidad === 0}
          >
            -
          </button>
          <button className="btn btn-sm btn-danger" onClick={onDelete} disabled={cantidad === 0}>
            Eliminar
          </button>
        </div>

        <p className="mt-2 mb-0">
          Cantidad: <strong>{cantidad}</strong>
        </p>
      </div>
    </div>
  );
}
