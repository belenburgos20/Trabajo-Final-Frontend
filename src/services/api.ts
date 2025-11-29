import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000', // Cambiar cuando tengan backend real
  headers: {
    'Content-Type': 'application/json',
  },
});
