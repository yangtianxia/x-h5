interface SetupMockOption {
  mock?: boolean
  setup(): void
}

export const successResponseWrap = (data: unknown) => {
  return {
    data,
    status: 'ok',
    msg: '请求成功',
    code: 200
  }
}

export const failResponseWrap = (data: unknown, msg: string, code = 500) => {
  return {
    data,
    status: 'fail',
    msg,
    code
  }
}

export default ({ mock, setup }: SetupMockOption) => {
  if (mock !== false && import.meta.env.MODE !== 'production') setup()
}
