import {
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useAuthUser } from "../../hooks/useAuthUser";
import { FiDollarSign, FiLogOut, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

// O componente CustomAvatar exibe um avatar do usuário logado e um menu de opções
// O menu contém uma opção para sair da conta
// O componente utiliza o Chakra UI para estilização e o react-icons para o ícone de logout
 // O componente utiliza o hook useAuthUser para obter as informações do usuário logado e a função de logout
// O hook useAuthUser é um hook personalizado que decodifica o token JWT armazenado no localStorage
 // O hook useAuthUser retorna as informações do usuário logado e a função de logout
 


export function CustomAvatar() {
  const { username, logout } = useAuthUser(); 

  return (
    <>
      {username && (
        <Menu>
          <MenuButton>
            <Flex align="center" gap={2} cursor="pointer">
              <Avatar name={username} size="md" bg="green.500" />
            </Flex>
          </MenuButton>
          <MenuList bg={"#000"}>
            <Link to="/perfil">
              <MenuItem bg={"#000"}  icon={<FiUser />}>
                Perfil
              </MenuItem>
            </Link>
            <Link to="/transacao">
              <MenuItem bg={"#000"} icon={<FiDollarSign />}>
                Transações
              </MenuItem>
            </Link>
            <MenuItem bg={"#000"}  icon={<FiLogOut />} onClick={logout}>
              Sair
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </>
  );
}
