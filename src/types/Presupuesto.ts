import type { DetallePresupuesto, NuevoDetallePresupuesto } from './DetallePresupuesto.ts';

// Representa un presupuesto tal como lo devuelve el backend
export interface Presupuesto {
  idPresupuesto: number;
  idUsuario: number;
  fecha: string; // Dates vienen como string en JSON
  detalle: DetallePresupuesto[];
  montoTotal: number;
  fechaEntrega: string;
  estado: string;
}

// Para crear un nuevo presupuesto (POST)
export interface NuevoPresupuesto {
  idUsuario: number;

  // por cómo funciona normalmente el backend:
  // el backend calcula el idPresupuesto automáticamente
  fecha: string;
  fechaEntrega: string;
  estado: string;

  // detalle: array completo de productos seleccionados
  detalle: NuevoDetallePresupuesto[];
}

// Para actualizar un presupuesto existente (PUT/PATCH)
export interface UpdatePresupuesto {
  fecha?: string;
  fechaEntrega?: string;
  estado?: string;
  detalle?: NuevoDetallePresupuesto[];
}
