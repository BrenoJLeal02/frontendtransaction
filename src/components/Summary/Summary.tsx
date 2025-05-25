import { Box } from "@chakra-ui/react";
import { FiArrowUpCircle, FiArrowDownCircle, FiDollarSign } from "react-icons/fi";
import { Text, Flex, useColorModeValue } from "@chakra-ui/react";
import { priceFormatter } from "../../utils/priceFormatter";
import {findTransactionProps } from "../../types/TransactionInterface";

interface SummaryProps {
  transactions: findTransactionProps[];
}
// O componente Summary exibe um resumo das transações financeiras, incluindo entradas, saídas e total
// Ele recebe um array de transações como propriedade e calcula os valores das entradas, saídas e o total.
// O resumo é exibido em cartões com cores distintas para entradas e saídas.
// O componente utiliza o Chakra UI para estilização e ícones do react-icons para representar visualmente as entradas e saídas.
// O priceFormatter é utilizado para formatar os valores monetários de acordo com a localidade do usuário.

export function Summary({ transactions }: SummaryProps) {
  const bgColor = useColorModeValue("#323238", "gray.700");
  const headerColor = useColorModeValue("gray.300", "gray.200");
  const greenCardBg = useColorModeValue("green.700", "green.600");

  // Calculando o resumo de transações
  const income = transactions.filter(tx => tx.type === "income").reduce((sum, tx) => sum + tx.amount, 0);
  const expense = transactions.filter(tx => tx.type === "expense").reduce((sum, tx) => sum + tx.amount, 0);
  const total = income - expense;

  return (
    <Flex
      wrap="wrap"
      gap="2rem"
      maxW="1120px"
      mx="auto"
      px="1.5rem"
      mt="-5rem"
      justify="center"
    >
      <Box
        bg={bgColor}
        p="2rem"
        borderRadius="6px"
        flex="1"
        minW="250px"
        maxW="350px"
      >
        <Flex justify="space-between" align="center" color={headerColor}>
          <Text>Entradas</Text>
          <FiArrowUpCircle size={32} color="#00b37e" />
        </Flex>
        <Text mt="1rem" fontSize="2xl" fontWeight="bold">
          {priceFormatter.format(income)}
        </Text>
      </Box>

      <Box
        bg={bgColor}
        p="2rem"
        borderRadius="6px"
        flex="1"
        minW="250px"
        maxW="350px"
      >
        <Flex justify="space-between" align="center" color={headerColor}>
          <Text>Saídas</Text>
          <FiArrowDownCircle size={32} color="#f75a68" />
        </Flex>
        <Text mt="1rem" fontSize="2xl" fontWeight="bold">
          {priceFormatter.format(expense)}
        </Text>
      </Box>

      <Box
        bg={greenCardBg}
        p="2rem"
        borderRadius="6px"
        color="white"
        flex="1"
        minW="250px"
        maxW="350px"
      >
        <Flex justify="space-between" align="center">
          <Text>Total</Text>
          <FiDollarSign size={32} color="#fff" />
        </Flex>
        <Text mt="1rem" fontSize="2xl" fontWeight="bold">
          {priceFormatter.format(total)}
        </Text>
      </Box>
    </Flex>
  );
}
