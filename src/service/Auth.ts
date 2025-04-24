import { LoginFormData, RegisterFormData } from "../types/AuthInterface"
import { apiAuth } from "./api"

const baseURL ='/public'
 
const login = async (data: LoginFormData) => {
    const response = await apiAuth.post(`${baseURL}/auth/signin`, data)
    return response.data
}
const register = async (data: RegisterFormData) =>{
    const response = await apiAuth.post(`${baseURL}/user/signup`, data)
    return response
}

export {
    login,
    register
}