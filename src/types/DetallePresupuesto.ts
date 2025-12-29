export interface DetallePresupuesto {
  idDetallePresupuesto: number;
  idPresupuesto: number;
  idProducto: number;
  cantidad: number;
  precio: number;
}

// Para crear un detalle dentro de un nuevo presupuesto
export interface NuevoDetallePresupuesto {
  idProducto: number;
  cantidad: number;
  precio: number;
}

// Para actualizar un detalle existente
export interface UpdateDetallePresupuesto {
  cantidad?: number;
  precio?: number;
}
