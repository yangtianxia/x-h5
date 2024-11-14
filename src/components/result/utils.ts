import type { PropType } from 'vue'
import type { ResultStatus } from './types'

const resolve = (path: string) => {
  return new URL(`./image/${path}`, import.meta.url).href
}

export const resultSharedProps = {
  status: {
    type: [String, Object] as PropType<ResultStatus>,
    default: null as unknown
  }
}

export const resultStatusConfig = {
  404: {
    title: '页面不存在或已删除',
    image: resolve('error.svg')
  },
  500: {
    title: '抱歉，服务请求异常',
    image: resolve('error.svg')
  },
  nodata: {
    title: '暂无数据',
    image: resolve('nodata.svg')
  },
  network: {
    title: '网络异常，请检查设备网络连接',
    image: resolve('network.svg')
  },
  error: {
    title: '抱歉，访问发生错误',
    image: resolve('nodata.svg')
  }
} as const
