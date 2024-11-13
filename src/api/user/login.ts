import axios from '../with-axios'

interface LoginReturn {
  token: string
}

export interface LoginQuery {
  username: string
  password: string
}

/** 登录 */
export function postLogin(data: LoginQuery) {
  return axios.post<LoginReturn>('/login', data)
}
