import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  VStack,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";
import { Controller, useForm } from "react-hook-form";
import { NewTransactionFormInput, NewTransactionModalProps } from "../../types/TransactionInterface";
import { CustomInput } from "../CustomInput/CustomInput";
import { onCreateTransaction } from "../../service/Transaction";
import { useAuthUser } from "../../hooks/useAuthUser";

export function NewTransactionModal({ isOpen, onClose }: NewTransactionModalProps) {
  const toast = useToast();
  const { userId } = useAuthUser();

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<Omit<NewTransactionFormInput, "userId">>({
    defaultValues: {
      type: "income",
    },
  });

  async function handleCreate(data: Omit<NewTransactionFormInput, "userId">) {
    try {
      if (!userId) throw new Error("Usuário não autenticado.");

      const dataWithUserId: NewTransactionFormInput = {
        ...data,
        userId,
      };

      await onCreateTransaction(dataWithUserId);
      toast({
        title: "Transação criada!",
        description: "Sua transação foi adicionada com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      reset();
      onClose();
    } catch (err: any) {
      console.error("Erro ao criar transação", err);
      toast({
        title: "Erro ao criar transação",
        description: err.message || "Tente novamente mais tarde.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="#202024" color="white" p={6}>
        <ModalHeader>Nova Transação</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(handleCreate)}>
          <VStack spacing={4}>
            <CustomInput
              placeholder="Quantidade"
              type="number"
              {...register("amount", { required: true, valueAsNumber: true })}
              border="none"
            />
            <CustomInput
              placeholder="Categoria"
              {...register("category", { required: true })}
              border="none"
            />

            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <HStack width="100%">
                  <Button
                    onClick={() => field.onChange("income")}
                    leftIcon={<FaArrowCircleUp />}
                    bg={field.value === "income" ? "green.500" : "#29292E"}
                    _hover={{ bg: "green.600" }}
                    color={"#fff"}
                    flex="1"
                  >
                    Entrada
                  </Button>
                  <Button
                    onClick={() => field.onChange("expense")}
                    leftIcon={<FaArrowCircleDown />}
                    bg={field.value === "expense" ? "red.500" : "#29292E"}
                    _hover={{ bg: "red.600" }}
                    color={"#fff"}
                    flex="1"
                  >
                    Saída
                  </Button>
                </HStack>
              )}
            />

            <Button
              type="submit"
              colorScheme="green"
              width="100%"
              isLoading={isSubmitting}
            >
              Finalizar
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
