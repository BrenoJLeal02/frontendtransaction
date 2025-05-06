import { Avatar, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../../hooks/useAuthUser";

export function CustomAvatar() {
  const { username } = useAuthUser();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("jwtToken"); // ou o nome do seu token
    navigate("/"); // redireciona para tela de login
  }

  return (
    <>
      {username && (
        <Flex align="center" gap={4}>
          <Avatar name={username} size="md" bg="green.500" />
          <Button size="sm" colorScheme="red" onClick={handleLogout}>
            Sair
          </Button>
        </Flex>
      )}
    </>
  );
}
