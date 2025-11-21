// Ejemplo de uso rápido
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export default function Home() {
  const { user, login, logout } = useAuth();
  const { cartItems, addToCart, total } = useCart();

  return (
    <div>
      <h1>Home</h1>

      <div>
        {user ? (
          <>
            <div>Hola, {user.name}</div>
            <button onClick={() => logout()}>Logout</button>
          </>
        ) : (
          <button onClick={() => login({ id: '1', name: 'Belén', email: 'belen@example.com' })}>
            Login
          </button>
        )}
      </div>

      <div style={{ marginTop: 12 }}>
        <button onClick={() => addToCart({ id: 1, nombre: 'Bomba hidráulica', precio: 12000 })}>
          Agregar producto de ejemplo
        </button>
        <div>Items en carrito: {cartItems.reduce((a, b) => a + b.qty, 0)}</div>
        <div>Total: ${total}</div>
      </div>
    </div>
  );
}
