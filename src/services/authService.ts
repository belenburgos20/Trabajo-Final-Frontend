import axios, { USE_MOCKS } from './https';
import * as mock from './mockAdapter';
import type { Cliente } from '../types/Cliente';

interface Credentials {
  email: string;
  password: string; // Cambiado de 'contraseña' a 'password'
}

export async function login(credentials: Credentials): Promise<Cliente & { token: string }> {
  if (USE_MOCKS) {
    const clientes = await mock.listarClientesMock();
    const user = clientes.find(
      (c) => c.email === credentials.email && c.password === credentials.password
    );
    if (!user) throw new Error('Credenciales inválidas');
    return { ...user, token: 'mock-token', esAdmin: user.esAdmin } as Cliente & { token: string };
  }

  const res = await axios.post('/auth/login', {
    email: credentials.email,
    password: credentials.password, // Cambiado de 'contraseña' a 'password'
  });
  // Devolver el token junto con los datos del cliente
  return {
    id: res.data.id, // Cambiado de 'idusuario' a 'id'
    ...res.data,
    esAdmin: res.data.esAdmin,
    token: res.data.token,
  } as Cliente & {
    token: string;
  };
}

export async function logout() {
  if (USE_MOCKS) return true;
  await axios.post('/usuarios/logout');
  return true;
}

export async function crearUsuario(data: any): Promise<any> {
  try {
    const response = await axios.post('/usuarios', data);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Error al crear el usuario. Inténtalo nuevamente.');
    }
  }
}
