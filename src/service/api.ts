import axios from 'axios';

export const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Esta função atualiza o token após o login
export function setAuthToken(token: string) {
  apiAuth.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
