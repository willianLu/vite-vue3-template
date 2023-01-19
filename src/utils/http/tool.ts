import { CustomAxiosRequestConfig, CustomResponseData } from './types'
import { isObject, isFunction, stringifyQuery } from '@/utils/util'
import Config from '@/config'
import Env from '@/env'

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
function handleDomainRule(config: CustomAxiosRequestConfig) {
  const { domain } = Config
  const url = String(config.url || '').trim()
  // 若配置了域名映射，则对映射做处理
  if (domain && isObject(domain)) {
    // 若url中包含域名，直接处理 url
    if (isIncludeDomain(url)) {
      Object.keys(domain).some(key => {
        // 使用indexOf判断，预订域名与配置一致，减少处理逻辑
        if (url.indexOf(key) === 0) {
          config.url = url.replace(key, domain[key])
          return true
        }
      })
    } else if (config.baseURL) {
      // 当url不包含域名时，则对baseUrl做处理
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
 * @param {object} config CustomAxiosRequestConfig
 */
function handleDomainProxy(config: CustomAxiosRequestConfig) {
  if (!Env.isDev || !Config.proxy) return
  const url = config.url || ''
  // 若url中包含域名，直接处理 url
  if (isIncludeDomain(url)) {
    Object.keys(Config.proxy).some(key => {
      // 使用indexOf判断，预订域名与配置一致，减少处理逻辑
      if (url.indexOf(key) === 0) {
        config.url = url.replace(
          key,
          (Config.proxy as Record<string, string>)[key]
        )
        config.baseURL = ''
        return true
      }
    })
  } else if (config.baseURL) {
    // 当url不包含域名时，则对baseUrl做处理
    const baseURL = config.baseURL || ''
    Object.keys(Config.proxy).some(key => {
      // 使用indexOf判断，预订域名与配置一致，减少处理逻辑
      if (baseURL.indexOf(key) === 0) {
        config.baseURL = baseURL.replace(
          key,
          (Config.proxy as Record<string, string>)[key]
        )
        return true
      }
    })
  }
}
/**
 * @description 是否已包含域名
 * @param {string} url 请求url
 */
function isIncludeDomain(url: string) {
  // eslint-disable-next-line no-useless-escape
  return /^(http(s)?:)?\/\/([^\/\.])+\.[\w-]+/.test(url)
}
/**
 * @description 处理公共参数
 * @param {Object} config 请求相关数据
 * @returns {void}
 */
function handleCommonParams(config: CustomAxiosRequestConfig) {
  const { method, params, data, skipCommonData, isFormData, url, baseURL } =
    config
  // 获取公共参数，不区分域名
  let commonParams = Config.commonParams || {}
  const { domainParams } = Config
  // 若存在域名参数单独处理
  if (domainParams) {
    // 在api上配置了域名处理
    const isHasDomain = Object.keys(domainParams).some(item => {
      if (url?.indexOf(item) === 0) {
        const fun = domainParams[item]
        const _params = isFunction(fun) ? fun() : domainParams[item]
        commonParams = { ...commonParams, ..._params }
        return true
      }
    })
    // api未配置域名，按baseUrl处理
    if (!isHasDomain && baseURL) {
      Object.keys(domainParams).some(item => {
        if (baseURL === item) {
          const fun = domainParams[item]
          const _params = isFunction(fun) ? fun() : domainParams[item]
          commonParams = { ...commonParams, ..._params }
          return true
        }
      })
    }
  }
  // 根据请求类型，取不同的参数数据
  let _data = method === 'get' ? params : data
  // 不跳过公共参数处理，且参数是对象或者未设置参数
  if (!skipCommonData && (isObject(_data) || _data === undefined)) {
    _data = { ...commonParams, ..._data }
  }
  // formData数据，特殊处理
  _data = isFormData ? stringifyQuery(_data) : _data

  if (method === 'get') {
    config.params = _data
  } else {
    config.data = _data
  }
}

/**
 * @description 处理请求规则，多域名解析，请求公共参数
 * @param {Object} config 请求相关数据
 * @returns {Object}
 */
export function handleRequestRule(config: CustomAxiosRequestConfig) {
  // 公共参数处理
  handleCommonParams(config)
  // 请求URL处理
  handleDomainRule(config)
  // 开发环境，请求域名代理处理
  handleDomainProxy(config)
  return config
}
