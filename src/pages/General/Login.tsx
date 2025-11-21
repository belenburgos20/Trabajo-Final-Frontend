import { FormEvent, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Login() {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as any;
  const from = location.state?.from?.pathname ?? '/admin';

  const [name, setName] = useState('Admin');
  const [email, setEmail] = useState('admin@example.com');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    login({ id: '1', name, email });
    navigate(from, { replace: true });
  };

  if (user) {
    return (
      <div>
        <h1>Ya estás logueado</h1>
        <p>
          {user.name} ({user.email})
        </p>
        <button onClick={() => logout()}>Logout</button>
      </div>
    );
  }

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <button type="submit">Ingresar</button>
      </form>
    </section>
  );
}
