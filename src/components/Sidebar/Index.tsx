import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

type SidebarVariant = 'general' | 'clientes' | 'admin';

interface SidebarProps {
  variant: SidebarVariant;
}

interface SidebarLink {
  label: string;
  to: string;
  icon: string;
}

const menuByVariant: Record<SidebarVariant, SidebarLink[]> = {
  general: [
    { label: 'Inicio', to: '/', icon: '🏠' },
    { label: 'Contacto', to: '/contact', icon: '📧' },
    { label: 'Login', to: '/login', icon: '🔐' },
  ],
  clientes: [
    { label: 'Perfil', to: '/clientes/perfil', icon: '👤' },
    { label: 'Productos', to: '/clientes/productos', icon: '📦' },
    { label: 'Carrito', to: '/clientes/carrito', icon: '🛒' },
    { label: 'Presupuestos', to: '/clientes/presupuestos', icon: '💰' },
  ],
  admin: [
    { label: 'Dashboard', to: '/admin/dashboard', icon: '📊' },
    { label: 'Clientes', to: '/admin/clientes', icon: '👥' },
    { label: 'Productos', to: '/admin/productos', icon: '📦' },
    { label: 'Presupuestos', to: '/admin/presupuestos', icon: '💰' },
  ],
};

export default function Sidebar({ variant }: SidebarProps) {
  const links = menuByVariant[variant];
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/admin/dashboard') {
      return location.pathname === '/admin/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className={`admin-sidebar sidebar-${variant}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="sidebar-logo-icon">⚙️</span>
          <h3 className="sidebar-title">
            {variant === 'admin' ? 'Administración' : variant === 'clientes' ? 'Cliente' : 'Menú'}
          </h3>
        </div>
      </div>
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {links.map((link) => {
            const active = isActive(link.to);
            return (
              <li key={link.to} className="sidebar-item">
                <Link
                  to={link.to}
                  className={`sidebar-link ${active ? 'active' : ''}`}
                >
                  <span className="sidebar-icon">{link.icon}</span>
                  <span className="sidebar-label">{link.label}</span>
                  {active && <span className="sidebar-indicator"></span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
