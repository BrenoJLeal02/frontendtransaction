import { Avatar, Flex } from "@chakra-ui/react";
import { useAuthUser } from "../../hooks/useAuthUser";

export function CustomAvatar() {
  const { username } = useAuthUser();
  return (
    <>
      {username && (
        <Flex align="center" gap={2}>
          <Avatar name={username} size="md" />
        </Flex>
      )}
    </>
  );
}
