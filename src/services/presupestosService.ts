import axios from './https';
import type { Presupuesto, NuevoPresupuesto, UpdatePresupuesto } from '../types/Presupuesto';

const API_URL = '/presupuesto';

export async function getPresupuestos(): Promise<Presupuesto[]> {
  const response = await axios.get(`${API_URL}/`);
  return response.data;
}

export async function getPresupuestoById(id: string): Promise<Presupuesto> {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}
export async function getPresupuestosPorUsuario(idUsuario: string): Promise<Presupuesto[]> {
  const response = await axios.get(`${API_URL}/usuario/${idUsuario}`);
  return response.data;
}

export async function getPresupuestosPorFecha(fecha: string): Promise<Presupuesto[]> {
  const response = await axios.get(`${API_URL}/fecha/${fecha}`);
  return response.data;
}
export async function getPresupuestosPorEstado(estado: string): Promise<Presupuesto[]> {
  const response = await axios.get(`${API_URL}/estado/${estado}`);
  return response.data;
}
export async function crearPresupuesto(data: NuevoPresupuesto): Promise<Presupuesto> {
  const response = await axios.post(`${API_URL}/`, data);
  return response.data;
}

export async function actualizarPresupuesto(
  id: string,
  data: UpdatePresupuesto
): Promise<Presupuesto> {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
}
export async function eliminarPresupuesto(id: string): Promise<{ message: string }> {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
}
