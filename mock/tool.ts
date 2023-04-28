export function success(data: any, message?: string) {
  return {
    code: 200,
    data,
    message: message || ''
  }
}

export function fail(code: number, message?: string, data?: any) {
  return {
    code,
    data: data || {},
    message: message || ''
  }
}

export function gsSuccess(data: any, message?: string) {
  return {
    status: 200,
    data,
    message: message || ''
  }
}

export function gsFail(status: number, message?: string, data?: any) {
  return {
    status,
    data: data || {},
    message: message || ''
  }
}

export function parseData(data: string) {
  let res!: Record<string, string>
  try {
    res = JSON.parse(data)
  } catch (error) {
    res = {}
  }
  return res
}
