import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // cambia al puerto donde corre tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
