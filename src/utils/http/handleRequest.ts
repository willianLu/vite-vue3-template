import Env from '@/env'
import { CommonParams, DomainParams } from '@/types'

// 开发环境代理key处理
export const devProxy: Record<string, string> = {
  [Env.domain.gs]: '/gs-api',
  [Env.domain.qt]: '/qt-api',
  [Env.domain.tc]: '/tc-api'
}

// 公共参数，所有域名都支持
export const commonParams: CommonParams = {
  traceId: Env.traceId
}

// 多域名参数配置
export const domainParams: DomainParams = {
  [Env.domain.gs]: {
    domain: 'gs'
  },
  [Env.domain.qt]: {
    flag: 'qt'
  },
  [Env.domain.tc]: function () {
    return {
      domain: 'tc',
      name: 'tc-qiang'
    }
  }
}

// 公共response返回处理
export const commonResponse = (response: any) => {
  const data = response.data
  if (data) response.data.test = '公共返回处理'
  return response
}

// 多域名response返回处理
export const domainResponse: Record<string, (response: any) => void> = {
  [Env.domain.gs]: function (response) {
    const data = response.data
    if (data) {
      response.data.gs = 'gs处理'
    }
    return response
  },
  [Env.domain.qt]: function (response) {
    if (response.data) {
      response.data.qt = 'qt处理'
    }
  },
  [Env.domain.tc]: function (response) {
    const data = response.data
    const error = new Error()
    if (data.code === 401) {
      error.message = data.message
      error.name = data.code
      return Promise.reject(error)
    }
    response.data.tc = 'tc处理'
    return response
  }
}
