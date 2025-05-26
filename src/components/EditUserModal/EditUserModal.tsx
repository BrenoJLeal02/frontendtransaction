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
} from '@chakra-ui/react';
import { EditUserProps, UserData } from '../../types/UserInterface';
import { useEffect } from 'react';
import { CustomInput } from '../CustomInput/CustomInput';
import { useForm } from 'react-hook-form';

export function EditUserModal({
  isOpen,
  onClose,
  userData,
  onUpdate,
}: EditUserProps) {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserData>();

  useEffect(() => {
    reset(userData);
  }, [userData, reset]);

  const onSubmit = async (data: any) => {
    try {
      await onUpdate(userData.id, data);
      onClose();
      toast({
        title: 'Dados atualizados!',
        description: 'Os seus dados foram atualizados com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar os dados.',
        status: 'error',
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
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing="1rem">
            <CustomInput
              placeholder="Nome"
              border="none"
              {...register('name', {
                required: 'Nome é obrigatório',
              })}
            />
            {errors.name && (
              <Text color="red.400" fontSize="sm" alignSelf="flex-start">
                {errors.name.message}
              </Text>
            )}
            <CustomInput
              placeholder="Username"
              border="none"
              {...register('username', {
                required: 'Username é obrigatório',
              })}
            />
            {errors.username && (
              <Text color="red.400" fontSize="sm" alignSelf="flex-start">
                {errors.username.message}
              </Text>
            )}
            <CustomInput
              placeholder="E-mail"
              border="none"
              {...register('email', {
                required: 'Email é obrigatório',
              })}
            />
            {errors.email && (
              <Text color="red.400" fontSize="sm" alignSelf="flex-start">
                {errors.email.message}
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
