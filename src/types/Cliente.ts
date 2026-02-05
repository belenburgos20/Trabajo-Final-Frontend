export interface Cliente {
  id: number; // el backend usa "id", NO "idUsuario"
  nombre?: string;
  email: string;
  CUIT?: string;
  cuit?: string; // Agregado para manejar la propiedad en minúsculas que devuelve el backend
  direccion?: string;
  telefono?: number;
  localidad?: string;
  esAdmin?: boolean;
  password?: string; // el backend la devuelve si está en el JSON
  token?: string; // Agregado para incluir el token en la respuesta del backend
}

export interface NuevoCliente {
  email: string;
  password: string;
  nombre?: string;
  CUIT?: string;
  direccion?: string;
  telefono?: number;
  localidad?: string;
  esAdmin?: boolean;
}

export interface UpdateCliente {
  email?: string;
  password?: string;
  nombre?: string;
  CUIT?: string;
  direccion?: string;
  telefono?: number;
  localidad?: string;
  esAdmin?: boolean;
}
