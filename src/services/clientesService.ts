import axios, { USE_MOCKS } from './https';
import type { Cliente, NuevoCliente, UpdateCliente } from '../types/Cliente';
import * as mock from './mockAdapter';

const API_URL = '/usuarios';

export async function getClienteById(id: number): Promise<Cliente> {
  if (USE_MOCKS) return (await mock.getClienteByIdMock(id)) as Cliente;
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}

export async function crearCliente(data: NuevoCliente): Promise<Cliente> {
  if (USE_MOCKS) return mock.crearClienteMock(data);
  const response = await axios.post(`${API_URL}/`, data);
  return response.data;
}
export async function actualizarCliente(id: number, data: UpdateCliente): Promise<Cliente> {
  if (USE_MOCKS) return (await mock.actualizarClienteMock(id, data)) as Cliente;
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
}

export async function listarClientes(): Promise<Cliente[]> {
  if (USE_MOCKS) return mock.listarClientesMock();
  const response = await axios.get(`${API_URL}/`);
  return response.data;
}
