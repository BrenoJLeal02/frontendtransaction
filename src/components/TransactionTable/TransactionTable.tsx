import {
  Box,
  Center,
  Flex,
  IconButton,
  Input,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FiTrash } from "react-icons/fi";
import { deleteTransaction } from "../../service/Transaction";
import { findTransactionProps } from "../../types/TransactionInterface";
import { priceFormatter } from "../../utils/priceFormatter";
import { ConfirmationModal } from "../ConfirmationModal/ConfirmationModal";
import { useState } from "react";

interface TransactionTableProps {
  transactions: findTransactionProps[];
  loading: boolean;
  onTransactionDeleted: () => void;
}

// O componente TransactionTable exibe uma tabela de transações financeiras, permitindo filtrar por categoria
// e exibindo informações como data, descrição, valor e categoria.
// Ele também inclui um indicador de carregamento enquanto as transações são buscadas.
// O filtro é realizado em tempo real conforme o usuário digita na caixa de pesquisa.



export function TransactionTable({ transactions, loading, onTransactionDeleted }: TransactionTableProps) {
  const toast = useToast();
  const [search, setSearch] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTransaction, setSelectedTransaction] = useState<findTransactionProps[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  function handleDeleteTransaction(tx: findTransactionProps) {
    {
      setSelectedTransaction([tx]);
      onOpen();
    }
  }

  async function handleConfirmDelete() {
    if (!selectedTransaction) return;
    setIsDeleting(true);

    try {
      await deleteTransaction(selectedTransaction[0].id);

      if (onTransactionDeleted) {
        onTransactionDeleted();
      }

      toast({
        title: "Transação deletada!",
        description: "Sua transação foi deletada com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      console.error("Erro ao deletar transação:", error);
      
      toast({
        title: "Erro ao deletar transação",
        description: error.message || "Tente novamente mais tarde.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsDeleting(false);
      onClose();
    }
  }

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
      </Flex>

      {loading ? (
        <Center>
          <Spinner size="lg" />
        </Center>
      ) : filteredTransactions.length === 0 ? (
        <Text color="gray.300">Nenhuma transação encontrada.</Text>
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
                    <IconButton
                      aria-label="Delete transaction"
                      icon={<FiTrash />}
                      variant="ghost"
                      marginStart="1.25rem"
                      colorScheme="red"
                      onClick={() => handleDeleteTransaction(tx)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Deletar transação"
        description="Você tem certeza que deseja deletar esta transação?"
      />
    </Box>
  );
}
