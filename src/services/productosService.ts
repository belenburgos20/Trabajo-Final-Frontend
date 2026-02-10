import axios, { USE_MOCKS } from './https';
import type { Producto, NuevoProducto, UpdateProducto } from '../types/Producto';
import * as mock from './mockAdapter';

const API_URL = '/productos';

export async function getProductos(): Promise<Producto[]> {
  if (USE_MOCKS) return mock.getProductosMock();
  const response = await axios.get(`${API_URL}/list`);
  return response.data;
}

export async function getProductoByCodigo(codigo: string): Promise<Producto> {
  if (USE_MOCKS) return (await mock.getProductoByCodigoMock(codigo)) as Producto;
  const response = await axios.get(`${API_URL}/${codigo}`);
  return response.data;
}

export async function getProductosPorCategoria(idCategoria: string): Promise<Producto[]> {
  if (USE_MOCKS) return mock.getProductosPorCategoriaMock(idCategoria);
  const response = await axios.get(`${API_URL}/categoria/${idCategoria}`);
  return response.data;
}

export async function getProductoPorNombre(nombre: string): Promise<Producto[]> {
  if (USE_MOCKS) return mock.getProductoPorNombreMock(nombre);
  const response = await axios.get(`${API_URL}/productos/${nombre}`);
  return response.data;
}

export async function crearProducto(data: NuevoProducto): Promise<Producto> {
  if (USE_MOCKS) return mock.crearProductoMock(data);
  const response = await axios.post(`${API_URL}/`, data);
  return response.data;
}

export async function actualizarProducto(
  idproducto: string, // Cambiado a string
  data: UpdateProducto
): Promise<Producto> {
  if (USE_MOCKS) return (await mock.actualizarProductoMock(idproducto, data)) as Producto;
  const response = await axios.put(`${API_URL}/${idproducto}`, data);
  return response.data;
}

export async function eliminarProducto(idproducto: string): Promise<{ message: string }> {
  if (USE_MOCKS) return mock.eliminarProductoMock(idproducto);
  const response = await axios.delete(`${API_URL}/${idproducto}`);
  return response.data;
}
