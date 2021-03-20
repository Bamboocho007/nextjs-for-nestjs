import axios from "axios"
import { environment } from "../../../env/environment"
import { LoginFormType, RegistrationFormType, TokenResponseType } from "../interfaces"

export const userRegistration = (data: RegistrationFormType) =>
  axios.post<TokenResponseType>(environment.apiUrl + 'auth/registration', data)

export const userLogin = (data: LoginFormType) => 
  axios.post<TokenResponseType>(environment.apiUrl + 'auth/login', data)