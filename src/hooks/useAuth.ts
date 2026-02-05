import { useState } from 'react';
import * as authService from '../services/authService';
import type { Cliente } from '../types/Cliente';

interface UseAuthReturn {
  login: (email: string, password: string) => Promise<Cliente | null>;
  logout: () => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
  esAdmin: boolean | undefined;
  userId: number | null; // Agregar el ID del usuario autenticado
}

//autenticacion dde usuarios
export function useAuth(): UseAuthReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [esAdmin, setEsAdmin] = useState<boolean | undefined>(undefined);
  const [userId, setUserId] = useState<number | null>(null); // Estado para el ID del usuario

  const login = async (email: string, password: string): Promise<Cliente | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await authService.login({ email, password });
      if (user) {
        setEsAdmin(user.esAdmin);
        setUserId(user.id); // Guardar el ID del usuario autenticado
        localStorage.setItem('esAdmin', JSON.stringify(user.esAdmin));
        localStorage.setItem('userId', JSON.stringify(user.id)); // Guardar el ID en localStorage
      }
      return user;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.logout();
      setEsAdmin(undefined);
      setUserId(null); // Limpiar el ID del usuario
      localStorage.removeItem('esAdmin');
      localStorage.removeItem('userId'); // Eliminar el ID del localStorage
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cerrar sesión';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    logout,
    isLoading,
    error,
    esAdmin,
    userId, // Retornar el ID del usuario
  };
}
