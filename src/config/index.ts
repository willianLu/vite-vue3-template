import Env from '@/env'
import merge from '@/utils/merge'
import { ConfigType } from '@/types/config'

const envConfig: Record<string, ConfigType> = {}
const modules = import.meta.glob('./*.ts', { eager: true })
Object.keys(modules).forEach(key => {
  // eslint-disable-next-line no-useless-escape
  const res = key.match(/\.?([^\.\/]+)\.(?:[^\.]+)$/)
  if (res) {
    envConfig[res[1]] = (modules[key] as any).default
  }
})

const Config = merge(
  envConfig.default || {},
  envConfig[Env.type] || {}
) as ConfigType

export default Config
