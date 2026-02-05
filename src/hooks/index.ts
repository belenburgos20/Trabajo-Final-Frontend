// Barrel export para facilitar las importaciones de hooks
export { useAuth } from './useAuth';
export { useProductos } from './useProductos';
export { usePresupuestos } from './usePresupuestos';
export { useClientes } from './useClientes';

// Hook avanzado que integra autenticación con contexto
export { useAuthWithContext } from './useAuthWithContext';

// Componentes de protección de rutas
export { ProtectedRoute, AdminRoute } from './useAuthWithContext';
