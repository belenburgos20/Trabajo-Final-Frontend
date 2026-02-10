import { render, screen } from '@testing-library/react';
import { AppContext } from '../../../src/context/AppContext';
import Carrito from '../../../src/pages/Clientes/Carrito';

const storageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(global, 'localStorage', { value: storageMock });

vi.mock('../../../src/hooks', () => ({
  usePresupuestos: () => ({
    createPresupuesto: vi.fn().mockResolvedValue(null),
    isLoading: false,
  }),
}));

describe('Página Carrito', () => {
  beforeEach(() => {
    storageMock.clear();
    storageMock.setItem('carrito', '[]');
  });

  it('muestra carrito vacío cuando no hay ítems', async () => {
    render(
      <AppContext.Provider value={{ user: { id: '1' } }}>
        <Carrito />
      </AppContext.Provider>
    );

    expect(await screen.findByText('Tu carrito está vacío')).toBeInTheDocument();
    expect(
      screen.getByText('Agrega productos desde la sección de productos para comenzar')
    ).toBeInTheDocument();
  });

  it('muestra ítems del carrito cuando hay datos en localStorage', async () => {
    storageMock.setItem(
      'carrito',
      JSON.stringify([
        {
          idproducto: 1,
          nombre: 'Producto prueba',
          precio: 1000,
          cantidad: 2,
        },
      ])
    );

    render(
      <AppContext.Provider value={{ user: { id: '1' } }}>
        <Carrito />
      </AppContext.Provider>
    );

    expect(await screen.findByText('Producto prueba')).toBeInTheDocument();
    expect(screen.getByText(/1\.?000/)).toBeInTheDocument();
  });
});
