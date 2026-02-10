import { render, screen } from '@testing-library/react';

function DummyComponent() {
  return <div>Hola desde el test</div>;
}

describe('DummyComponent', () => {
  it('se renderiza sin errores', () => {
    render(<DummyComponent />);
    expect(screen.getByText('Hola desde el test')).toBeInTheDocument();
  });
});
