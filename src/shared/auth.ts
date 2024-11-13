import { TOKEN_KEY } from './constant'

export const isLogin = () => {
  return !!localStorage.getItem(TOKEN_KEY)
}

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

export const setToken = (token: string) => {
  return localStorage.setItem(TOKEN_KEY, token)
}

export const clearToken = () => {
  return localStorage.removeItem(TOKEN_KEY)
}
