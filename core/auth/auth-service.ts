
import { JwtService } from "../services/jwt-service";
import { fetchUserApi, userLogin, userRegistration } from "./api";
import { LoginFormType, RegistrationFormType } from "./interfaces";
import { userStore } from "./user-store";

class AuthService {

  public login(data: LoginFormType) {
    userLogin(data).then(res => {
      JwtService.set(res.data.authToken)
      fetchUserApi(JwtService.getValue().id).then(res => userStore.setCurrentUser(res.data))
    })
  }

  public logOut() {
    JwtService.delete()
    userStore.setCurrentUser(null)
  }

  public async registration(data: RegistrationFormType) {
    try {
      const regRes = await userRegistration(data)
      JwtService.set(regRes.data.authToken)
      const userRes = await fetchUserApi(JwtService.getValue().id)
      userStore.setCurrentUser(userRes.data)
    }
    catch {}
  }

}

const authService = new AuthService()

export { authService }