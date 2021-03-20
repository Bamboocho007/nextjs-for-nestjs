import { LocalStorage } from ".";
import jwt_decode from "jwt-decode"
import { JWTUserData } from "../auth/interfaces";

export class JwtService {
  public static set(token: string) {
    LocalStorage.setItem("JWT_TOKEN", "Bearer " + token)
  }

  public static get() {
    return LocalStorage.getItem<string>("JWT_TOKEN")
  }

  public static delete() {
    return LocalStorage.removeItem("JWT_TOKEN")
  }

  public static getValue() {
    if(LocalStorage?.getItem("JWT_TOKEN")) {
      return jwt_decode<JWTUserData>(LocalStorage.getItem<string>("JWT_TOKEN")?.replace("Bearer ", ""))
    }
    else {
      return null
    }
  }
}