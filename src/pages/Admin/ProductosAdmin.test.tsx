import { render, screen } from '@testing-library/react';
import ProductosAdmin from './Productos';

vi.mock('../../hooks', () => ({
  useProductos: () => ({
    productos: [],
    isLoading: false,
    createProducto: vi.fn(),
    updateProducto: vi.fn(),
    deleteProducto: vi.fn(),
    fetchProductos: vi.fn(),
  }),
}));

describe('ProductosAdmin', () => {
  it('muestra el título de Gestión de Productos', () => {
    render(<ProductosAdmin />);

    expect(screen.getByText('Gestión de Productos')).toBeInTheDocument();
  });
});
