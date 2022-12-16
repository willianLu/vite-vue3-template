import { AxiosRequestConfig } from 'axios'

interface CustomOptions {
  backOrigin?: boolean
  cache?: string
}
export type CustomAxiosRequestConfig<T> = AxiosRequestConfig<T> & {
  options?: CustomOptions
}
