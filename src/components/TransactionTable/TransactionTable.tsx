import { useEffect, useState } from "react";
import {
  Box,
  Table,
  Tbody,
  Tr,
  Td,
  Spinner,
  Center,
  Text,
  Flex,
  Input,
  TableContainer,
} from "@chakra-ui/react";
import { findTransaction } from "../../service/Transaction";
import { findTransactionProps } from "../../types/TransactionInterface";
import { priceFormatter } from "../../utils/priceFormatter";

export function TransactionTable() {
  const [transactions, setTransactions] = useState<findTransactionProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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

  const filteredTransactions = transactions.filter((tx) =>
    tx.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box width="100%" maxW="1120px" mx="auto" px="1.5rem">
      <Flex gap="1rem" my={6}>
        <Input
          placeholder="Filtrar por categoria..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          bg="#121214"
          color="gray.300"
          _placeholder={{ color: "gray.500" }}
          border="transparent"
          _hover={{ borderColor: "green.500" }}
          _focus={{
            borderColor: "green.500",
            boxShadow: "0 0 0 1px #00b37e",
          }}
          transition="all 0.2s"
          px="1rem"
          py="1.5rem"
          borderRadius="md"
          flex="1"
        />

        <Box
          as="button"
          type="button"
          px="1rem"
          fontWeight="bold"
          borderRadius="md"
          border="1px solid"
          borderColor="green.300"
          color="green.300"
          background="transparent"
          _hover={{
            bg: "green.500",
            color: "white",
            borderColor: "green.500",
          }}
          transition="all 0.2s"
          cursor="pointer"
          onClick={() => {}}
        >
          Buscar
        </Box>
      </Flex>

      {loading ? (
        <Center>
          <Spinner size="lg" />
        </Center>
      ) : filteredTransactions.length === 0 ? (
        <Text>Nenhuma transação encontrada.</Text>
      ) : (
        <TableContainer>
          <Table
            variant="unstyled"
            style={{
              borderCollapse: "separate",
              borderSpacing: "0 8px",
            }}
          >
            <Tbody>
              {filteredTransactions.map((tx) => (
                <Tr key={tx.id}>
                  <Td
                    bg="#323238"
                    borderTopLeftRadius="6px"
                    borderBottomLeftRadius="6px"
                    paddingY="1.25rem"
                    paddingX="2rem"
                    textAlign="left"
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
