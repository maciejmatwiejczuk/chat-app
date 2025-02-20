import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://chat-app-bhhw.onrender.com',
  withCredentials: true,
});
