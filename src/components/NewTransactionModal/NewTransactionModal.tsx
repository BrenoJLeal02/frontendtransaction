import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Input,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";
import { Controller, useForm } from "react-hook-form";
import {
  NewTransactionFormInput,
  NewTransactionModalProps,
} from "../../types/TransactionInterface";
import { CustomInput } from "../CustomInput/CustomInput";

export function NewTransactionModal({
  isOpen,
  onClose,
  onCreateTransaction,
}: NewTransactionModalProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormInput>({
    defaultValues: {
      type: "income",
    },
  });

  async function handleCreate(data: NewTransactionFormInput) {
    await onCreateTransaction(data);
    reset();
    onClose();
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
              placeholder="Descrição"
              {...register("description", { required: true })}
              border="none"
            />
            <CustomInput
              placeholder="Preço"
              type="number"
              {...register("price", { required: true, valueAsNumber: true })}
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
                    onClick={() => field.onChange("outcome")}
                    leftIcon={<FaArrowCircleDown />}
                    bg={field.value === "outcome" ? "red.500" : "#29292E"}
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
