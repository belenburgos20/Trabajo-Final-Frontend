export interface UsuarioAuth {
  id: number;
  nombre: string;
  email: string;
  rol: "cliente" | "admin";
}

export interface AuthContextType {
  usuario: UsuarioAuth | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
