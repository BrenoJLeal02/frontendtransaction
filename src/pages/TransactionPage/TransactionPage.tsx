import { Box } from "@chakra-ui/react";
import { Header } from "../../components/Header/Header";
import { TransactionTable } from "../../components/TransactionTable/TransactionTable";
import { useEffect, useState } from "react";
import { findTransaction } from "../../service/Transaction";
import { findTransactionProps } from "../../types/TransactionInterface";
import { useAuthUser } from "../../hooks/useAuthUser"; 
import { Summary } from "../../components/Summary/Summary"; 

export function TransactionPage() {
  const { userId } = useAuthUser(); 
  const [transactions, setTransactions] = useState<findTransactionProps[]>([]);
  const [loading, setLoading] = useState(true);

  // Função para carregar transações
  async function loadTransactions() {
    setLoading(true);
    try {
      const data = await findTransaction();

      // Filtrar transações com o mesmo userId do usuário logado
      const filteredTransactions = data.filter(tx => tx.userId === userId);

      const sorted = filteredTransactions.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setTransactions(sorted);
    } catch (error) {
      console.error("Erro ao carregar transações:", error);
    } finally {
      setLoading(false); 
    }
  }

  useEffect(() => {
    loadTransactions();
  }, [userId]);

  return (
    <Box>
      <Header onTransactionCreated={loadTransactions} /> 
      
      <Summary transactions={transactions} />
    
      <TransactionTable transactions={transactions} loading={loading} />
    </Box>
  );
}
