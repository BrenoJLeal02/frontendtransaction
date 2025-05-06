// import { Button, Flex, Input } from "@chakra-ui/react";
// import { MagnifyingGlass } from "phosphor-react";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useContextSelector } from "use-context-selector";
// import { TransactionsContext } from "../../contexts/TransactionsContext";

// const searchFormSchema = z.object({
//   query: z.string(),
// });

// type SearchFormInput = z.infer<typeof searchFormSchema>;

// export function SearchForm() {
//   const fetchTransactions = useContextSelector(
//     TransactionsContext,
//     (context) => context.fetchTransactions
//   );

//   const {
//     register,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = useForm<SearchFormInput>({
//     resolver: zodResolver(searchFormSchema),
//   });

//   async function handleSearchTransactions(data: SearchFormInput) {
//     await fetchTransactions(data.query);
//   }

//   return (
//     <Flex
//       as="form"
//       onSubmit={handleSubmit(handleSearchTransactions)}
//       gap="1rem"
//       mt="2rem"
//       maxW="100%"
//     >
//       <Input
//         type="text"
//         placeholder="Buscar por categoria"
//         {...register("query")}
//         bg="gray.900"
//         color="gray.300"
//         _placeholder={{ color: "gray.500" }}
//         borderRadius="md"
//         px="1rem"
//         py="1.25rem"
//         flex="1"
//         border="none"
//         focusBorderColor="green.300"
//       />
//       <Button
//         type="submit"
//         isLoading={isSubmitting}
//         borderRadius="md"
//         px="1.5rem"
//         py="1.25rem"
//         bg="transparent"
//         color="green.300"
//         border="1px solid"
//         borderColor="green.300"
//         fontWeight="bold"
//         _hover={{
//           bg: "green.500",
//           color: "white",
//           borderColor: "green.500",
//         }}
//       >
//         <MagnifyingGlass size={20} />
//         Buscar
//       </Button>
//     </Flex>
//   );
// }
