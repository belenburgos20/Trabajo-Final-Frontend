import { useState, useEffect, useCallback } from 'react';
import * as presupuestosService from '../services/presupestosService';
import type { Presupuesto, NuevoPresupuesto, UpdatePresupuesto, CrearPresupuestoResponse } from '../types/Presupuesto';

interface UsePresupuestosReturn {
  presupuestos: Presupuesto[];
  isLoading: boolean;
  error: string | null;
  fetchPresupuestos: () => Promise<void>;
  fetchPresupuestoById: (id: string) => Promise<Presupuesto | null>;
  fetchPresupuestosPorUsuario: (idUsuario: string) => Promise<Presupuesto[]>;
  fetchPresupuestosPorFecha: (fecha: string) => Promise<Presupuesto[]>;
  fetchPresupuestosPorEstado: (estado: string) => Promise<Presupuesto[]>;
  createPresupuesto: (data: NuevoPresupuesto) => Promise<CrearPresupuestoResponse | null>;
  updatePresupuesto: (id: string, data: UpdatePresupuesto) => Promise<Presupuesto | null>;
  deletePresupuesto: (id: string) => Promise<boolean>;
}

/**
 * Hook personalizado para manejar operaciones CRUD de presupuestos
 * Gestiona el estado de presupuestos, carga y errores
 * @param autoFetch - Si es true, carga los presupuestos automáticamente al montar
 */
export function usePresupuestos(autoFetch = false): UsePresupuestosReturn {
  const [presupuestos, setPresupuestos] = useState<Presupuesto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPresupuestos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await presupuestosService.getPresupuestos();
      const presupuestosAdaptados: Presupuesto[] = data.map((p: any) => ({
        idPresupuesto: p.idPresupuesto,
        idUsuario: p.nombre_usuario ?? p.idUsuario,
        fecha: p.fecha_creacion,
        estado: p.estado,
        detalle: p.detalle ?? [],
        montoTotal: p.montoTotal,
      }));

      setPresupuestos(presupuestosAdaptados);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar presupuestos';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchPresupuestoById = async (id: string): Promise<Presupuesto | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const presupuesto = await presupuestosService.getPresupuestoById(id);
      return presupuesto;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar presupuesto';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPresupuestosPorUsuario = useCallback(
    async (idUsuario: string): Promise<Presupuesto[]> => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await presupuestosService.getPresupuestosPorUsuario(idUsuario);
        setPresupuestos(data);
        return data;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Error al cargar presupuestos del usuario';
        setError(errorMessage);
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const fetchPresupuestosPorFecha = async (fecha: string): Promise<Presupuesto[]> => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await presupuestosService.getPresupuestosPorFecha(fecha);
      setPresupuestos(data);
      return data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error al cargar presupuestos por fecha';
      setError(errorMessage);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPresupuestosPorEstado = async (estado: string): Promise<Presupuesto[]> => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await presupuestosService.getPresupuestosPorEstado(estado);
      setPresupuestos(data);
      return data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error al cargar presupuestos por estado';
      setError(errorMessage);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const createPresupuesto = async (data: NuevoPresupuesto): Promise<CrearPresupuestoResponse | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await presupuestosService.crearPresupuesto(data);
      if(!res.idPresupuesto){
        throw new Error("No se pudo crear el presupuesto");
      }
      await fetchPresupuestos();
      return res;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear presupuesto';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePresupuesto = async (
    id: string,
    data: UpdatePresupuesto
  ): Promise<Presupuesto | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const presupuestoActualizado = await presupuestosService.actualizarPresupuesto(id, data);
      // Actualizar la lista de presupuestos
      await fetchPresupuestos();
      return presupuestoActualizado;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar presupuesto';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deletePresupuesto = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await presupuestosService.eliminarPresupuesto(id);
      // Actualizar la lista de presupuestos
      await fetchPresupuestos();
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar presupuesto';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchPresupuestos();
    }
  }, [autoFetch, fetchPresupuestos]);

  return {
    presupuestos,
    isLoading,
    error,
    fetchPresupuestos,
    fetchPresupuestoById,
    fetchPresupuestosPorUsuario,
    fetchPresupuestosPorFecha,
    fetchPresupuestosPorEstado,
    createPresupuesto,
    updatePresupuesto,
    deletePresupuesto,
  };
}
