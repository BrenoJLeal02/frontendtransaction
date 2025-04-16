import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider} from "@chakra-ui/react";
import App from './App.tsx'
import theme from "./theme/theme";


// O ChakraProvider é um componente que permite que todos os elementos da nossa aplicação utilizem os estilos e funcionalidades do Chakra UI. Para que os recursos do Chakra UI funcionem corretamente em toda a aplicação.
// O parametro theme dentro do ChakraProvider é usado para passar um tema personalizado para a aplicação. Isso significa que os estilos (cores, fontes, etc.) definidos no nosso arquivo de tema vão ser aplicados a todos os componentes Chakra UI usados na aplicação.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>,
)
