import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../../src/pages/General/Login';

describe('Página de Login', () => {
  it('muestra los enlaces a login de cliente y admin', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText('Bienvenido de vuelta')).toBeInTheDocument();
    expect(screen.getByText('Ingresar como Cliente')).toBeInTheDocument();
    expect(screen.getByText('Ingresar como Admin')).toBeInTheDocument();
  });
});
