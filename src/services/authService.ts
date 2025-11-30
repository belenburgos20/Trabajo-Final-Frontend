import axios, { USE_MOCKS } from './https';
import * as mock from './mockAdapter';
import type { Cliente } from '../types/Cliente';

interface Credentials {
  email: string;
  password: string;
}

export async function login(credentials: Credentials): Promise<Cliente> {
  if (USE_MOCKS) {
    const clientes = await mock.listarClientesMock();
    const user = clientes.find(
      (c) => c.email === credentials.email && c.contraseña === credentials.password
    );
    if (!user) throw new Error('Credenciales inválidas');
    return user as Cliente;
  }

  const res = await axios.post('/auth/login', {
    email: credentials.email,
    password: credentials.password,
  });
  return res.data as Cliente;
}

export async function logout() {
  if (USE_MOCKS) return true;
  await axios.post('/auth/logout');
  return true;
}
