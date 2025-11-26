import { api } from "./api";
// Estos tipos los deberías tener en /types, pero si no, los creamos después
import { type Cliente } from "../types/Cliente";

const ENDPOINT = "/clientes";

export const clientesService = {
  getAll: async (): Promise<Cliente[]> => {
    const res = await api.get(ENDPOINT);
    return res.data;
  },

  getById: async (id: number): Promise<Cliente> => {
    const res = await api.get(`${ENDPOINT}/${id}`);
    return res.data;
  },

  create: async (data: Cliente): Promise<Cliente> => {
    const res = await api.post(ENDPOINT, data);
    return res.data;
  },

  update: async (id: number, data: Partial<Cliente>): Promise<Cliente> => {
    const res = await api.put(`${ENDPOINT}/${id}`, data);
    return res.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`${ENDPOINT}/${id}`);
  },
};
