import qs from 'qs'
import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type RequestContentType
} from 'axios'
import {
  isPlainObject,
  isUndefined,
  isString,
  isNil,
  isFunction
} from '@txjs/bool'
import { showToast } from 'vant'
import { useRedirect } from '@/hooks/redirect'
import { isLogin, getToken } from '@/shared/auth'

const createAxiosError = (errorText?: string) => ({
  code: 400,
  success: false,
  msg: errorText,
})

class WithAxios {
  #contentType: RequestContentType = 'JSON'

  #axios = axios.create({
    baseURL: import.meta.env.DEV
      ? import.meta.env.VITE_PROXY_API
      : import.meta.env.VITE_API,
    timeout: 1000 * 30
  })

  constructor () {
    this.#axios.interceptors.request.use(
      (config) => {
        config.type ??= this.#contentType
        config.headers.set('Content-Type', this.#getContentType(config.type))

        if (isLogin()) {
          config.headers.set('Authorization', `Bearer ${getToken()}`)
        }
        return config
      },
      (error) => {
        const result = createAxiosError(error.message)
        showToast(result.msg)
        return Promise.reject(result)
      }
    )

    this.#axios.interceptors.response.use(
      (config) => {
        const { data } = config

        // 请求成功
        if (data.code >= 200 && data.code < 300) {
          return Promise.resolve(data.data)
        }

        // 登陆失效
        if (data.code === 401) {
          const { go } = useRedirect()
          go()
        } else {
          showToast(data.msg)
        }

        return Promise.reject(data)
      },
      (error: AxiosError<any>) => {
        const message = error?.message
        const result = createAxiosError(message)

        if (message) {
          const { status, statusText } = error.response ?? {}

          if (status === 404) {
            result.msg = '页面接口不存在或已删除'
          } else if (status == 500) {
            result.msg = '抱歉，服务请求异常'
          } else if (statusText) {
            if (statusText.startsWith('Internal Server Error')) {
              result.msg = '服务出错，请稍后重试'
            } else {
              result.msg = statusText
            }
          } else if (message) {
            if (message.startsWith('Network Error')) {
              result.msg = '网络异常，请检查网络'
            } else if (message.startsWith('timeout of')) {
              result.msg = '请求超时，请检查网络或重新请求'
            } else {
              result.msg = message
            }
          }

          if (!isNil(status)) {
            result.code = status
          }
        } else {
          result.msg = error.toString()
        }

        showToast(result.msg)

        return Promise.reject(result)
      }
    )
  }

  #captureError(error: AxiosError<any>) {
    const result = {
      code: 400,
      success: false,
      message: '请求失败'
    }
    const message = error?.message

    if (!message) {
      result.message = error.toString()
    } else {
      const { status, statusText, data } = error.response ?? {}

      if (isString(data)) {
        result.message = data
      } else if (isPlainObject(data)) {
        result.message = data.message
      } else if (statusText) {
        if (statusText.startsWith('Internal Server Error')) {
          result.message = '服务出错，请稍后请求'
        } else {
          result.message = statusText
        }
      } else if (message) {
        if (message.startsWith('Network Error')) {
          result.message = '网络异常，请检查网络'
        } else if (message.startsWith('timeout of')) {
          result.message = '请求超时，请检查网络或重新请求'
        } else {
          result.message = message
        }
      }

      if (!isNil(status)) {
        result.code = status
      }
    }
    return result
  }

  #getContentType(type: RequestContentType) {
    switch (type) {
      case 'JSON':
        return 'application/json'
      case 'FormData':
        return 'application/x-www-form-urlencoded'
    }
  }

  #cleanParams(data?: any) {
    if (isPlainObject(data)) {
      Object.keys(data).forEach((key) => {
        if (isUndefined(data[key])) {
          data[key] = ''
        }
      })
    }
    return data
  }

  post<T = any>(url: string, data: any = {}, config?: AxiosRequestConfig) {
    config ??= {}
    config.transformRequest ??= []

    if (isFunction(config.transformRequest)) {
      config.transformRequest = [config.transformRequest]
    }

    config.transformRequest = [
      ...config.transformRequest,
      this.#cleanParams,
      (data: any) => isNil(config.type) || config.type == 'JSON'
        ? JSON.stringify(data)
        : qs.stringify(data)
    ]

    return this.#axios.post<T>(url, data, config)
  }

  get<T = any>(url: string, data: any = {}, config?: AxiosRequestConfig) {
    config ??= {}
    config.params ??= data

    const paramsSerializer = config.paramsSerializer

    config.paramsSerializer = (params) => {
      params = this.#cleanParams(params)
      if (isFunction(paramsSerializer)) {
        params = paramsSerializer.bind(null, params)
      }
      return qs.stringify(params)
    }

    return this.#axios.get<T>(url, config)
  }
}

export default new WithAxios()
