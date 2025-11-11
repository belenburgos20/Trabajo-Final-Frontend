import { useState, type ReactNode } from 'react';
import { AppContext } from './AppContext';
import type { User, AppContextType } from './AppProviderTypes';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const value: AppContextType = { user, setUser };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
