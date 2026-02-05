import { createContext } from 'react';
import type { AppContextType } from './AppProviderTypes';

// Inicializamos como undefined
export const AppContext = createContext<AppContextType | undefined>(undefined);
