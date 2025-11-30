import { useState, type ReactNode, useEffect } from 'react';
import { AppContext } from './AppContext';
import type { User, AppContextType } from './AppProviderTypes';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('user');
      if (raw) {
        const parsed = JSON.parse(raw);
        const u: User = {
          id: String(parsed.id),
          name: parsed.nombre || parsed.name,
          email: parsed.email,
          esAdmin: parsed.esAdmin,
        };
        setUser(u);
      }
    } catch (e) {}
  }, []);

  const value: AppContextType = { user, setUser };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
