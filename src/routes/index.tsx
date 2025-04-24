import { LoginPage } from "../pages/LoginPage/LoginPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
import { TransactionPage } from "../pages/TransactionPage/TransactionPage";
// Esse componente serve como um intermediário para renderizar a página de login.
// Imagine que sua aplicação possui uma navbar ou um footer, mas você só quer que eles apareçam em algumas páginas. 
// Nesse caso, você pode importá-los aqui e posicioná-los acima e abaixo, por exemplo, da `TransactionPage`. 
// Já a `LoginPage` pode ser mantida sem navbar e footer desse jeito o layout ao carregar a página só irá redenrizar o conteúdo da mesma(como é o caso no momento).Vou deixar um exemplo visual abaixo.

export function Login(){
    return (
        <>
            <LoginPage/>
        </>
        
    )
}
export function Register(){
    return(
        <>
            <RegisterPage/>
        </>
    )
}

export function Transaction(){
    return(
        <>
            <TransactionPage/>
        </>
    )
}