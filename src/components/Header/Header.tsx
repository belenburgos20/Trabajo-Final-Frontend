import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
      <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        {!user && <Link to="/login">Login</Link>}
        <Link to="/register">Register</Link>
        {user && <Link to="/admin">Admin</Link>}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          {user ? (
            <>
              <span style={{ fontSize: 12, color: '#555' }}>{user.name}</span>
              <button onClick={logout}>Logout</button>
            </>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
