import { get, post } from '@/utils/http'
import Env from '@/env'
import { UserInfo } from '@/types'

// 用户登录
export function userLogin(data: any) {
  return post<unknown, unknown, 'gs'>(Env.domain.gs + '/login', data)
}

export function queryUserInfo() {
  return get<UserInfo>(Env.domain.tc + '/user/info')
}

export function queryImgCode() {
  return get<any, unknown, 'qt'>(
    Env.domain.qt + '/product/imageCode',
    { userData: 122323 },
    {
      skipCommonData: true
    }
  )
}

export function queryTcUserInfo() {
  return get(Env.domain.qt + '/user/info')
}

export function queryList() {
  return post('/product/list', {
    token: '774855A133F80E0F5F6ED26B294AE22F_WEB_PR8GUTY54DGRQDWZ',
    version: '2.0.0',
    grade: 'a1',
    cityCode: 340100,
    ruCode: 3401002,
    device: 2
  })
}
