import axios from 'axios';
import { API_BASE_URL } from '../config/api';

// por defecto usamos mocks en desarrollo para evitar depender del backend
export const USE_MOCKS = false;

const instance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Agregar un interceptor para incluir el token en las solicitudes
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Obtener el token del localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Agregar el token al encabezado Authorization
  }
  return config;
});

export default instance;
