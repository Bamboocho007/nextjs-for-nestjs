export class LocalStorage {
  public static getItem = <T>(key: string): T => {
    if(typeof window !== "undefined") {
      return JSON?.parse(localStorage?.getItem(key)) 
    }
    else {
      return null
    }
  }
  public static setItem = (key: string, value: any) => {
    if(typeof window !== "undefined") {
      return localStorage?.setItem(key, JSON?.stringify(value)) 
    }
  }
  public static removeItem = (key: string) => {
    if(typeof window !== "undefined") {
      return localStorage?.removeItem(key)
    }
  }
}