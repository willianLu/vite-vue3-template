import { ConfigType } from '@/types/config'
const config: ConfigType = {
  domain: {
    'https://www.prod.gs.com': 'http://192.168.11.120:7001'
  },
  proxy: {
    'http://192.168.11.120:7001': '/api'
  }
}

export default config
