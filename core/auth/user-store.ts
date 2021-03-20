import { action, makeObservable, observable } from "mobx"
import { User } from "./interfaces"


class UserStore {
  public currentUser: User = null
  public users: User[] = []
  public userById: User = null
  
  constructor(users?: User[], userById?: User) {
    makeObservable(this, {
      users: observable,
      userById: observable,
      currentUser: observable,
      setUserById: action,
      setAllUsers: action,
      setCurrentUser: action
    })
    this.users = users || []
    this.userById = userById || null
  }

  public setUserById(user: User) {
    this.userById = user || null
  }

  public setAllUsers(users: User[]) {
    this.users = users || []
  }

  public setCurrentUser(user: User) {
    this.currentUser = user || null
  }
}

const userStore = new UserStore()

export { userStore }