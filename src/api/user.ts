import { get, post } from '@/utils/http'

interface UserInfo {
  id: number
  name: string
  age: number
  sex: number
}
export function queryUserInfo() {
  return get<UserInfo>('/user/info')
}

export function queryImgCode() {
  return get('/publicszoneui.service/VerifyImageService?userCode=15555116026')
}

export function queryList() {
  return post('/publicszoneui.service/CrmService/List', {
    token: '774855A133F80E0F5F6ED26B294AE22F_WEB_PR8GUTY54DGRQDWZ',
    version: '2.0.0',
    grade: 'a1',
    cityCode: 340100,
    ruCode: 3401002,
    device: 2
  })
}
