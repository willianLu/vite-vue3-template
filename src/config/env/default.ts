import { ConfigType } from '@/types'
import Env from '@/env'

const config: ConfigType = {
  baseUrl: 'http://192.168.11.120:7001',
  commonParams: {
    traceId: Env.traceId
  },
  domainParams: {
    'https://www.prod.gs.com': {
      domain: 'gs'
    },
    'https://www.prod.tc.com': function () {
      return {
        domain: 'tc',
        name: 'tc-qiang'
      }
    }
  }
}

export default config
