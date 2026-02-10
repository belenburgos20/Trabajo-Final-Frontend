import { render, screen } from '@testing-library/react';
import PresupuestosAdmin from '../../../src/pages/Admin/Presupuestos';

vi.mock('../../../src/hooks', () => ({
  usePresupuestos: () => ({
    presupuestos: [],
    isLoading: false,
    updatePresupuesto: vi.fn(),
    fetchPresupuestos: vi.fn(),
  }),
}));

describe('PresupuestosAdmin', () => {
  it('muestra el título de Gestión de Presupuestos', () => {
    render(<PresupuestosAdmin />);

    expect(screen.getByText('Gestión de Presupuestos')).toBeInTheDocument();
  });
});
