import type { UserState } from '@/store/modules/user/types'
import axios from '../with-axios'

/** 用户资料 */
export function getUserInfo() {
  return axios.get<UserState>('/user/info')
}
