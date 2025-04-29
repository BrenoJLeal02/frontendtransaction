import { findTransactionParams, findTransactionProps, NewTransactionFormInput } from "../types/TransactionInterface";
import { apiAuth } from "./api";

const baseURL = "/private";

const onCreateTransaction = async (data: NewTransactionFormInput) => {
  const response = await apiAuth.post(`${baseURL}/transaction/create`, data);
  return response.data;
};
const findTransaction = async (params?: findTransactionParams): Promise<findTransactionProps[]> => {
  const response = await apiAuth.get(`${baseURL}/transaction/find`, { params });
  return response.data;
};

export{ 
    onCreateTransaction, 
    findTransaction
  };
