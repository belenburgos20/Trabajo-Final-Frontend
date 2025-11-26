import { api } from "./api";
import { type Producto } from "../types/Producto";

const ENDPOINT = "/productos";

export const productosService = {
  getAll: async (): Promise<Producto[]> => {
    const res = await api.get(ENDPOINT);
    return res.data;
  },

  getById: async (id: number): Promise<Producto> => {
    const res = await api.get(`${ENDPOINT}/${id}`);
    return res.data;
  },

  create: async (data: Producto): Promise<Producto> => {
    const res = await api.post(ENDPOINT, data);
    return res.data;
  },

  update: async (id: number, data: Partial<Producto>): Promise<Producto> => {
    const res = await api.put(`${ENDPOINT}/${id}`, data);
    return res.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`${ENDPOINT}/${id}`);
  },
};
