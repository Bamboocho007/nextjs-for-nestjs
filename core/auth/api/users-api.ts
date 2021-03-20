import axios from "axios"
import { environment } from "../../../env/environment"
import { User } from "../interfaces"

export const fetchUserApi = (id: number) => axios.get<User>(environment.apiUrl + 'users/' + id)
export const fetchAllUsersApi = () => axios.get<User[]>(environment.apiUrl + 'users/')