import { BalanceTransactionProps, findTransactionParams, findTransactionProps, NewTransactionFormInput } from "../types/TransactionInterface";
import { apiAuth } from "./api";

// Define a URL base para a API privada (necessita de autenticação)
const baseURL = "/private";

// Função para criar uma nova transação
const onCreateTransaction = async (data: NewTransactionFormInput) => {
  // Envia uma requisição POST para a API para criar uma nova transação, passando os dados do formulário
  const response = await apiAuth.post(`${baseURL}/transaction/create`, data);
  
  // Retorna os dados da resposta, que geralmente incluem a transação criada
  return response.data;
};

// Função para encontrar transações, possivelmente filtradas por parâmetros (ex: tipo, categoria, etc.)
const findTransaction = async (params?: findTransactionParams): Promise<findTransactionProps[]> => {
  // Envia uma requisição GET para buscar transações, com parâmetros de filtragem opcionais
  const response = await apiAuth.get(`${baseURL}/transaction/find`, { params });

  // Retorna os dados das transações encontradas
  return response.data;
};

// Função para obter o saldo das transações do usuário, incluindo entradas, saídas e o total
const balanceTransaction = async (params?: findTransactionParams): Promise<BalanceTransactionProps> => {
  // Envia uma requisição GET para buscar o saldo das transações, com parâmetros de filtragem opcionais
  const response = await apiAuth.get(`${baseURL}/transaction/balance`, { params });

  // Retorna os dados do saldo das transações (entradas, saídas, total)
  return response.data;
};

const deleteTransaction = async (id: string): Promise<void> => {
  const response = await apiAuth.delete(`${baseURL}/transaction/delete/${id}`);
  return response.data;
}

// Exporta as funções para serem usadas em outras partes do aplicativo
export {
  onCreateTransaction,
  findTransaction,
  balanceTransaction,
  deleteTransaction
};