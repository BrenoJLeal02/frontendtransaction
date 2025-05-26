import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { CustomInput } from "../CustomInput/CustomInput";
import { useEffect } from "react";
import { ChangePasswordProps } from "../../types/UserInterface";
import { useForm } from "react-hook-form";

type PasswordFormData = {
  newPassword: string;
  confirmPassword: string;
};

export function ChangePasswordModal({ isOpen, onClose, userData, onUpdate }: ChangePasswordProps) {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<PasswordFormData>();

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: PasswordFormData) => {
    if (data.newPassword !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "As senhas não correspondem",
      });
      return;
    }

    try {
      await onUpdate(userData.id, userData, data.newPassword);
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
        <ModalHeader pt="1.5rem">Alterar senha</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing="1.5rem">
            <CustomInput
              placeholder="Nova senha"
              type="password"
              border="none"
              {...register("newPassword", {
                required: "A nova senha é obrigatória",
              })}
            />
            {errors.newPassword && (
              <Text color="red.400" fontSize="sm" alignSelf="flex-start">
                {errors.newPassword.message}
              </Text>
            )}

            <CustomInput
              placeholder="Confirmar nova senha"
              type="password"
              border="none"
              {...register("confirmPassword", {
                required: "Confirme a nova senha",
              })}
            />
            {errors.confirmPassword && (
              <Text color="red.400" fontSize="sm" alignSelf="flex-start">
                {errors.confirmPassword.message}
              </Text>
            )}

            <Button type="submit" colorScheme="green" width="100%">
              Salvar
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
