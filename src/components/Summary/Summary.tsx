import { useEffect, useState } from "react";
import { FiArrowUpCircle, FiArrowDownCircle, FiDollarSign } from "react-icons/fi";
import { Box, Text, Flex, useColorModeValue } from "@chakra-ui/react";
import { priceFormatter } from "../../utils/priceFormatter";
import { balanceTransaction } from "../../service/Transaction";
import { BalanceTransactionProps } from "../../types/TransactionInterface";
import { useAuthUser } from "../../hooks/useAuthUser";

export function Summary() {
  const [summary, setSummary] = useState<BalanceTransactionProps>({
    income: 0,
    expense: 0,
    total: 0,
  });
  const { userId } = useAuthUser();


  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (!userId) return; 
  
        const data = await balanceTransaction({ userId });
  
        setSummary({
          income: data.income,
          expense: data.expense,
          total: data.income - data.expense,
        });
      } catch (error) {
        console.error("Erro ao buscar resumo de transações:", error);
      }
    };
  
    fetchBalance();
  }, [userId]);
  

  const bgColor = useColorModeValue("#323238", "gray.700");
  const headerColor = useColorModeValue("gray.300", "gray.200");
  const greenCardBg = useColorModeValue("green.700", "green.600");

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
          {priceFormatter.format(summary.income)}
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
          {priceFormatter.format(summary.expense)}
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
          {priceFormatter.format(summary.total)}
        </Text>
      </Box>
    </Flex>
  );
}
