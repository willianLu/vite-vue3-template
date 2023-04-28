export interface ConfigType {
  baseUrl?: string
}

export type CommonParams = Record<string, any> | (() => Record<string, any>)

export type DomainParams = Record<string, CommonParams>
