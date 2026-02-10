import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../../../src/pages/Admin/Dashboard';

vi.mock('../../../src/services/productosService', () => ({
  getProductos: vi.fn().mockResolvedValue([]),
}));

vi.mock('../../../src/services/presupestosService', () => ({
  getPresupuestos: vi.fn().mockResolvedValue([]),
}));

vi.mock('../../../src/services/clientesService', () => ({
  listarClientes: vi.fn().mockResolvedValue([]),
}));

describe('Dashboard Admin', () => {
  it('muestra el título del panel de administración', async () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    const title = await screen.findByText('Panel de Administración');
    expect(title).toBeInTheDocument();
  });
});
