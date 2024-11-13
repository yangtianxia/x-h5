import axios from '../with-axios'

/** 退出登录 */
export function postLogout() {
  return axios.post('/logout')
}
