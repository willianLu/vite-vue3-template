import { domain } from '@/config/domain'
const isDev = import.meta.env.MODE === 'development'

/**
 * 构建多环境
 */
function buildMultiEnv() {
  const multiEnv = {
    type: 'dev',
    isTest: false,
    isProd: false,
    domain: {},
    cookieDomin: 'localhost'
  }
  const { hostname } = window.location
  if (!isDev) {
    if (/\.prod\./.test(hostname)) {
      multiEnv.isProd = true
      multiEnv.type = 'prod'
    } else {
      multiEnv.isTest = true
      multiEnv.type = 'test'
    }
  }
  // 若需要二级域名共享cookie，则设置顶级域名
  if (hostname !== 'localhost') {
    multiEnv.cookieDomin = hostname
  }
  multiEnv.domain = (<any>domain)[multiEnv.type]
  return multiEnv
}

interface Env {
  type: 'dev' | 'test' | 'prod'
  isDev: boolean
  isTest: boolean
  isProd: boolean
  traceId: string
  domain: Record<string, string>
  cookieDomin: string
}

const env: Env = {
  isDev,
  ...buildMultiEnv(),
  traceId: '123456789'
} as Env

export default env
