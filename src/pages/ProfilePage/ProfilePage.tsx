import { Box } from "@chakra-ui/react";
import { Header } from "../../components/Header/Header";
import { ProfileData } from "../../components/ProfileData/ProfileData";
import { useEffect, useState } from "react";
import { useAuthUser } from "../../hooks/useAuthUser";
import { UserData } from "../../types/UserInterface";
import { fetchUser } from "../../service/User";

export function ProfilePage() {
  const [user, setUser] = useState<UserData>();
  const [loading, setLoading] = useState(true);
  const { userId } = useAuthUser();

  const loadProfile = async (userId: string) => {
    setLoading(true);
    try {
      const response = await fetchUser(userId);
      setUser(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile(userId!);
  }, [userId]);

  return (
    <Box>
      <Header onTransactionCreated={() => {}}/>
      <ProfileData data={user} loading={loading} />
    </Box>
  )
}
