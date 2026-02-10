export interface User {
  id: number | string;
  name?: string;
  email: string;
  esAdmin?: boolean;
  // agregá otros campos que necesites
}

export interface AppContextType {
  user: User | null;
  setUser: (u: User | null) => void;
}
