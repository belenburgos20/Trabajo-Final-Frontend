import axios, { USE_MOCKS } from './https';
import * as mock from './mockAdapter';
import type { Cliente } from '../types/Cliente';

interface Credentials {
  email: string;
  password: string;
}

export async function login(credentials: { email: string; password: string }) {
  if (USE_MOCKS) {
    const clientes = await mock.listarClientesMock();
    const user = (clientes as Cliente[]).find(
      (c: any) => c.email === credentials.email && c.contraseña === credentials.password
    );
    if (!user) throw new Error('Credenciales inválidas');
    return user;
  }

  const res = await axios.post('/auth/login', {
    email: credentials.email,
    password: credentials.password,
  });
  return res.data;
}

export async function logout() {
  if (USE_MOCKS) return true;
  await axios.post('/auth/logout');
  return true;
}
