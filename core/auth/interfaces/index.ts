export * from './user.model'

export type RegistrationFormType = {
  email: string,
  name: string,
  password: string,
  passwordConfirm: string,
};

export type LoginFormType = {
  email: string,
  password: string
}

export type TokenResponseType = {
  authToken: string,
}

export type JWTUserData = {
  id: number
}