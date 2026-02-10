import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import LoginAdmin from '../../../src/pages/General/LoginAdmin';

const mockLogin = vi.fn().mockResolvedValue(null);

vi.mock('../../../src/hooks', () => ({
  useAuthWithContext: () => ({
    login: mockLogin,
    isLoading: false,
    error: 'Credenciales inválidas',
    isAuthenticated: false,
    isAdmin: false,
  }),
}));

describe('LoginAdmin - credenciales inválidas', () => {
  it('muestra un mensaje de error cuando el login falla', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <LoginAdmin />
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText('Email'), 'wrong-admin@example.com');
    await user.type(screen.getByLabelText('Contraseña'), 'wrongpass');

    await user.click(screen.getByRole('button', { name: /Ingresar como Administrador/i }));

    expect(mockLogin).toHaveBeenCalledWith('wrong-admin@example.com', 'wrongpass');

    const errorMessage = await screen.findByText('Credenciales inválidas');
    expect(errorMessage).toBeInTheDocument();
  });
});
