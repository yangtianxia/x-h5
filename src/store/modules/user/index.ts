import { defineStore } from 'pinia'
import { setToken, clearToken } from '@/shared/auth'
import { removeRouteListener } from '@/shared/route-listener'

import { getUserInfo } from '@/api/user/user-info'
import { postLogin, type LoginQuery } from '@/api/user/login'
import { postLogout } from '@/api/user/logout'

import type { UserState } from './types'

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: undefined,
    name: undefined,
    avatar: undefined,
    nickName: undefined,
    phone: undefined,
    email: undefined,
    certification: undefined
  }),
  getters: {
    userInfo(state: UserState): UserState {
      return { ...state }
    }
  },
  actions: {
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial)
    },
    resetInfo() {
      this.$reset()
    },
    async getUserInfo() {
      const result = await getUserInfo()
      this.setInfo(result)
    },
    async login(loginForm: LoginQuery) {
      try {
        const result = await postLogin(loginForm)
        setToken(result.token)
      } catch (err) {
        clearToken()
        throw err
      }
    },
    logoutCallback() {
      this.resetInfo()
      clearToken()
      removeRouteListener()
    },
    async logout() {
      try {
        await postLogout()
      } finally {
        this.logoutCallback()
      }
    }
  }
})

export default useUserStore
