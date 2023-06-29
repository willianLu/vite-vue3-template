import { ConfigType } from '@/types'
import Domain from './domain'
import Env from '@/env'

const config: ConfigType = {
  viewportWidth: 750,
  domain: Domain[Env.type] || {}
}

export default config
