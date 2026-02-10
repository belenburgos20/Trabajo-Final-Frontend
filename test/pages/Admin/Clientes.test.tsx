import { render, screen } from '@testing-library/react';
import ClientesAdmin from '../../../src/pages/Admin/Clientes';

vi.mock('../../../src/services/clientesService', () => ({
  listarClientes: vi.fn().mockResolvedValue([]),
}));

describe('Admin Clientes', () => {
  it('muestra el título de Gestión de Clientes', async () => {
    render(<ClientesAdmin />);

    const title = await screen.findByRole('heading', { name: 'Gestión de Clientes' });
    expect(title).toBeInTheDocument();
  });

  it('muestra el subtítulo de la página', async () => {
    render(<ClientesAdmin />);

    expect(
      await screen.findByText('Administra y visualiza todos los clientes registrados')
    ).toBeInTheDocument();
  });
});
