export interface DetallePresupuesto {
  idDetallePresupuesto: number;
  nombreProducto: string;
  cantidad: number;
  precioUnitario: number;
  totalProducto: number;
  montoTotal: number;
}

// Para crear un detalle dentro de un nuevo presupuesto
export interface NuevoDetallePresupuesto {
  idPresupuesto: number;
  idDetallePresupuesto?: number;
  idProducto: number;
  cantidad: number;
  precio: number;
}

// Para actualizar un detalle existente
export interface UpdateDetallePresupuesto {
  cantidad?: number;
  precio?: number;
}
