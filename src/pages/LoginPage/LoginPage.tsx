import {
  Box,
  Container,
  Select,
  Text,
  VStack,
  Heading,
  Button,
  Flex,
  TextProps,
} from "@chakra-ui/react";
import { CustomInput } from "../../components/CustomInput/CustomInput";

const Label = (props: TextProps) => <Text color="#72778a" mb={1} {...props} />;

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
              <Label>Email</Label>
              <CustomInput type="email" placeholder="Digite seu email" />
            </Box>

            <Box>
              <Label>Username</Label>
              <CustomInput type="text" placeholder="Digite seu username" />
            </Box>

            <Box>
              <Label>Password</Label>
              <CustomInput type="password" placeholder="Digite sua senha" />
            </Box>

            <Box>
              <Label>Role</Label>
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
          </VStack>
        </Box>
      </Container>
    </Flex>
  );
}
