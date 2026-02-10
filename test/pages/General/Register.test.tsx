import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Register from '../../../src/pages/General/Register';

const mockCreateCliente = vi.fn().mockResolvedValue(null);
const mockSetUser = vi.fn();

vi.mock('../../../src/hooks', () => ({
  useClientes: () => ({
    createCliente: mockCreateCliente,
    isLoading: false,
    error: null,
  }),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Página de Registro', () => {
  beforeEach(() => {
    mockCreateCliente.mockClear();
    mockSetUser.mockClear();
    mockNavigate.mockClear();
  });

  it('muestra el título y el formulario de registro', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    expect(screen.getByText('Crea tu cuenta')).toBeInTheDocument();
    expect(screen.getByText('Registro')).toBeInTheDocument();
    expect(screen.getByText('Completa el formulario para crear tu cuenta')).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombre completo/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Mínimo 6 caracteres/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Crear cuenta/i })).toBeInTheDocument();
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
  });

  it('muestra la sección de información personal', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    expect(screen.getByText('Información Personal')).toBeInTheDocument();
    expect(screen.getByText('Información de Contacto (Opcional)')).toBeInTheDocument();
    expect(screen.getByText('Acceso de Administrador')).toBeInTheDocument();
    expect(screen.getByText(/Registrarme como administrador/)).toBeInTheDocument();
  });

  it('muestra error si se intenta registrar como admin sin código correcto', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText(/Nombre completo/), 'Admin Test');
    await user.type(screen.getByLabelText(/Email/), 'admin@test.com');
    await user.type(screen.getByPlaceholderText(/Mínimo 6 caracteres/), 'password123');
    await user.click(screen.getByLabelText(/Registrarme como administrador/));
    await user.type(screen.getByPlaceholderText(/código de acceso/), 'codigo-incorrecto');
    await user.click(screen.getByRole('button', { name: /Crear cuenta/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Código de acceso de administrador incorrecto/)
      ).toBeInTheDocument();
    });
    expect(mockCreateCliente).not.toHaveBeenCalled();
  });
});
