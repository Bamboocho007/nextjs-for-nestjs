// production

type Env = {
  apiUrl: string;
}

const devEnvironment = {
  apiUrl: 'http://localhost:3001/'
}

const environment: Env = process.env.NODE_ENV === 'development' ? devEnvironment : {} as any

export { environment }