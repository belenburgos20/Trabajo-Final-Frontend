import { type Producto } from "./Producto";

export interface PresupuestoItem {
  producto: Producto;
  cantidad: number;
}

export interface Presupuesto {
  id: number;
  clienteId: number;
  fecha: string; // formato ISO "2025-01-01"
  items: PresupuestoItem[];
  total: number;
  estado?: "pendiente" | "aprobado" | "rechazado";
}
