export interface NewTransactionFormInput{
    description: string;
    price: number;
    category: string;
    type: "income" | "outcome";
  };
  
export interface NewTransactionModalProps{
    isOpen: boolean;
    onClose: () => void;
    onCreateTransaction: (data: NewTransactionFormInput) => Promise<void>;
  };
  