import { Box } from "@chakra-ui/react";
import { Header } from "../../components/Header/Header";
import { ProfileData } from "../../components/ProfileData/ProfileData";
import { useEffect, useState } from "react";
import { useAuthUser } from "../../hooks/useAuthUser";
import { UserData } from "../../types/UserInterface";
import { fetchUser, editUser } from "../../service/User";
import { EditUserModal } from "../../components/EditUserModal/EditUserModal";
import { ChangePasswordModal } from "../../components/ChangePasswordModal/ChangePasswordModal";

export function ProfilePage() {
  const [user, setUser] = useState<UserData>();
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
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
    if (userId) loadProfile(userId);
  }, [userId]);

  const updateUser = async (userId: string, data: UserData) => {
    setLoading(true)
    try {
      const response = await editUser(userId, data);
      setUser(response)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  };

  const changeUserPassword = async (userId: string, data: UserData, newPassword: string) => {
    setLoading(true)
    try {
      const updateUser = {...data, password: newPassword}
      const response = await editUser(userId, updateUser);
      setUser(response)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box>
      <Header onTransactionCreated={() => {}} />
      <ProfileData
        data={user!}
        loading={loading}
        onEditClick={() => setIsEditModalOpen(true)}
        onChangePasswordClick={() => setIsChangePasswordModalOpen(true)}
      />

      {user && (
        <>
          <EditUserModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            userData={user}
            onUpdate={updateUser}
          />
          <ChangePasswordModal
            isOpen={isChangePasswordModalOpen}
            onClose={() => setIsChangePasswordModalOpen(false)}
            userData={user}
            onUpdate={changeUserPassword}
          />
        </>
      )}
    </Box>
  );
}
