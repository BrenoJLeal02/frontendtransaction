import {
  Box,
  Container,
  Input,
  Select,
  Text,
  VStack,
  Heading,
  Button,
  Flex,
} from "@chakra-ui/react";

export function LoginPage() {
  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Container maxW="md" py={10}>
        <Box
          p={8}
          borderWidth={1}
          borderRadius="lg"
          boxShadow="md"
          bg="white"
        >
          <Heading size="lg" mb={6} textAlign="center" color="teal.600">
            Login
          </Heading>

          <VStack spacing={4} align="stretch">
            <Box>
              <Text mb={1}>Email</Text>
              <Input type="email" placeholder="Digite seu email" />
            </Box>

            <Box>
              <Text mb={1}>Username</Text>
              <Input type="text" placeholder="Digite seu username" />
            </Box>

            <Box>
              <Text mb={1}>Password</Text>
              <Input type="password" placeholder="Digite sua senha" />
            </Box>

            <Box>
              <Text mb={1}>Role</Text>
              <Select defaultValue={"user"}>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Select>
            </Box>

            <Button colorScheme="teal" mt={4}>
              Entrar
            </Button>
          </VStack>
        </Box>
      </Container>
    </Flex>
  );
}
