import { DomainType } from '@/utils/http'
export interface ConfigType {
  baseUrl?: string
  domain?: Record<string, string>
  proxy?: Record<string, string>
  commonParams?: Record<string, any>
  domainParams?: Record<string, Record<any, any> | (() => Record<any, any>)>
  domainType?: Record<string, DomainType>
}
