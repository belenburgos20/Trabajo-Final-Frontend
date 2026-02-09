import { render, screen } from '@testing-library/react';
import { AppContext } from '../../context/AppContext';
import PresupuestosHistorial from './Presupuestos';

const mockUser = { id: 1 } as any;

vi.mock('../../hooks', () => ({
  usePresupuestos: () => ({
    presupuestos: [],
    isLoading: false,
    error: null,
    fetchPresupuestosPorUsuario: vi.fn(),
  }),
}));

describe('Página de Presupuestos (cliente)', () => {
  it('muestra el título Mis presupuestos', () => {
    render(
      <AppContext.Provider value={{ user: mockUser } as any}>
        <PresupuestosHistorial />
      </AppContext.Provider>
    );

    expect(screen.getByText('Mis presupuestos')).toBeInTheDocument();
  });
});
