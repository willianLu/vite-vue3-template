export interface ConfigType {
  baseUrl?: string
  domain?: Record<string, string>
}

export type CommonParams = Record<string, any> | (() => Record<string, any>)

export type DomainParams = Record<string, CommonParams>
