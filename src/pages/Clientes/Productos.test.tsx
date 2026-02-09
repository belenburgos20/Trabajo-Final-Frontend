import { render, screen, fireEvent } from '@testing-library/react';
import ProductosList from './Productos';

vi.mock('../../hooks/useProductos', () => ({
  useProductos: () => ({
    productos: [
      { idProducto: 1, idCategoria: 1, nombre: 'Prod 1' },
      { idProducto: 2, idCategoria: 1, nombre: 'Prod 2' },
    ],
    isLoading: false,
    error: null,
    fetchProductosPorCategoria: vi.fn().mockResolvedValue([]),
  }),
}));

describe('Página de Productos (cliente)', () => {
  it('muestra las categorías de productos', () => {
    render(<ProductosList />);

    expect(screen.getByText('Categorías de Productos')).toBeInTheDocument();
  });
});
