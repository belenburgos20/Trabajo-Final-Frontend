import { type Presupuesto } from '../../types/Presupuesto';
import { useState } from 'react';
import { getPresupuestoById } from '../../services/presupestosService';

interface Props {
  presupuesto: Presupuesto;
  children?: React.ReactNode;
// onActualizarEstado: (id: number, estado: string) => Promise<void>;
}

export default function PresupuestoCard({ presupuesto, children }: Props) {
  const [detalle, setDetalle] = useState(presupuesto.detalle || []);
  const [loading, setLoading] = useState(false);
  const [mostrarDetalle, setMostrarDetalle] = useState(false);
  const [totalPresupuesto, setTotalPresupuesto] = useState(presupuesto.montoTotal || 0);

  const cargarDetalle = async () => {
    try {
      setLoading(true);
      const data = await getPresupuestoById(presupuesto.idPresupuesto.toString());
      setDetalle(data.detalle);
      setMostrarDetalle(true);
      setTotalPresupuesto(data.montoTotal);
    } catch (error) {
      console.error('Error al cargar el detalle del presupuesto:', error);
    } finally {
      setLoading(false);
    }
  };

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
          <strong>Total:</strong> ${totalPresupuesto.toLocaleString()}
        </p>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={cargarDetalle}
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Ver detalle'}
        </button>
        {mostrarDetalle && (
          <>
          <hr />
            <h6>Detalle</h6>
            {detalle.length === 0 && <p>No hay productos.</p>}
            {detalle.map((item) => (
              <div key={item.idDetallePresupuesto}
               className="border-bottom py-2">
                <p className="mb-1">
                  <strong>Producto:</strong> {item.nombreProducto}
                </p>
                <p className="mb-1">
                  <strong>Cantidad:</strong> {item.cantidad}
                </p>
                <p className="mb-1">
                  <strong>Precio:</strong> ${item.precioUnitario.toLocaleString()}
                </p>
                <p className="mb-1">
                  <strong>Total:</strong> ${(item.cantidad * item.precioUnitario).toLocaleString()}
                </p>
              </div>
            ))}
          </>
        )}
        <hr />

        {children && <div className="admin-actions mt-4 pt-3 border-top">{children}</div>}
      </div>
    </div>
  );
}
