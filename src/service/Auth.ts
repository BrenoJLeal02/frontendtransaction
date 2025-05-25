import { LoginFormData, RegisterFormData } from "../types/AuthInterface"
import { apiAuth } from "./api"

// Define a URL base para a API pública (sem autenticação)
const baseURL = '/public'

// Função para realizar o login do usuário, enviando as credenciais de login para a API
const login = async (data: LoginFormData) => {
    // Faz uma requisição POST para a API de login, enviando os dados do formulário de login
    const response = await apiAuth.post(`${baseURL}/auth/signin`, data)
    return response.data
}

// Função para realizar o cadastro do usuário, enviando os dados do formulário de registro para a API
const register = async (data: RegisterFormData) => {
    // Faz uma requisição POST para a API de cadastro de usuário
    const response = await apiAuth.post(`${baseURL}/user/signup`, data)
    return response
}

// Função para obter os dados de um usuário específico, dado o seu ID
const getUser = async (userId: string) => {
    // Faz uma requisição GET para obter as informações do usuário pelo ID
    const response = await apiAuth.get(`${baseURL}/user/${userId}`)
    
    return response.data
}

export {
    login,
    register,
    getUser
}