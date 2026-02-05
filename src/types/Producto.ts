export interface Producto {
  idProducto: number;
  nombre: string;
  descripcion: string;
  idCategoria: number; // Cambiado a número para reflejar los datos del backend
  stock: number;
  precio: number;
  imagen: string;
  categoria_nombre?: string; // Nombre de la categoría, opcional
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
