import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack, useToast } from "@chakra-ui/react";
import { CustomInput } from "../CustomInput/CustomInput";
import { useEffect, useState } from "react";
import { ChangePasswordProps } from "../../types/UserInterface";

export function ChangePasswordModal({ isOpen, onClose, userData, onUpdate }: ChangePasswordProps) {
  const toast = useToast();
  const [form, setForm] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  
  useEffect(() => {
    if (isOpen) {
      setForm({
        newPassword: '',
        confirmPassword: '',
      });
    }
  }, [isOpen]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas inseridas não correspondem.",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      return;
    }
    if (form.newPassword.trim() === "" || form.confirmPassword.trim() === "") {
      toast({
        title: "Erro",
        description: "A senha não pode ficar em branco.",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      return;
    }
    try {
      await onUpdate(userData.id, userData, form.newPassword);
      onClose();
      toast({
        title: "Senha atualizada!",
        description: "A sua senha foi alterada com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Erro ao atualizar senha do usuário", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a senha.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="#202024" color="white" p="1.5rem">
        <ModalHeader pt="1.5rem">Editar perfil</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit}>
          <VStack spacing="1.5rem">
            <CustomInput
              name="newPassword"
              placeholder="Nova senha"
              border="none"
              onChange={handleChange}
              type="password"
            />
            <CustomInput
              name="confirmPassword"
              placeholder="Confirmar nova senha"
              border="none"
              onChange={handleChange}
              type="password"
            />
            <Button type="submit" colorScheme="green" width="100%">
              Salvar
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};