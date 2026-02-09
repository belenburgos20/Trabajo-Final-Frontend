import { useState, type ReactNode, useEffect } from 'react';
import { AppContext } from './AppContext';
import type { User, AppContextType } from './AppProviderTypes';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [user, setUserState] = useState<User | null>(null);

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
  };

  useEffect(() => {
    try {
      localStorage.removeItem('user'); // Limpieza forzada de localStorage al cargar la aplicación
      const raw = localStorage.getItem('user');
      if (raw) {
        const parsed = JSON.parse(raw);

        // Normalizar diferentes formas del objeto 'user' (id, idUsuario, nombre)
        const idFromParsed = parsed.id ?? parsed.idUsuario ?? parsed.id_usuario ?? parsed.idusuario; // Cambiar a 'id' como clave principal para el ID del usuario
        const emailFromParsed = parsed.email ?? parsed.correo ?? parsed.mail;
        const nameFromParsed = parsed.nombre ?? parsed.name ?? parsed.username;
        const esAdminFromParsed = parsed.esAdmin ?? parsed.es_admin ?? parsed.admin ?? false;

        const u: User = {
          id: idFromParsed ? String(Number(idFromParsed)) : '', // Convertir ID a número y luego a string
          name: nameFromParsed,
          email: emailFromParsed,
          esAdmin: Boolean(esAdminFromParsed),
        };

        // Si no hay id ni email, no seteamos el usuario
        if (u.id && u.email) setUser(u);
        console.log('Objeto user procesado:', u);
        console.log('ID procesado desde localStorage:', idFromParsed);
        console.log('Email procesado desde localStorage:', emailFromParsed);
        console.log('Nombre procesado desde localStorage:', nameFromParsed);
        console.log('EsAdmin procesado desde localStorage:', esAdminFromParsed);
      }
    } catch {
      /* ignore JSON parse errors */
    }
  }, []);

  const value: AppContextType = { user, setUser };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
