import axios, { USE_MOCKS } from './https';
import type { Presupuesto, NuevoPresupuesto, UpdatePresupuesto } from '../types/Presupuesto';
import * as mock from './mockAdapter';

const API_URL = '/presupuestos';

export async function getPresupuestos(): Promise<Presupuesto[]> {
  if (USE_MOCKS) return mock.getPresupuestosMock();
  const response = await axios.get(`${API_URL}/`);
  return response.data;
}

export async function getPresupuestoById(id: string): Promise<Presupuesto> {
  if (USE_MOCKS) return (await mock.getPresupuestoByIdMock(id)) as Presupuesto;
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}
export async function getPresupuestosPorUsuario(idUsuario: string): Promise<Presupuesto[]> {
  if (USE_MOCKS) return mock.getPresupuestosPorUsuarioMock(idUsuario);
  const response = await axios.get(`${API_URL}/usuario/${idUsuario}`);
  return response.data;
}

export async function getPresupuestosPorFecha(fecha: string): Promise<Presupuesto[]> {
  if (USE_MOCKS) return mock.getPresupuestosPorFechaMock(fecha);
  const response = await axios.get(`${API_URL}/fecha/${fecha}`);
  return response.data;
}
export async function getPresupuestosPorEstado(estado: string): Promise<Presupuesto[]> {
  if (USE_MOCKS) return mock.getPresupuestosPorEstadoMock(estado);
  const response = await axios.get(`${API_URL}/estado/${estado}`);
  return response.data;
}
export async function crearPresupuesto(data: NuevoPresupuesto): Promise<Presupuesto> {
  if (USE_MOCKS) return mock.crearPresupuestoMock(data);
  const response = await axios.post(`${API_URL}/`, data);
  return response.data;
}

export async function actualizarPresupuesto(
  id: string,
  data: UpdatePresupuesto
): Promise<Presupuesto> {
  if (USE_MOCKS) return (await mock.actualizarPresupuestoMock(id, data)) as Presupuesto;
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
}
export async function eliminarPresupuesto(id: string): Promise<{ message: string }> {
  if (USE_MOCKS) return mock.eliminarPresupuestoMock(id);
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
}
