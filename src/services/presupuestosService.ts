import { api } from './api';
import { type Presupuesto } from '../types/Presupuesto';

const ENDPOINT = '/api/presupuestos';

export const presupuestosService = {
  getAll: async (): Promise<Presupuesto[]> => {
    const res = await api.get(ENDPOINT);
    return res.data;
  },

  getById: async (id: number): Promise<Presupuesto> => {
    const res = await api.get(`${ENDPOINT}/${id}`);
    return res.data;
  },

  create: async (data: Presupuesto): Promise<Presupuesto> => {
    const res = await api.post(ENDPOINT, data);
    return res.data;
  },

  update: async (id: number, data: Partial<Presupuesto>): Promise<Presupuesto> => {
    const res = await api.put(`${ENDPOINT}/${id}`, data);
    return res.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`${ENDPOINT}/${id}`);
  },

  getPDF: async (id: number): Promise<Blob> => {
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
    const res = await api.get(`${ENDPOINT}/${id}/pdf`, {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
};
