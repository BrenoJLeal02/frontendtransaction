import { NewTransactionFormInput } from "../types/TransactionInterface";
import { apiAuth } from "./api";

const baseURL = "/private";

const onCreateTransaction = async (data: NewTransactionFormInput) => {
  const response = await apiAuth.post(`${baseURL}/transaction/create`, data);
  return response.data;
};

export{ 
    onCreateTransaction 
};
