import {
  describe,
  it,
  test,
  expect
} from 'vitest';

describe('基本宣告測試', () => {
  test('1 + 1 = 2', () => {
    expect(1 + 1).toBe(2)
  })

  // it 是 test 的別名
  it('1 + 1 = 2', () => {
    expect(1 + 1).toBe(2)
  })

  it('Boolean 比較', () => {
    expect(true).toBe(true)

    //#region 只能用 toBe 嗎？
    // 除了 toBe 之外，還有 toBeTruthy、toBeFalsy
    // expect(true).toBeTruthy()
    // expect(false).toBeFalsy()
    //#endregion
  })

  it('物件比較', () => {
    const obj = { a: 1 }
    expect(obj).toEqual({ a: 1 })

    //#region toBe 不行比較物件嗎？
    // Q: 為什麼不行？
    // expect(obj).toBe({ a: 1 })
    //#endregion
  })

  it('陣列比較', () => {
    const arr = [1, 2, 3]
    expect(arr).toEqual([1, 2, 3])

    //#region toBe 不行比較陣列嗎？
    // Q: 為什麼不行？
    // expect(arr).toBe([1, 2, 3])
    //#endregion
  })

  it('字串比較', () => {
    const str = 'hello'
    expect(str).toBe('hello')
  })

  it('陣列物件，如果陣列中有相同就通過', () => {
    const arr = [
      {
        myName: 'Ray',
      },
      {
        myName: 'Joe',
      }
    ];

    
    //#region toContainEqual
    // toContainEqual 可以用於比較物件或純值
    // 若為物件時，會比較物件的 key-value 是否相同
    // 若為純值時，會比較值是否相同
    expect(arr).toContainEqual({
      myName: 'Ray',
    })

    // 若為純值時，會比較值是否相同
    const arr1 = ['apple', 'banana', 'cherry']
    expect(arr1).toContainEqual('apple')
    //#endregion
  })
})