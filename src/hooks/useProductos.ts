import { useState, useEffect, useCallback } from 'react';
import * as productosService from '../services/productosService';
import type { Producto, NuevoProducto, UpdateProducto } from '../types/Producto';

interface UseProductosReturn {
  productos: Producto[];
  isLoading: boolean;
  error: string | null;
  fetchProductos: () => Promise<void>;
  fetchProductoByCodigo: (codigo: string) => Promise<Producto | null>;
  fetchProductosPorCategoria: (idCategoria: string) => Promise<Producto[]>;
  fetchProductoPorNombre: (nombre: string) => Promise<Producto[]>;
  createProducto: (data: NuevoProducto) => Promise<Producto | null>;
  updateProducto: (codigo: string, data: UpdateProducto) => Promise<Producto | null>;
  deleteProducto: (codigo: string) => Promise<boolean>;
}

/**
 * Hook personalizado para manejar operaciones CRUD de productos
 * Gestiona el estado de productos, carga y errores
 * @param autoFetch - Si es true, carga los productos automáticamente al montar
 */
export function useProductos(autoFetch = false): UseProductosReturn {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProductos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await productosService.getProductos();
      const transformedData: Producto[] = data.map((producto: any) => ({
        ...producto,
        idProducto: producto.idproducto, // Transformamos idproducto a idProducto
      }));
      setProductos(transformedData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar productos';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchProductoByCodigo = async (codigo: string): Promise<Producto | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const producto = await productosService.getProductoByCodigo(codigo);
      return producto;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar producto';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProductosPorCategoria = async (idCategoria: string): Promise<Producto[]> => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await productosService.getProductosPorCategoria(idCategoria);
      const transformedData: Producto[] = data.map((producto: any) => ({
        ...producto,
        idProducto: producto.idproducto, // Transformamos idproducto a idProducto
      }));
      return transformedData;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error al cargar productos por categoría';
      setError(errorMessage);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProductoPorNombre = async (nombre: string): Promise<Producto[]> => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await productosService.getProductoPorNombre(nombre);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al buscar productos';
      setError(errorMessage);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const createProducto = async (data: NuevoProducto): Promise<Producto | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const nuevoProducto = await productosService.crearProducto(data);
      // Actualizar la lista de productos
      await fetchProductos();
      return nuevoProducto;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear producto';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProducto = async (codigo: string, data: UpdateProducto): Promise<Producto | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const productoActualizado = await productosService.actualizarProducto(codigo, data);
      // Actualizar la lista de productos
      await fetchProductos();
      return productoActualizado;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar producto';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProducto = async (codigo: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await productosService.eliminarProducto(codigo);
      // Actualizar la lista de productos
      await fetchProductos();
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar producto';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchProductos();
    }
  }, [autoFetch, fetchProductos]);

  return {
    productos,
    isLoading,
    error,
    fetchProductos,
    fetchProductoByCodigo,
    fetchProductosPorCategoria,
    fetchProductoPorNombre,
    createProducto,
    updateProducto,
    deleteProducto,
  };
}
