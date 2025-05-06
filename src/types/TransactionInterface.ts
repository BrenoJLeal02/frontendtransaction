export interface NewTransactionFormInput{
    userId: string;
    amount: number;
    category: string;
    type: "income" | "expense";
  };
  
  export interface NewTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
  export interface findTransactionProps{
    id: string;
    userId: string;
    amount: number;
    category: string;
    type: "income" | "expense";
    createdAt: Date;
  }
  export interface findTransactionParams {
    userId?: string;
    type?: "income" | "expense";
    category?: string;
  }

  export interface BalanceTransactionProps {
    income: number;
    expense: number;
    total: number;
  }
