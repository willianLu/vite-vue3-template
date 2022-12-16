import { get } from '@/utils/http'

interface UserInfo {
  id: number
  name: string
  age: number
  sex: number
}
export function queryUserInfo() {
  return get<UserInfo>('/user/info')
}
