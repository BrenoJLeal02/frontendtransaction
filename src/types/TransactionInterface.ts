export interface NewTransactionFormInput{
    userId: string;
    amount: number;
    category: string;
    type: "income" | "outcome";
  };
  
  export interface NewTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
  