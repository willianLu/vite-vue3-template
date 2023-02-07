import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { DomainType } from '@/enum'

/**
 * @description 自定义请求配置参数
 */
export type CustomAxiosRequestConfig<T = unknown> = AxiosRequestConfig<T> & {
  skipCommonData?: boolean
  isFormData?: boolean
  backOriginResponse?: boolean
}

/**
 * @description 默认请求返回数据
 */
export interface CustomResponseData<T = any> {
  code: number
  message: string
  data?: T
}
/**
 * @description 请求域名gs.com返回数据
 */
export interface GsResponseData<T = any> {
  status: number
  message: string
  data?: T
}

type BackData<T, D = 'default'> = D extends DomainType.gs
  ? GsResponseData<T>
  : CustomResponseData<T>

export type RequestBackData<
  T,
  D,
  M = 'default',
  U = 'data'
> = U extends 'origin' ? AxiosResponse<BackData<T, M>, D> : BackData<T, M>
