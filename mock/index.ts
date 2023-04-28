import HttpRequest from '@/utils/http/index'
import MockAdapter from 'axios-mock-adapter'
import { success, fail, gsSuccess, gsFail, parseData } from './tool'

const mock = new MockAdapter(HttpRequest, { delayResponse: 500 })

mock.onPost('/gs-api/login').reply(function (config: any) {
  const params = parseData(config.data)
  let data = gsSuccess({
    token: '123-456-789'
  })
  if (params.password !== '123456') {
    data = gsFail(5000, '密码错误')
  }
  return [200, data]
})

mock.onGet('/tc-api/user/info').reply(function (config: any) {
  const { headers } = config
  let data = success({
    id: 1,
    name: '小明',
    phone: 15555116026
  })
  if (!headers.token) {
    data = fail(401, '未登录')
  }
  return [200, data]
})
