import {Route, Routes} from 'react-router-dom'
import { Login, Profile, Register, Transaction } from '.'

//Aqui estamos definindo as rotas principais da aplicação usando o 'react-router-dom'. 
// O componente 'Routes' funciona como um container para todas as rotas da aplicação. Cada 'Route' representa uma URL específica e qual componente deve ser renderizado quando o usuário acessar essa URL. 
// Agora de inicio, quando o caminho for "/", será exibido o componente <Login />. Você pode adicionar outras rotas da mesma forma, como "/transaction", "/registro" e outros baseado na necessidade do projeto.
export function MainRoutes(){
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/registro" element={<Register/>}/>
            <Route path="/transacao" element={<Transaction/>}/>
            <Route path="/perfil" element={<Profile/>} />
        </Routes>
    )
}