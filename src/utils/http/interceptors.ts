import { AxiosResponse } from 'axios'
import { isError } from '../util'
import { handleRequestRule, handleCustomResponseData } from './tool'
import { CustomAxiosRequestConfig } from './types'

// 发出请求前拦截
const request = {
  /**
   * @description 发送请求拦截，处理请求参数
   * @param {object} options 请求配置
   * @returns {object} 处理后的配置数据
   */
  onFufilled<D>(config: CustomAxiosRequestConfig<D>) {
    console.log(config, '========请求配置')
    return handleRequestRule(config)
  },
  /**
   * @description 发送请求错误拦截
   * @param {unknown} error 请求错误信息
   * @returns {Promise} 返回错误信息
   */
  onRejected(error: unknown) {
    const isResponseError = isError(error)
    if (isResponseError) {
      console.group('接口请求request错误')
      console.error(error)
      console.groupEnd()
    }
    let { request } = error as any
    if (!request) {
      request = {
        status: -1,
        message: 'request返回错误'
      }
    }
    request.data = handleCustomResponseData(
      -1,
      isResponseError ? error.message : '',
      {
        status: request.status
      }
    )
    return Promise.reject(request)
  }
}

// 请求返回拦截
const response = {
  /**
   * @description 请求返回拦截，处理返回参数
   * @param {AxiosResponse} response 请求reponse对象
   * @returns {AxiosResponse} 返回response对象
   */
  onFufilled<T, D>(response: AxiosResponse<T, D>): AxiosResponse<T, D> {
    return response
  },
  /**
   * @description 请求返回错误拦截
   * @param {unknown} error response错误信息
   * @returns {Promise} 返回错误信息
   */
  onRejected(error: unknown) {
    const isResponseError = isError(error)
    if (isResponseError) {
      console.group('接口请求reponse错误')
      console.error(error)
      console.groupEnd()
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let { response } = error as any
    if (!response) {
      response = {
        status: -2,
        message: 'response返回错误'
      }
    }
    response.data = handleCustomResponseData(
      -1,
      isResponseError ? error.message : '',
      {
        status: response.status
      }
    )
    return Promise.reject(response)
  }
}

export default {
  request,
  response
}
