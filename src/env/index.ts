const isDev = import.meta.env.MODE === 'development'

/**
 * 构建多环境
 */
function buildMultiEnv() {
  const multiEnv = {
    type: 'dev',
    isTest: false,
    isProduct: false
  }
  if (!isDev) {
    const { hostname } = window.location
    if (/\.test\./.test(hostname)) {
      multiEnv.isTest = true
      multiEnv.type = 'test'
    } else if (/\.prod\./.test(hostname)) {
      multiEnv.isProduct = true
      multiEnv.type = 'prod'
    }
  }
  return multiEnv
}

interface Env {
  type: 'dev' | 'test' | 'prod'
  isDev: boolean
  isTest: boolean
  isProduct: boolean
}

const env: Env = {
  isDev,
  ...buildMultiEnv()
} as Env

export default env
