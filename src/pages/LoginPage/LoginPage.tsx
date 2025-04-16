import { Box, Container, Select, VStack, Heading, Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CustomLabel from "../../components/CustomLabel/CustomLabel";
import { CustomInput } from "../../components/CustomInput/CustomInput";
//Vá nos componentes CustomLabel e CustomInput, lá tem uma explicação do que foi feito.
export function LoginPage() {
  return (
    <Flex minH="100vh" align="center" justify="center">
      <Container maxW="md" py={10}>
        <Box p={8} borderRadius="lg" boxShadow="md" bg="#323238">
          <Heading size="lg" mb={6} textAlign="center" color="#fff">
            Login
          </Heading>

          <VStack spacing={4} align="stretch">
            <Box>
              <CustomLabel>Email</CustomLabel>
              <CustomInput type="email" placeholder="Digite seu email" />
            </Box>

            <Box>
              <CustomLabel>Username</CustomLabel>
              <CustomInput type="text" placeholder="Digite seu username" />
            </Box>

            <Box>
              <CustomLabel>Password</CustomLabel>
              <CustomInput type="password" placeholder="Digite sua senha" />
            </Box>

            <Box>
              <CustomLabel>Role</CustomLabel>
              <Select
                color="#72778a"
                border="none"
                bg="#121214"
                _focus={{ borderColor: "#00875f", boxShadow: "0 0 0 1px #00875f" }}
                defaultValue={"user"}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Select>
            </Box>

            <Button bg="#00875F" color="#fff" mt={4} _hover={{ bg: "#015f43" }}>
              Entrar
            </Button>

            {/* A tag de <Link> do react-router-dom substitui a tag <a> que normalmente é utilizada para redirecionamento de página. */}
            <Link to="/registro">
              <Text color="teal.400" mt={4} textAlign="center" fontSize="sm" _hover={{ textDecoration: "underline" }}>
                Não tem uma conta? Crie uma agora.
              </Text>
            </Link>
          </VStack>
        </Box>
      </Container>
    </Flex>
  );
}
