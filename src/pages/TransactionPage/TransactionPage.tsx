// TransactionPage.tsx
import { Box } from "@chakra-ui/react";
import { Header } from "../../components/Header/Header";
import { TransactionTable } from "../../components/TransactionTable/TransactionTable";
import { useEffect, useState } from "react";
import { findTransaction } from "../../service/Transaction";
import { findTransactionProps } from "../../types/TransactionInterface";
// import { Summary } from "../../components/Summary/Summary";

export function TransactionPage() {
  const [transactions, setTransactions] = useState<findTransactionProps[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadTransactions() {
    setLoading(true);
    try {
      const data = await findTransaction();
      const sorted = data.sort(
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
  }, []);

  return (
    <Box>
      <Header onTransactionCreated={loadTransactions} />
      {/* <Summary/> */}
      <TransactionTable
        transactions={transactions}
        loading={loading}
      />
    </Box>
  );
}
