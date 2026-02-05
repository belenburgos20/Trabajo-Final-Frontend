import { useState, useEffect, useCallback } from 'react';
import * as clientesService from '../services/clientesService';
import type { Cliente, NuevoCliente, UpdateCliente } from '../types/Cliente';

interface UseClientesReturn {
  clientes: Cliente[];
  isLoading: boolean;
  error: string | null;
  fetchClientes: () => Promise<void>;
  fetchClienteById: (id: number) => Promise<Cliente | null>;
  createCliente: (data: NuevoCliente) => Promise<Cliente | null>;
  updateCliente: (id: number, data: UpdateCliente) => Promise<Cliente | null>;
}

/**
 * Hook personalizado para manejar operaciones CRUD de clientes/usuarios
 * Gestiona el estado de clientes, carga y errores
 * @param autoFetch - Si es true, carga los clientes automáticamente al montar
 */
export function useClientes(autoFetch = false): UseClientesReturn {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClientes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await clientesService.listarClientes();
      setClientes(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar clientes';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchClienteById = useCallback(async (id: number): Promise<Cliente | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const cliente = await clientesService.getClienteById(id);
      console.log('Datos obtenidos del backend:', cliente);
      return cliente;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar cliente';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createCliente = async (data: NuevoCliente): Promise<Cliente | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const nuevoCliente = await clientesService.crearCliente(data);
      // Actualizar la lista de clientes
      await fetchClientes();
      return nuevoCliente;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear cliente';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCliente = async (id: number, data: UpdateCliente): Promise<Cliente | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const clienteActualizado = await clientesService.actualizarCliente(id, data);
      // Actualizar la lista de clientes
      await fetchClientes();
      return clienteActualizado;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar cliente';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchClientes();
    }
  }, [autoFetch, fetchClientes]);

  return {
    clientes,
    isLoading,
    error,
    fetchClientes,
    fetchClienteById,
    createCliente,
    updateCliente,
  };
}
