import { useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Center,
  Text,
  Flex
} from "@chakra-ui/react";
import { findTransaction } from "../../service/Transaction";
import { findTransactionProps } from "../../types/TransactionInterface";
import { priceFormatter } from "../../utils/priceFormatter";
import { MdArrowUpward, MdArrowDownward } from "react-icons/md";

export function TransactionTable() {
  const [transactions, setTransactions] = useState<findTransactionProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await findTransaction();
        const sorted = data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setTransactions(sorted);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box p={6}>
      {loading ? (
        <Center>
          <Spinner size="lg" />
        </Center>
      ) : transactions.length === 0 ? (
        <Text>Nenhuma transação encontrada.</Text>
      ) : (
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Valor</Th>
              <Th>Categoria</Th>
              <Th>Tipo</Th>
              <Th>Data</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((tx) => (
              <Tr key={tx.id}>
                <Td>{tx.type === "expense" ? "- " : ""}{priceFormatter.format(tx.amount)}</Td>
                <Td>{tx.category}</Td>
                <Td textTransform="capitalize">
                  <Flex alignItems="center" justifyContent="space-between">
                    <Box>
                      {tx.type === "income" ? (
                        <MdArrowUpward color="green" />
                      ) : (
                        <MdArrowDownward color="red" />
                      )}
                    </Box>           
                  </Flex>
                </Td>
                <Td>{new Date(tx.createdAt).toLocaleDateString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
}
