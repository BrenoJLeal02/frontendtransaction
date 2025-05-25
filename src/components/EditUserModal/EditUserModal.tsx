import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack, useToast } from "@chakra-ui/react";
import { EditUserProps } from "../../types/UserInterface";
import { useState, useEffect } from "react";
import { CustomInput } from "../CustomInput/CustomInput";

export function EditUserModal({ isOpen, onClose, userData, onUpdate }: EditUserProps) {
  const toast = useToast();
  const [form, setForm] = useState({ ...userData });

  useEffect(() => {
    setForm({ ...userData });
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onUpdate(form.id, form);
      onClose();
      toast({
        title: "Dados atualizados!",
        description: "Os seus dados foram atualizados com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar os dados.",
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
        <ModalHeader pt="2rem">Editar perfil</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit}>
          <VStack spacing="1.5rem">
            <CustomInput
              name="name"
              value={form.name}
              placeholder="Nome"
              border="none"
              onChange={handleChange}
            />
            <CustomInput
              name="username"
              value={form.username}
              placeholder="Username"
              border="none"
              onChange={handleChange}
            />
            <CustomInput
              name="email"
              value={form.email}
              placeholder="E-mail"
              border="none"
              onChange={handleChange}
            />
            <Button type="submit" colorScheme="green" width="100%">
              Salvar
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}