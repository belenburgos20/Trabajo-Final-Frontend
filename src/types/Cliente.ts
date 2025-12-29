export interface Cliente {
  id: number; // el backend usa "id", NO "idUsuario"
  nombre?: string;
  email: string;
  CUIT?: string;
  direccion?: string;
  telefono?: number;
  localidad?: string;
  esAdmin?: boolean;
  contraseña?: string; // el backend la devuelve si está en el JSON
}

export interface NuevoCliente {
  email: string;
  contraseña: string;
  nombre?: string;
  CUIT?: string;
  direccion?: string;
  telefono?: number;
  localidad?: string;
  esAdmin?: boolean;
}

export interface UpdateCliente {
  email?: string;
  contraseña?: string;
  nombre?: string;
  CUIT?: string;
  direccion?: string;
  telefono?: number;
  localidad?: string;
  esAdmin?: boolean;
}
