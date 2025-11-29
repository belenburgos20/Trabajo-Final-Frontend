import axios from './https';
import type { Cliente, NuevoCliente, UpdateCliente } from '../types/Cliente';

const API_URL = '/usuarios';

export async function getClienteById(id: number): Promise<Cliente> {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}

export async function crearCliente(data: NuevoCliente): Promise<Cliente> {
  const response = await axios.post(`${API_URL}/`, data);
  return response.data;
}
export async function actualizarCliente(id: number, data: UpdateCliente): Promise<Cliente> {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
}
