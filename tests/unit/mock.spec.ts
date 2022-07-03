import axios from 'axios'
import { getUserName } from '../utils/user'
jest.mock('axios')
//  解决axios上面没有mockImplementation类型的问题
const mockAxios = axios as jest.Mocked<typeof axios>

mockAxios.get.mockImplementation(() => {
  return Promise.resolve({ data: { username: '666' } })
})
// beforeEach(() => {
//   console.log('beforeEach 外层')
// })
function mockTest(shouldCall: boolean, cb: (val: number) => any) {
  if (shouldCall) cb(56)
}
describe('mock', () => {
  // beforeEach(() => {
  //   console.log('beforeEach 内层')
  // })

  it('test mock base', () => {
    const cb = jest.fn()
    mockTest(true, cb)
    expect(cb).toHaveBeenCalled()
    expect(cb).toBeCalledWith(56)
    expect(cb).toBeCalledTimes(1)
  })

  test('test mock with implementation', async () => {
    const username = await getUserName(1)
    expect(username).toBe('666')
  })
})
