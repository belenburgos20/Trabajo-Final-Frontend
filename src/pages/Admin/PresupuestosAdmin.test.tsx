import { render, screen } from '@testing-library/react';
import PresupuestosAdmin from './Presupuestos';

vi.mock('../../hooks', () => ({
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
