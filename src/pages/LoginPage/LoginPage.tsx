import {
  Box,
  Container,
  Select,
  VStack,
  Heading,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CustomLabel from "../../components/CustomLabel/CustomLabel";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginFormData } from "../../types/InterfaceAuth";
//Vá nos componentes CustomLabel e CustomInput, lá tem uma explicação do que foi feito.
export function LoginPage() {
  
  const {
    register,
    handleSubmit,
    formState: { errors },  
  } = useForm<LoginFormData>({
    defaultValues: {
      role: "user",
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    console.log("Login data:", data);
  };

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Container maxW="md" py={10}>
        <Box p={8} borderRadius="lg" boxShadow="md" bg="#323238">
          <Heading size="lg" mb={6} textAlign="center" color="#fff">
            Login
          </Heading>

          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4} align="stretch">
              <Box>
                <CustomLabel>Email</CustomLabel>
                <CustomInput
                  type="email"
                  placeholder="Digite seu email"
                  {...register("email", {
                    required: "Email é obrigatório",
                  })}
                />
                {errors.email && (
                  <Text color="red.400" fontSize="sm" mt={1}>
                    {errors.email.message}
                  </Text>
                )}
              </Box>

              <Box>
                <CustomLabel>Username</CustomLabel>
                <CustomInput
                  type="text"
                  placeholder="Digite seu username"
                  {...register("username", {
                    required: "Username é obrigatório",
                  })}
                />
                {errors.username && (
                  <Text color="red.400" fontSize="sm" mt={1}>
                    {errors.username.message}
                  </Text>
                )}
              </Box>

              <Box>
                <CustomLabel>Password</CustomLabel>
                <CustomInput
                  type="password"
                  placeholder="Digite sua senha"
                  {...register("password", {
                    required: "Senha é obrigatória",
                  })}
                />
                {errors.password && (
                  <Text color="red.400" fontSize="sm" mt={1}>
                    {errors.password.message}
                  </Text>
                )}
              </Box>

              <Box>
                <CustomLabel>Role</CustomLabel>
                <Select
                  color="#72778a"
                  border="none"
                  bg="#121214"
                  _focus={{
                    borderColor: "#00875f",
                    boxShadow: "0 0 0 1px #00875f",
                  }}
                  {...register("role", {
                    required: "Selecione uma role",
                  })}
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </Select>
                {errors.role && (
                  <Text color="red.400" fontSize="sm" mt={1}>
                    {errors.role.message}
                  </Text>
                )}
              </Box>

              <Button
                type="submit"
                bg="#00875F"
                color="#fff"
                mt={4}
                _hover={{ bg: "#015f43" }}
              >
                Entrar
              </Button>

              <Link to="/registro">
                <Text
                  color="teal.400"
                  mt={4}
                  textAlign="center"
                  fontSize="sm"
                  _hover={{ textDecoration: "underline" }}
                >
                  Não tem uma conta? Crie uma agora.
                </Text>
              </Link>
            </VStack>
          </form>
        </Box>
      </Container>
    </Flex>
  );
}
