// Representa una categoría tal como la devuelve el backend
export interface Categoria {
  idCategoria: number;
  nombre: string;
}

// Para crear una categoría nueva (POST)
export interface NuevaCategoria {
  nombre: string;
}

// Para actualizar una categoría existente (PUT / PATCH)
export interface UpdateCategoria {
  nombre?: string;
}
