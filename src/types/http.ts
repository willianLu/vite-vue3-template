import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { DomainType } from '@/enum'

/**
 * @description 自定义请求配置参数
 */
export type CustomAxiosRequestConfig<T = any> = AxiosRequestConfig<T> & {
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
  data: T
}
/**
 * @description 请求域名gs.com返回数据
 */
export interface GsResponseData<T = any> {
  status: number
  message: string
  data: T
}

export interface TcResponseData<T = any> {
  code: number
  success: boolean
  message: string
  data: T
}

type ResponseDataMap<T> = {
  [DomainType.gs]: GsResponseData<T>
  [DomainType.tc]: TcResponseData<T>
}

type BackData<T, D> = D extends keyof ResponseDataMap<T>
  ? ResponseDataMap<T>[D]
  : CustomResponseData<T>

export type RequestBackData<T, D, M, U> = U extends 'origin'
  ? AxiosResponse<BackData<T, M>, D>
  : BackData<T, M>
