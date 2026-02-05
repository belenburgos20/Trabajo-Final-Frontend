import { type Presupuesto } from '../../types/Presupuesto';

interface Props {
  presupuesto: Presupuesto;
  children?: React.ReactNode;
  onActualizarEstado: (id: number, estado: string) => Promise<void>;
}

export default function PresupuestoCard({ presupuesto, children }: Props) {
  return (
    <div className="card shadow-sm rounded mb-3">
      <div className="card-body">
        <h5 className="card-title text-primary">Presupuesto #{presupuesto.idPresupuesto}</h5>

        <p>
          <strong>Estado:</strong> <span className="badge bg-secondary">{presupuesto.estado}</span>
        </p>
        <p>
          <strong>Fecha de creación:</strong> {new Date(presupuesto.fecha).toLocaleDateString()}
        </p>
        <p>
          <strong>Total:</strong> ${presupuesto.montoTotal.toLocaleString()}
        </p>

        <hr />

        <h6>Detalle</h6>
        {presupuesto.detalle.length === 0 && <p>No hay productos.</p>}
        {presupuesto.detalle.map((item) => (
          <div key={item.idDetallePresupuesto} className="border-bottom py-2">
            <p className="mb-1">
              <strong>ID Producto:</strong> {item.idProducto}
            </p>
            <p className="mb-1">
              <strong>Cantidad:</strong> {item.cantidad}
            </p>
            <p className="mb-1">
              <strong>Precio:</strong> ${item.precio}
            </p>
          </div>
        ))}

        {/* --- MOVER EL CHILDREN AQUÍ: Al final de la card --- */}
        {children && <div className="admin-actions mt-4 pt-3 border-top">{children}</div>}
      </div>
    </div>
  );
}
