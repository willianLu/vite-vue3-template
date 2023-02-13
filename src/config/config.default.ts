import { ConfigType } from '@/types'
import Env from '@/env'

const config: ConfigType = {
  baseUrl: 'http://192.168.11.120:7001',
  commonParams: {
    traceId: Env.traceId
  },
  tabs: [
    {
      title: '首页',
      icon: 'home',
      url: '/'
    },
    {
      title: '我的',
      icon: 'user',
      url: '/my'
    }
  ]
}

export default config
