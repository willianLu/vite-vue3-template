import axios, { AxiosInstance, AxiosResponse } from 'axios'
import interceptors from './interceptors'
import { CustomResponseData } from './tool'
import { CustomAxiosRequestConfig } from './types'

// 创建请求实例
const HttpRequest: AxiosInstance = axios.create({})

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
export function request<T, D, U>(
  config: CustomAxiosRequestConfig<D>
): Promise<
  U extends 'origin'
    ? AxiosResponse<CustomResponseData<T>, D>
    : CustomResponseData<T>
> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new Promise<any>(resolve => {
    HttpRequest.request<T, AxiosResponse<CustomResponseData<T>, D>, D>(config)
      .then(res => {
        resolve(config.options?.backOrigin ? res : res.data)
      })
      .catch(error => {
        resolve(config.options?.backOrigin ? error : error.data)
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

export async function get<T, D = unknown, U = 'data'>(
  url: string,
  params?: D,
  config?: CustomAxiosRequestConfig<D>
) {
  config = config || {}
  return request<T, D, U>({
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
export function post<T, D = unknown, U = 'data'>(
  url: string,
  data?: D,
  config?: CustomAxiosRequestConfig<D>
) {
  config = config || {}
  return request<T, D, U>({
    ...config,
    url,
    method: 'post',
    data
  })
}

export default HttpRequest
