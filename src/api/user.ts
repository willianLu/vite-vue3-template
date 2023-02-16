import { get, post } from '@/utils/http'
import { DomainType } from '@/enum'

interface UserInfo {
  id: number
  name: string
  age: number
  sex: number
}
export function queryUserInfo() {
  return get<UserInfo, unknown, unknown, 'origin'>(
    'https://www.prod.gs.com/user/info'
  )
}

export function queryImgCode() {
  return get<any, unknown, DomainType.gs>(
    'https://www.prod.gs.com/product/imageCode?userData=122323',
    undefined,
    {
      skipCommonData: true
    }
  )
}

export function queryTcUserInfo() {
  return get('https://www.prod.tc.com/user/info')
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
