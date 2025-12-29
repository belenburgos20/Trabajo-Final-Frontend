import axios from 'axios';

// por defecto usamos mocks en desarrollo para evitar depender del backend
export const USE_MOCKS = true;

const instance = axios.create({
  baseURL: 'http://localhost:3000', // cambia al puerto donde corre tu backend si usas API real
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
