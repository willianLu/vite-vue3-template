interface EnvType {
  type: 'dev' | 'test' | 'prod'
  isDev: boolean
  isTest: boolean
  isProd: boolean
  traceId: string
  cookieDomin: string
}
// 是否本地开发环境
const isDev = import.meta.env.MODE === 'development'
/**
 * @description 环境配置
 * 挂载当前工作环境、域名配置等
 */
const env: EnvType = {
  type: 'dev',
  isDev,
  isTest: false,
  isProd: false,
  cookieDomin: 'localhost',
  traceId: '123456789'
}
// 根据域名识别当前环境
const { hostname } = window.location
if (!isDev && /\.prod\./.test(hostname)) {
  env.isProd = true
  env.type = 'prod'
} else if (!isDev) {
  env.isTest = true
  env.type = 'test'
}
// 若需要二级域名共享cookie，则设置顶级域名
if (hostname !== 'localhost') {
  env.cookieDomin = hostname
}

export default env
