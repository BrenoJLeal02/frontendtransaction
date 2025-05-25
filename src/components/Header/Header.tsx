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

interface HeaderProps {
  onTransactionCreated: () => void;
}

// O componente header compoem a logo, o avatar e o botão para acionar o modal de nova transação
// O modal é um componente separado que é chamado quando o botão é clicado
// O modal é controlado pelo estado isOpen, que é gerenciado pelo hook useDisclosure do Chakra UI
// O onTransactionCreated é uma função passada como prop para o Header, que é chamada quando uma nova transação é criada
// Isso permite que o Header saiba quando uma nova transação foi criada e possa atualizar a lista de transações, se necessário.

export function Header({ onTransactionCreated }: HeaderProps) {
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

      <NewTransactionModal
        isOpen={isOpen}
        onClose={onClose}
        onTransactionCreated={onTransactionCreated}
      />
    </Box>
  );
}
