import {
  Box,
  Flex,
  Button,
  Container,
  useDisclosure,
  Image
} from "@chakra-ui/react";
import { NewTransactionModal } from "../NewTransactionModal/NewTransactionModal";
import logoImg from "../../assets/logo.svg";
import { CustomAvatar } from "../CustomAvatar/CustomAvatar";

export function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="#121214" pb="7.5rem" pt="2.5rem">
      <Container maxW="1120px" px="1.5rem">
        <Flex justify="space-between" align="center">
          <Image src={logoImg} alt="Logo" height="40px" />

          <Flex align="center" gap={4}>
            <CustomAvatar />
            <Button
              height="50px"
              bg="green.500"
              color="white"
              fontWeight="bold"
              px="1.25rem"
              borderRadius="6px"
              _hover={{ bg: "green.700" }}
              onClick={onOpen}
            >
              Nova transação
            </Button>
          </Flex>
        </Flex>
      </Container>
      <NewTransactionModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
