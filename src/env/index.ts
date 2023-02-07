const isDev = import.meta.env.MODE === 'development'

/**
 * 构建多环境
 */
function buildMultiEnv() {
  const multiEnv = {
    type: 'dev',
    isTest: false,
    isProd: false
  }
  if (!isDev) {
    const { hostname } = window.location
    if (/\.prod\./.test(hostname)) {
      multiEnv.isProd = true
      multiEnv.type = 'prod'
    } else {
      multiEnv.isTest = true
      multiEnv.type = 'test'
    }
  }
  return multiEnv
}

interface Env {
  type: 'dev' | 'test' | 'prod'
  isDev: boolean
  isTest: boolean
  isProd: boolean
  traceId: string
}

const env: Env = {
  isDev,
  ...buildMultiEnv(),
  traceId: '123456789'
} as Env

export default env
