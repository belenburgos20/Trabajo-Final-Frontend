import { Link } from 'react-router-dom';

type SidebarVariant = 'general' | 'clientes' | 'admin';

interface SidebarProps {
  variant: SidebarVariant;
}

interface SidebarLink {
  label: string;
  to: string;
}
const menuByVariant: Record<SidebarVariant, SidebarLink[]> = {
  general: [
    { label: 'Inicio', to: '/' },
    { label: 'Contacto', to: '/contact' },
    { label: 'Login', to: '/login' },
  ],
  clientes: [
    { label: 'Perfil', to: '/clientes/perfil' },
    { label: 'Productos', to: '/clientes/productos' },
    { label: 'Carrito', to: '/clientes/carrito' },
    { label: 'Presupuestos', to: '/clientes/presupuestos' },
  ],
  admin: [
    { label: 'Dashboard', to: '/admin/dashboard' },
    { label: 'Clientes', to: '/admin/clientes' },
    { label: 'Productos', to: '/admin/productos' },
    { label: 'Presupuestos', to: '/admin/presupuestos' },
  ],
};

export default function Sidebar({ variant }: SidebarProps) {
  const links = menuByVariant[variant];

  return (
    <aside className="client-sidebar bg-light shadow-sm">
      <h3 className="px-3 pt-3">Menú</h3>
      <ul className="list-unstyled d-flex flex-column px-3 gap-2">
        {links.map((l) => (
          <li key={l.to}>
            <Link
              to={l.to}
              className="text-dark text-decoration-none d-block p-2 rounded hover-bg-primary"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
