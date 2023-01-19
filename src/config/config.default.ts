import { ConfigType } from './index'
import Env from '@/env'
import { DomainType } from '@/utils/http'

const config: ConfigType = {
  baseUrl: 'http://192.168.11.120:7001',
  commonParams: {
    traceId: Env.traceId
  },
  domainType: {
    'https://www.prod.gs.com': DomainType.gs
  }
}

export default config
