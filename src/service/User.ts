import { UserData } from "../types/UserInterface"
import { apiAuth } from "./api"

const baseURL = '/private'

const fetchUser = async (userId: string): Promise<UserData> => {
  const response = await apiAuth.get(`${baseURL}/user/${userId}`)
  return response.data
}

const editUser = async (userId: string) => {
  const response = await apiAuth.put(`${baseURL}/user/update/${userId}`)
  return response.data;
}

const deleteUser = async (userId: string) => {
  const response = await apiAuth.delete(`${baseURL}/user/delete/${userId}`)
  return response.data;
}

export {
  fetchUser,
  editUser,
  deleteUser
}