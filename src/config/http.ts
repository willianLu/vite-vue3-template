import Env from '@/env'
import { CommonParams, DomainParams } from '@/types'

export const commonParams: CommonParams | undefined = {
  traceId: Env.traceId
}

export const domainParams: DomainParams | undefined = {
  'https://www.prod.gs.com': {
    domain: 'gs'
  },
  'https://www.prod.tc.com': function () {
    return {
      domain: 'tc',
      name: 'tc-qiang'
    }
  }
}

export const commonResponse = (response: any) => {
  if (response.data) response.data.test = '公共返回处理'
}

export const domainResponse: Record<string, (response: any) => void> = {
  'https://www.prod.gs.com': function (response) {
    if (response.data) {
      response.data.gs = 'gs处理'
    }
  },
  'https://www.prod.tc.com': function (response) {
    if (response.data) {
      response.data.tc = 'tc处理'
    }
  }
}
