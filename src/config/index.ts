import Env from '@/env'
import merge from '@/utils/merge'
import { DomainType } from '@/utils/http'
export interface ConfigType {
  baseUrl?: string
  domain?: Record<string, string>
  proxy?: Record<string, string>
  commonParams?: Record<string, any>
  domainParams?: Record<string, Record<any, any> | (() => Record<any, any>)>
  domainType?: Record<string, DomainType>
}
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
