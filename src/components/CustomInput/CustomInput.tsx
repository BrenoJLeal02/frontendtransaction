import { Input, InputProps } from "@chakra-ui/react";
// O componente CustomLabel é uma função que recebe props do tipo InputProps, isso significa que o CustomLabel recebe apenas parametros que um input geralmente receberia.
// O ...props permite que outras propriedades sejam passadas para o componente CustomInput caso seja necessário. Teste no LoginPage colocar parametros como _hove={{bg: "#fff"}} na tag CustomInput e você verá que o input mudará de background ao passar o mouse por cima mesmo sem ter sido declarado aqui.
export function CustomInput(props: InputProps) {
  return (
    <Input
      border="none"
      bg="#121214"
      p='1.5rem'
      color="#fff"
      _placeholder={{ color: "#72778a" }}
      _focus={{
        borderColor: "#00875f",
        boxShadow: "0 0 0 1px #00875f",
      }}
      {...props}
    />
  );
}
