import type { Categoria } from './Categoria';

export interface Producto {
  idProducto: number;
  nombre: string;
  descripcion: string;
  idCategoria: Categoria; // objeto categoría completo
  stock: number;
  precio: number;
  imagen: string;
}

// Para crear un nuevo producto (POST)
export interface NuevoProducto {
  nombre: string;
  descripcion: string;
  idCategoria: number; // usualmente se envía solo el ID al backend
  stock: number;
  precio?: number;
}

// Para actualizar un producto (PUT/PATCH)
export interface UpdateProducto {
  nombre?: string;
  descripcion?: string;
  idCategoria?: number;
  stock?: number;
  precio?: number;
}
