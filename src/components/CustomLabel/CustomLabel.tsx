import { Text, TextProps } from "@chakra-ui/react";
// O componente CustomLabel é uma função que recebe props do tipo TextProps, isso significa que o CustomLabel recebe apenas parametros textuais.
// "children" é o conteúdo que será exibido dentro do componente (texto do label)
// O ...props permite que outras propriedades sejam passadas para o componente Text caso seja necessário. Teste no LoginPage colocar parametros como fontWeight="bold" na tag CustomLabel e você vera que mesmo aqui estando setado a cor, a margin-botton e o font-size, você também poderá incluir novos parametros sem problema.
const CustomLabel = ({ children, ...props }: TextProps) => (
  <Text color="#72778a" mb={1} fontSize="sm" {...props}>
    {children}
  </Text>
);

export default CustomLabel;
