import Mock from 'mockjs'
import { isLogin } from '@/shared/auth'
import setupMock, { successResponseWrap, failResponseWrap } from '../setup'
import type { MockParams } from '../types'

setupMock({
  setup() {
    // 登录
    Mock.mock(new RegExp('/login'), (params: MockParams) => {
      const { username, password } = JSON.parse(params.body)
      if (!username) {
        return failResponseWrap(null, '用户名不能为空', 403)
      }
      if (!password) {
        return failResponseWrap(null, '密码不能为空', 403)
      }
      if (username === 'admin' && password === 'admin') {
        return successResponseWrap({
          token: '12345'
        })
      }
      if (username === 'user' && password === 'user') {
        return successResponseWrap({
          token: '54321'
        })
      }
      return failResponseWrap(null, '账号或者密码错误', 403)
    })

    // 登出
    Mock.mock(new RegExp('/logout'), () => {
      return successResponseWrap(null)
    })

    // 用户信息
    Mock.mock(new RegExp('/user/info'), () => {
      if (isLogin()) {
        return successResponseWrap({
          id: 12,
          name: 'user',
          avatar: '//lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png',
          nickName: 'hs-d',
          phone: '150****0000',
          email: 'wangliqun@email.com',
          certification: 1
        })
      }
      return failResponseWrap(null, '未登录', 403)
    })
  }
})
