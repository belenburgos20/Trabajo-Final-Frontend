import { type Presupuesto } from '../../types/Presupuesto';

interface Props {
  presupuesto: Presupuesto;
}

export default function PresupuestoCard({ presupuesto }: Props) {
  return (
    <div className="card shadow-sm rounded mb-3">
      <div className="card-body">
        <h5 className="card-title text-primary">Presupuesto #{presupuesto.idPresupuesto}</h5>
        <p>
          <strong>Estado:</strong> {presupuesto.estado}
        </p>
        <p>
          <strong>Fecha de creación:</strong> {new Date(presupuesto.fecha).toLocaleDateString()}
        </p>
        <p>
          <strong>Fecha de entrega:</strong>{' '}
          {new Date(presupuesto.fechaEntrega).toLocaleDateString()}
        </p>
        <p>
          <strong>Total:</strong> ${presupuesto.montoTotal}
        </p>

        <hr />

        <h6>Detalle</h6>
        {presupuesto.detalle.length === 0 && <p>No hay productos en este presupuesto.</p>}
        {presupuesto.detalle.map((item) => (
          <div key={item.idDetallePresupuesto} className="border-bottom py-2">
            <p>
              <strong>ID Producto:</strong> {item.idProducto}
            </p>
            <p>
              <strong>Cantidad:</strong> {item.cantidad}
            </p>
            <p>
              <strong>Precio:</strong> ${item.precio}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
