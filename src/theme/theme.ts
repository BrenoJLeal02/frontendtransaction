import { extendTheme } from "@chakra-ui/react";


// O theme funciona como um tema global para o Chakra UI. No exemplo abaixo, o background (bg) do body é definido como um cinza escuro, o que será aplicado em toda a aplicação a menos que algum componente sobrescreva esse valor. Por exemplo, se você adicionar `bg="#fff"` na tag pai (como no <Flex> do LoginPage), verá que o fundo passa a ser branco, substituindo o cinza padrão definido aqui.
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#202024",
        color:"#fff"
      },
    },
  },
});

export default theme;
