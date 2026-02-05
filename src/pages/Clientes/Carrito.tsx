import { useEffect, useState, useContext } from 'react';
import { usePresupuestos } from '../../hooks';
import { AppContext } from '../../context/AppContext';
import type { NuevoPresupuesto } from '../../types/Presupuesto';
import type { NuevoDetallePresupuesto } from '../../types/DetallePresupuesto';
type CartItem = {
  idproducto?: number;
  codigo?: string;
  nombre: string;
  precio: number;
  cantidad: number;
};

export default function Carrito() {
  const appCtx = useContext(AppContext);
  const { createPresupuesto, isLoading } = usePresupuestos();
  const [carrito, setCarrito] = useState<CartItem[]>([]);
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
    setMessage(null);
    const user = appCtx?.user;
    if (!user?.id) {
      setMessage('Usuario no autenticado');
      return;
    }
    console.log('Usuario en contexto:', user);

    // Validar que todos los productos tengan un id válido
    if (carrito.some((p) => !p.idproducto || p.idproducto <= 0)) {
      setMessage('Hay productos en el carrito con un ID inválido. Por favor, revisa tu carrito.');
      return;
    }

    const detalle: NuevoDetallePresupuesto[] = carrito.map((p) => ({
      idProducto: p.idproducto ?? 0, // Cambiado de p.id a p.idproducto
      cantidad: p.cantidad,
      precio: p.precio,
    }));

    const payload: NuevoPresupuesto = {
      idUsuario: Number(user.id),
      fecha: new Date().toISOString(),
      fechaEntrega: new Date().toISOString(),
      estado: 'pendiente',
      detalle,
    };

    console.log('Datos enviados al backend:', payload);

    const resultado = await createPresupuesto(payload);
    if (resultado) {
      setMessage('Presupuesto enviado');
      localStorage.removeItem('carrito');
      setCarrito([]);
    } else {
      setMessage('Error al enviar presupuesto');
    }
  };

  if (carrito.length === 0)
    return (
      <div className="main-content page">
        <div className="container">
          <section className="section" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="carrito-vacio">
              <div className="carrito-vacio-icon">🛒</div>
              <h2 className="carrito-vacio-title">Tu carrito está vacío</h2>
              <p className="carrito-vacio-text">
                Agrega productos desde la sección de productos para comenzar
              </p>
            </div>
          </section>
        </div>
      </div>
    );

  const total = carrito.reduce((s, it) => s + it.precio * it.cantidad, 0);

  return (
    <div className="main-content page">
      <div className="container">
        <section className="section" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="carrito-header mb-4">
            <h1 className="carrito-title">
              <span className="carrito-icon">🛒</span>
              Mi Carrito
            </h1>
            <span className="carrito-badge">
              {carrito.length} {carrito.length === 1 ? 'producto' : 'productos'}
            </span>
          </div>

          <div className="carrito-items">
            {carrito.map((item, idx) => (
              <div key={item.codigo ?? item.idproducto ?? idx} className="carrito-item-card">
                <div className="carrito-item-info">
                  <h3 className="carrito-item-nombre">{item.nombre}</h3>
                  <p className="carrito-item-precio">${item.precio.toLocaleString('es-AR')} c/u</p>
                </div>

                <div className="carrito-item-controls">
                  <div className="cantidad-control">
                    <label htmlFor={`cantidad-${idx}`} className="cantidad-label">
                      Cantidad
                    </label>
                    <input
                      id={`cantidad-${idx}`}
                      type="number"
                      value={item.cantidad}
                      min={1}
                      onChange={(e) => actualizarCantidad(idx, Number(e.target.value))}
                      className="cantidad-input"
                    />
                  </div>
                  <button
                    className="btn-eliminar-item"
                    onClick={() => quitarItem(idx)}
                    title="Eliminar del carrito"
                  >
                    🗑️
                  </button>
                </div>

                <div className="carrito-item-subtotal">
                  <span className="subtotal-label">Subtotal</span>
                  <span className="subtotal-value">
                    ${(item.precio * item.cantidad).toLocaleString('es-AR')}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="carrito-summary">
            <div className="summary-content">
              <div className="summary-total">
                <span className="total-label">Total</span>
                <span className="total-value">${total.toLocaleString('es-AR')}</span>
              </div>
              <button
                className="btn-enviar-presupuesto"
                onClick={enviarPresupuesto}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Enviando...
                  </>
                ) : (
                  <>📤 Enviar Presupuesto</>
                )}
              </button>
            </div>
            {message && (
              <div className={`message-alert ${message.includes('Error') ? 'error' : 'success'}`}>
                {message}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
