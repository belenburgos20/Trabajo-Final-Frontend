export interface User {
  id: string;
  name: string;
  email: string;
  // agregá otros campos que necesites
}

export interface AppContextType {
  user: User | null;
  setUser: (u: User | null) => void;
}
