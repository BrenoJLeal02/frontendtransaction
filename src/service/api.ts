import axios from 'axios';

// Obtém o token JWT armazenado no localStorage. Caso não exista, usa 'no token' como fallback.
const token = localStorage.getItem('jwtToken') || 'no token';

// Cria uma instância personalizada do axios com configurações pré-definidas
export const apiAuth = axios.create({
  // Define a URL base para todas as requisições feitas com essa instância
  baseURL: import.meta.env.VITE_API_URL, // O valor de VITE_API_URL é obtido de variáveis de ambiente definidas durante o build (no arquivo .env)
  headers: {
    // Adiciona o token JWT no header Authorization, permitindo autenticação em requisições subsequentes
    Authorization: `Bearer ${token}`,
  },
});
