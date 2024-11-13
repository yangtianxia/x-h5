import type { PropType } from 'vue'
import type { ResultStatus } from './types'

export const resultSharedProps = {
  status: {
    type: [String, Object] as PropType<ResultStatus>,
    default: null as unknown
  }
}

export const resultStatusConfig = {
  404: {
    title: '页面接口不存在或已删除',
    // image: require('./image/404.png')
  },
  500: {
    title: '抱歉，服务请求异常',
    // image: require('./image/500.png')
  },
  nodata: {
    title: '暂无数据',
    // image: require('./image/no-data.png')
  },
  network: {
    title: '网络异常，请检查设备网络连接',
    // image: require('./image/no-network.png')
  },
  error: {
    title: '抱歉，访问发生错误',
    // image: require('./image/error.png')
  }
} as const
