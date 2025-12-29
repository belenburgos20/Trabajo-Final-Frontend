import { type Producto } from './Producto';

export interface CartItem {
  producto: Producto;
  cantidad: number;
}

export interface CartContextType {
  items: CartItem[];
  agregar: (producto: Producto) => void;
  quitar: (productoId: number) => void;
  vaciar: () => void;
}
