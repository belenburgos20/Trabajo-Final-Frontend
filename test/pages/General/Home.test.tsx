import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../../src/pages/General/Home';

describe('Página Home', () => {
  it('muestra el título principal y los botones de acceso', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: 'Bienvenido a Oleohidráulica Guardese' })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Soluciones integrales en oleohidráulica/
      )
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ingresar' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Registrarse' })).toBeInTheDocument();
  });

  it('muestra la sección Quiénes somos', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: '¿Quienes somos?' })).toBeInTheDocument();
    expect(screen.getByText(/Misión/)).toBeInTheDocument();
    expect(screen.getByText(/Visión/)).toBeInTheDocument();
    expect(screen.getByText(/Historia/)).toBeInTheDocument();
  });

  it('muestra la sección Por qué elegirnos', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: '¿Por qué elegirnos?' })).toBeInTheDocument();
    expect(screen.getByText('Respuesta Rápida')).toBeInTheDocument();
    expect(screen.getByText('Productos de Calidad')).toBeInTheDocument();
    expect(screen.getByText('Atención Personalizada')).toBeInTheDocument();
    expect(screen.getByText('Gestión Simplificada')).toBeInTheDocument();
  });

  it('muestra la sección de productos destacados', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: 'Algunos de nuestros productos' })
    ).toBeInTheDocument();
    expect(screen.getByText(/Bombas Hidraulicas/)).toBeInTheDocument();
    expect(screen.getByText(/Cilindros Hidraulicos/)).toBeInTheDocument();
    expect(screen.getByText(/Mangueras Reforzadas/)).toBeInTheDocument();
  });
});
