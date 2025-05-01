import { LoginFormData, RegisterFormData } from "../types/AuthInterface"
import { apiAuth } from "./api"

const baseURL ='/public'
 
const login = async (data: LoginFormData) => {
    const response = await apiAuth.post(`${baseURL}/auth/signin`, data)
    console.log(response.data)
    return response.data
}
const register = async (data: RegisterFormData) =>{
    const response = await apiAuth.post(`${baseURL}/user/signup`, data)
    return response
}
// const getUser = async(userId: string) => {
//     const response = await apiAuth.get(`${baseURL}/user/${userId}`)
//     console.log(response.data)
//     return response.data
    
// }


export {
    login,
    register,
    // getUser
}