import { useEffect, useState } from 'react';
import { crearPresupuesto } from '../../services/presupuestosService';
import type { NuevoPresupuesto } from '../../types/Presupuesto';
import type { NuevoDetallePresupuesto } from '../../types/DetallePresupuesto';
type CartItem = { id?: number; codigo?: string; nombre: string; precio: number; cantidad: number };

export default function Carrito() {
  const [carrito, setCarrito] = useState<CartItem[]>([]);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem('carrito') || '[]';
    try {
      setCarrito(JSON.parse(raw));
    } catch {
      setCarrito([]);
    }
  }, []);

  const actualizarCantidad = (index: number, cantidad: number) => {
    if (cantidad < 1) return;
    const copy = [...carrito];
    copy[index] = { ...copy[index], cantidad };
    setCarrito(copy);
    localStorage.setItem('carrito', JSON.stringify(copy));
  };

  const quitarItem = (index: number) => {
    const copy = carrito.filter((_, i) => i !== index);
    setCarrito(copy);
    localStorage.setItem('carrito', JSON.stringify(copy));
  };

  const enviarPresupuesto = async () => {
    setSending(true);
    setMessage(null);
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      const detalle: NuevoDetallePresupuesto[] = carrito.map((p) => ({
        idProducto: p.id ?? 0,
        cantidad: p.cantidad,
        precio: p.precio,
      }));

      const payload: NuevoPresupuesto = {
        idUsuario: user?.id ?? 0, // ajusta según tu backend
        fecha: new Date().toISOString(),
        fechaEntrega: new Date().toISOString(), // o calcula otra fecha
        estado: 'pendiente', // o el valor que tu backend requiera
        detalle,
      };

      await crearPresupuesto(payload);
      setMessage('Presupuesto enviado');
      localStorage.removeItem('carrito');
      setCarrito([]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        setMessage(err.message);
      } else {
        setMessage('Error desconocido al enviar presupuesto');
      }
    } finally {
      setSending(false);
    }
  };

  if (carrito.length === 0)
    return (
      <div className="main-content">
        {' '}
        <section className="section text-center">
          {' '}
          <p>El carrito está vacío.</p>{' '}
        </section>{' '}
      </div>
    );

  const total = carrito.reduce((s, it) => s + it.precio * it.cantidad, 0);

  return (
    <div className="main-content">
      <section className="section mx-auto" style={{ maxWidth: '800px' }}>
        {' '}
        <h1 className="text-primary mb-4 text-center">Carrito</h1>
        ```
        {carrito.map((item, idx) => (
          <div key={item.codigo ?? item.id ?? idx} className="card mb-3 p-3">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div>
                <strong>{item.nombre}</strong>
                <div>Precio: ${item.precio}</div>
              </div>

              <div className="d-flex align-items-center gap-2 mt-2 mt-md-0">
                <label htmlFor={`cantidad-${idx}`} className="mb-0">
                  Cantidad:
                </label>
                <input
                  id={`cantidad-${idx}`}
                  type="number"
                  value={item.cantidad}
                  min={1}
                  onChange={(e) => actualizarCantidad(idx, Number(e.target.value))}
                  className="form-control"
                  style={{ width: 80 }}
                />
                <button className="btn btn-outline-danger" onClick={() => quitarItem(idx)}>
                  Quitar
                </button>
              </div>

              <div className="mt-2 mt-md-0">
                <strong>Subtotal: ${item.precio * item.cantidad}</strong>
              </div>
            </div>
          </div>
        ))}
        <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap">
          <strong>Total: ${total}</strong>
          <button className="btn btn-accent" onClick={enviarPresupuesto} disabled={sending}>
            {sending ? 'Enviando...' : 'Enviar presupuesto'}
          </button>
        </div>
        {message && <p className="mt-3 text-center text-success">{message}</p>}
      </section>
    </div>
  );
}
