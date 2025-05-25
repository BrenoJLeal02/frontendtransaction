export interface UserData {
  id: string;
  name: string;
  username: string;
  email: string;
  password?: string
}

export interface EditUserProps {
  isOpen: boolean;
  onClose: () => void;
  userData: UserData;
  onUpdate: (userId: string, data: UserData) => void
}

export interface ChangePasswordProps {
  isOpen: boolean;
  onClose: () => void;
  userData: UserData;
  onUpdate: (userId: string, data: UserData, newPassword: string) => void
}