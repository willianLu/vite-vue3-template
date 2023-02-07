import axios, { AxiosInstance, AxiosResponse } from 'axios'
import interceptors from './interceptors'
import {
  CustomAxiosRequestConfig,
  CustomResponseData,
  RequestBackData
} from '@/types'
import Config from '@/config'

// 创建请求实例
const HttpRequest: AxiosInstance = axios.create({
  baseURL: Config.baseUrl || ''
})

// 注册请求request拦截器
HttpRequest.interceptors.request.use(
  interceptors.request.onFufilled,
  interceptors.request.onRejected
)

// 注册请求response拦截器
HttpRequest.interceptors.response.use(
  interceptors.response.onFufilled,
  interceptors.response.onRejected
)
/**
 * @description request请求方式，包含get\post\put\delete\head\options\patch等
 */
export function request<T, D, M, U>(
  config: CustomAxiosRequestConfig<D>
): Promise<[RequestBackData<T, D, M, U> | undefined, any | undefined]> {
  return new Promise<any>(resolve => {
    HttpRequest.request<T, AxiosResponse<CustomResponseData<T>, D>, D>(config)
      .then(res => {
        resolve([config.backOriginResponse ? res : res.data])
      })
      .catch(error => {
        resolve([undefined, error])
      })
  })
}

/**
 * @description Get请求方法
 * @param {string} url 请求地址
 * @param {any} params 请求参数
 * @param {object | undefined} config 配置参数
 * @returns {Promise<any>}
 */

export async function get<T, D = unknown, M = 'default', U = 'data'>(
  url: string,
  params?: D,
  config?: CustomAxiosRequestConfig<D>
) {
  config = config || {}
  return request<T, D, M, U>({
    ...config,
    url,
    method: 'get',
    params
  })
}

/**
 * @description Post请求方法
 * @param {string} url 请求地址
 * @param {object | undefined} params 请求参数
 * @param {object | undefined} config 配置参数
 * @returns {Promise<any>}
 */
export function post<T, D = unknown, M = 'default', U = 'data'>(
  url: string,
  data?: D,
  config?: CustomAxiosRequestConfig<D>
) {
  config = config || {}
  return request<T, D, M, U>({
    ...config,
    url,
    method: 'post',
    data
  })
}

export default HttpRequest
