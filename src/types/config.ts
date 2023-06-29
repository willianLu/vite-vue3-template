export interface ConfigType {
  baseUrl?: string
  // 设计稿宽度
  viewportWidth: number
  // 域名配置
  domain: Record<string, string>
}

export type CommonParams = Record<string, any> | (() => Record<string, any>)

export type DomainParams = Record<string, CommonParams>
