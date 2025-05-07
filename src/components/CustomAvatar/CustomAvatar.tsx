import {
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Box,
} from "@chakra-ui/react";
import { useAuthUser } from "../../hooks/useAuthUser";
import { FiLogOut } from "react-icons/fi";

export function CustomAvatar() {
  const { username, logout } = useAuthUser(); 

  return (
    <>
      {username && (
        <Menu>
          <MenuButton>
            <Flex align="center" gap={2} cursor="pointer">
              <Avatar name={username} size="md" bg="green.500" />
              <Box display={{ base: "none", md: "block" }}>
                <Text fontWeight="bold" fontSize="sm">{username}</Text>
              </Box>
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuItem icon={<FiLogOut />} onClick={logout}>
              Sair
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </>
  );
}
