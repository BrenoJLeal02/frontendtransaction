import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack
} from "@chakra-ui/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import { useAuthUser } from "../../hooks/useAuthUser";
import { onCreateTransaction } from "../../service/Transaction";
import {
  NewTransactionFormInput,
  NewTransactionModalProps,
} from "../../types/TransactionInterface";
import { CustomInput } from "../CustomInput/CustomInput";
import { priceFormatter } from "../../utils/priceFormatter";

interface ExtendedNewTransactionModalProps extends NewTransactionModalProps {
  onTransactionCreated: () => void;
}
/// O componente NewTransactionModal é um modal que permite ao usuário criar uma nova transação
// Ele utiliza o Chakra UI para estilização e o react-hook-form para gerenciamento de formulários
// O modal é controlado pelo estado isOpen, que é passado como prop para o componente
// O onClose é uma função que fecha o modal quando chamada
// O onTransactionCreated é uma função que é chamada quando uma nova transação é criada com sucesso
// O modal contém um formulário com campos para quantidade, categoria e tipo de transação (entrada ou saída)

export function NewTransactionModal({
  isOpen,
  onClose,
  onTransactionCreated,
}: ExtendedNewTransactionModalProps) {
  const toast = useToast();
  const { userId } = useAuthUser();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [transactionToCreate, setTransactionToCreate] = useState<NewTransactionFormInput | null>(null);

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

      setTransactionToCreate(dataWithUserId);
      setShowConfirmation(true);
    } catch (err: any) {
      console.error("Erro ao preparar transação", err);
      toast({
        title: "Erro ao preparar transação",
        description: err.message || "Tente novamente mais tarde.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }

  async function handleConfirmCreate() {
    if (!transactionToCreate) return;

    try {
      await onCreateTransaction(transactionToCreate);

      toast({
        title: "Transação criada!",
        description: "Sua transação foi adicionada com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      reset();
      setTransactionToCreate(null);
      setShowConfirmation(false);
      onClose();
      onTransactionCreated();
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

  function handleCancelConfirmation() {
    setShowConfirmation(false);
    setTransactionToCreate(null);
  }

  return (
    <>
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

      <Modal isOpen={showConfirmation} onClose={handleCancelConfirmation} isCentered>
        <ModalOverlay />
        <ModalContent bg="#202024" color="white" p={6}>
          <ModalHeader>Confirmar Transação</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Text>Você está prestes a criar uma transação com os seguintes dados:</Text>

              {transactionToCreate && (
                <VStack spacing={2} align="start" width="100%">
                  <Text><strong>Tipo:</strong> {transactionToCreate.type === 'income' ? 'Entrada' : 'Saída'}</Text>
                  <Text><strong>Quantidade:</strong> {priceFormatter.format(transactionToCreate.amount)}</Text>
                  <Text><strong>Categoria:</strong> {transactionToCreate.category}</Text>
                </VStack>
              )}

              <HStack spacing={4} width="100%">
                <Button
                  onClick={handleCancelConfirmation}
                  colorScheme="gray"
                  flex="1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleConfirmCreate}
                  colorScheme="green"
                  flex="1"
                  isLoading={isSubmitting}
                >
                  Confirmar
                </Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
