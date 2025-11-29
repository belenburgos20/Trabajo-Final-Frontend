import axios from './https';
import type { Producto, NuevoProducto, UpdateProducto } from '../types/Producto';

const API_URL = '/productos';

export async function getProductos(): Promise<Producto[]> {
  const response = await axios.get(`${API_URL}/list`);
  return response.data;
}

export async function getProductoByCodigo(codigo: string): Promise<Producto> {
  const response = await axios.get(`${API_URL}/${codigo}`);
  return response.data;
}

export async function getProductosPorCategoria(idCategoria: string): Promise<Producto[]> {
  const response = await axios.get(`${API_URL}/categoria/${idCategoria}`);
  return response.data;
}

export async function getProductoPorNombre(nombre: string): Promise<Producto[]> {
  const response = await axios.get(`${API_URL}/productos/${nombre}`);
  return response.data;
}

export async function crearProducto(data: NuevoProducto): Promise<Producto> {
  const response = await axios.post(`${API_URL}/`, data);
  return response.data;
}

export async function actualizarProducto(codigo: string, data: UpdateProducto): Promise<Producto> {
  const response = await axios.put(`${API_URL}/${codigo}`, data);
  return response.data;
}

export async function eliminarProducto(codigo: string): Promise<{ message: string }> {
  const response = await axios.delete(`${API_URL}/${codigo}`);
  return response.data;
}
