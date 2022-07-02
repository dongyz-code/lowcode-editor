/** 匹配器基础使用 --start */
test('test number', () => {
  expect(2 + 2).toBe(4)
})

test('test object', () => {
  const obj = { a: 1 }
  expect(obj).toEqual({ a: 1 })
})

test('test two plus two', () => {
  const value = 2 + 2
  expect(value).toBeGreaterThan(3)
  expect(value).toBeGreaterThanOrEqual(3.5)
  expect(value).toBeGreaterThanOrEqual(4)
  expect(value).toBeLessThan(5)
  expect(value).toBeLessThanOrEqual(5.5)

  expect(value).toBe(4)
  expect(value).toEqual(4)
})

test('test strging', () => {
  expect('this is a blog').toMatch(/blog$/)
})

test('test toContain', () => {
  const shoppingList = ['diapers', 'kleenex', 'trash bags', 'paper towels', 'milk']
  expect(shoppingList).toContain('milk')
  expect(new Set(shoppingList)).toContain('milk')
})
/** 匹配器基础使用 --end */

/** 异步代码测试 --start */
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(5)
    }, 1000)
  })
}
test('test promise', () => {
  return fetchData().then((val) => {
    expect(val).toBe(5)
  })
})

test('test callback', (done) => {
  fetchData().then((val) => {
    expect(val).toBe(5)
    done()
  })
})

test('test async', async () => {
  const value = await fetchData()
  expect(value).toBe(5)
})
