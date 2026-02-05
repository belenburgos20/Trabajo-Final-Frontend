import axios from 'axios'; // Cambiar a importación compatible con esModuleInterop

// por defecto usamos mocks en desarrollo para evitar depender del backend
export const USE_MOCKS = false;

const instance = axios.create({
  baseURL: 'http://localhost:3000/api', // cambia al puerto donde corre tu backend si usas API real
  headers: {
    'Content-Type': 'application/json',
  },
});

// Agregar un interceptor para incluir el token en las solicitudes
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Obtener el token del localStorage
  console.log('Token obtenido del localStorage:', token); // Log para verificar el token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Agregar el token al encabezado Authorization
  }
  return config;
});

export default instance;
