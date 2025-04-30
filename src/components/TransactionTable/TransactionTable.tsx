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
  Flex,
  TableContainer,
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
    <Box width="100%" maxW="1120px" mx="auto" px="1.5rem">
      {loading ? (
        <Center>
          <Spinner size="lg" />
        </Center>
      ) : transactions.length === 0 ? (
        <Text>Nenhuma transação encontrada.</Text>
      ) : (
        <TableContainer>
          <Table
            variant="unstyled"
            mt="1.5rem"
            style={{
              borderCollapse: "separate",
              borderSpacing: "0 8px",
            }}
          >
            <Tbody>
              {transactions.map((tx) => (
                <Tr key={tx.id}>
                  <Td
                    bg="#323238"
                    borderTopLeftRadius="6px"
                    borderBottomLeftRadius="6px"
                    paddingY="1.25rem"
                    paddingX="2rem"
                    textAlign="center"
                  >
                    {tx.category}
                  </Td>
                  <Td
                    bg="#323238"
                    paddingY="1.25rem"
                    paddingX="2rem"
                    textAlign="center"
                  >
                    <Text
                      fontWeight="bold"
                      color={tx.type === "income" ? "green.300" : "red.300"}
                    >
                      {tx.type === "expense" ? "- " : ""}
                      {priceFormatter.format(tx.amount)}
                    </Text>
                  </Td>

                  <Td
                    bg="#323238"
                    borderTopRightRadius="6px"
                    borderBottomRightRadius="6px"
                    paddingY="1.25rem"
                    paddingX="2rem"
                    textAlign="center"
                  >
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
