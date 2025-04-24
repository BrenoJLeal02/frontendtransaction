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
import { NewTransactionFormInput, NewTransactionModalProps } from "../../types/TransactionInterface";
    
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
        <ModalContent bg="gray.800" color="white" p={6}>
          <ModalHeader>Nova Transação</ModalHeader>
          <ModalCloseButton />
  
          <ModalBody as="form" onSubmit={handleSubmit(handleCreate)}>
            <VStack spacing={4}>
              <Input
                placeholder="Descrição"
                {...register("description", { required: true })}
                bg="gray.700"
                _placeholder={{ color: "gray.400" }}
                border="none"
              />
              <Input
                placeholder="Preço"
                type="number"
                {...register("price", { required: true, valueAsNumber: true })}
                bg="gray.700"
                _placeholder={{ color: "gray.400" }}
                border="none"
              />
              <Input
                placeholder="Categoria"
                {...register("category", { required: true })}
                bg="gray.700"
                _placeholder={{ color: "gray.400" }}
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
                      bg={field.value === "income" ? "green.500" : "gray.700"}
                      _hover={{ bg: "green.600" }}
                      flex="1"
                    >
                      Entrada
                    </Button>
                    <Button
                      onClick={() => field.onChange("outcome")}
                      leftIcon={<FaArrowCircleDown />}
                      bg={field.value === "outcome" ? "red.500" : "gray.700"}
                      _hover={{ bg: "red.600" }}
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
                Concluir
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }
  