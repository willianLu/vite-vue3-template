import { AxiosRequestConfig } from 'axios'
import { isObject } from '@/utils/util'
import Config from '@/config'
import Env from '@/env'

/**
 * @description 请求返回数据
 * @param {*}
 * @returns {void}
 */
export interface CustomResponseData<T> {
  code: number
  message: string
  data?: T
}
/**
 * @description 处理自定义返回数据
 * @param {string} code 返回 code
 * @param {string | undefined} message 返回信息
 * @returns {object}
 */
export function handleCustomResponseData<T>(
  code: number,
  message?: string,
  data?: T
): CustomResponseData<T> {
  return {
    code,
    message: message || '',
    data
  }
}

/**
 * @description 处理域名规则，多域名服务器预发环境处理
 * @param {strung} url 请求url
 * @returns {String} 处理后的url地址
 */
function handleDomainRule(config: AxiosRequestConfig) {
  const { domain } = Config
  const url = String(config.url || '').trim()
  if (domain && isObject(domain)) {
    const isDomain = Object.keys(domain).some(key => {
      // 使用indexOf判断，预订域名与配置一致，减少处理逻辑
      if (url.indexOf(key) === 0) {
        config.url = url.replace(key, domain[key])
        return true
      }
    })
    if (!isDomain) {
      Object.keys(domain).some(key => {
        // 使用indexOf判断，预订域名与配置一致，减少处理逻辑
        if (config.baseURL === key) {
          config.baseURL = domain[key]
          return true
        }
      })
    }
  }
}

/**
 * @description 处理域名代理
 * @param {object} config AxiosRequestConfig
 */
function handleDomainProxy(config: AxiosRequestConfig) {
  if (!Env.isDev || !Config.proxy) return
  const isProxy = Object.keys(Config.proxy).some(key => {
    const url = config.url || ''
    // 使用indexOf判断，预订域名与配置一致，减少处理逻辑
    if (url.indexOf(key) === 0) {
      config.url = url.replace(key, (Config.proxy as any)[key])
      return true
    }
  })
  if (!isProxy) {
    Object.keys(Config.proxy).some(key => {
      const baseURL = config.baseURL || ''
      // 使用indexOf判断，预订域名与配置一致，减少处理逻辑
      if (baseURL.indexOf(key) === 0) {
        config.baseURL = baseURL.replace(key, (Config.proxy as any)[key])
        return true
      }
    })
  }
}
/**
 * @description 处理公共参数
 * @param {Object} 请求相关数据
 * @returns {void}
 */
// function handleCommonParams(options) {
//   const { method, params, data, isFormData, skipCommonData } = options;
//   const { traceId, userId, openId, unionId } = Env;
//   const commonParams = {
//     traceId,
//     userId,
//     openId,
//     unionId,
//   };
//   // 参数处理
//   let _data = method === "get" ? params : data;
//   // 不跳过公共参数处理，且参数是对象
//   if (!skipCommonData && isObject(_data)) {
//     _data = { ...commonParams, ..._data };
//   }
//   // formData数据，特殊处理
//   _data = isFormData ? stringifyQuery(_data) : _data;

//   if (method === "get") {
//     options.params = _data;
//   } else {
//     options.data = _data;
//   }
// }

/**
 * @description 处理请求规则，多域名解析，请求公共参数
 * @param {Object} config 请求相关数据
 * @returns {Object}
 */
export function handleRequestRule<D>(config: AxiosRequestConfig<D>) {
  // 请求URL处理
  handleDomainRule(config)
  handleDomainProxy(config)
  // 公共参数处理
  // handleCommonParams(options);
  return config
}
