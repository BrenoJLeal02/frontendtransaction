import { Box, Center, Flex, Spinner, Text, useColorModeValue } from "@chakra-ui/react";
import { UserData } from "../../types/UserInterface";

interface ProfileProps {
  data: UserData;
  loading: boolean
}

export function ProfileData({ data, loading }: ProfileProps) {
  const bgColor = useColorModeValue("#323238", "gray.700");
  const headerColor = useColorModeValue("gray.300", "gray.100");

  return (
    <Flex maxW="1120px"
      mx="auto"
      px="1rem"
      mt="2rem"
      justify="center">
      {loading ? (
        <Center>
          <Spinner size="lg" />
        </Center>
      ) : (
        <Box bg={bgColor}
          p="2rem"
          borderRadius="6px"
          flex="1"
          minW="250px"
          maxW="350px"
          mt="-5rem">
          <Flex color={headerColor} mb="1rem">
            <Text fontSize="2xl">Dados do usuário</Text>
          </Flex>
          <Flex justify="space-between" align="center" p="0.5rem">
            <Text mt={"1rem"} color={headerColor}>nome</Text>
            <Text mt="1rem" fontWeight="bold">{data.name}</Text>
          </Flex>
          <Flex justify="space-between" align="center" p="0.5rem">
            <Text mt={"1rem"} color={headerColor}>username</Text>
            <Text mt="1rem" fontWeight="bold">{data.username}</Text>
          </Flex>
          <Flex justify="space-between" align="center" p="0.5rem">
            <Text mt={"1rem"} color={headerColor}>e-mail</Text>
            <Text mt="1rem" fontWeight="bold">{data.email}</Text>
          </Flex>
        </Box>
      )}
    </Flex>
  );
}