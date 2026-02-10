import axios, { USE_MOCKS } from './https';
import type { Cliente, NuevoCliente, UpdateCliente } from '../types/Cliente';
import * as mock from './mockAdapter';

const API_URL = 'http://localhost:3000/api/usuarios';

export async function getClienteById(id: number): Promise<Cliente> {
  if (USE_MOCKS) return (await mock.getClienteByIdMock(id)) as Cliente;
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = response.data;

  // Usar directamente el campo 'id' en lugar de 'idUsuario'
  return {
    ...data,
    id: data.id, // Usar directamente el campo 'id' en lugar de 'idUsuario'
  };
}

export async function crearCliente(data: NuevoCliente): Promise<Cliente> {
  if (USE_MOCKS) return mock.crearClienteMock(data);
  try {
    const response = await axios.post(`${API_URL}/`, data);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      // Propagar el mensaje de error exacto del backend
      throw new Error(error.response.data.message);
    }
    // Mensaje genérico en caso de que no haya un mensaje específico del backend
    throw new Error('Error al crear cliente.');
  }
}
export async function actualizarCliente(id: number, data: UpdateCliente): Promise<Cliente> {
  if (USE_MOCKS) return (await mock.actualizarClienteMock(id, data)) as Cliente;
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.usuario; // Devolver solo el objeto del usuario actualizado
}

export async function listarClientes(): Promise<Cliente[]> {
  if (USE_MOCKS) return mock.listarClientesMock();
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
