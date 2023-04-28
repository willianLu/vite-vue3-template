import Env from '@/env'
import merge from '@/utils/merge'
import { ConfigType, RequiredPick } from '@/types'
export * from './tabBar'
export * from 'domain'

const envConfig: Record<string, ConfigType> = {}
const modules = import.meta.glob('./env/*.ts', { eager: true })
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
) as RequiredPick<ConfigType, 'domain'>

// 代理域名配置，用于页面获取对应环境域名使用
Config.domain = new Proxy(Config.domain || {}, {
  get(target, key: string) {
    // 当获取当前环境域名不存在时，返回域名key，防止未配置时无值
    return Reflect.get(target, key) || key
  }
  // 配置数据不建议使用set
  // set(target, key: string, value) {
  //   return Reflect.set(target, key, value)
  // }
})
// 将配置数据冻结，不允许代码运行阶段修改，如需修改，不应放到配置数据上
export default Object.freeze(Config)
