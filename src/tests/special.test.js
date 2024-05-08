import {
  describe,
  vi,
  it,
  expect
} from 'vitest';
import axios from 'axios';

describe('Test API 示範', () => {
  it('spyOn', () => {
    const math = {
      sum: (a, b) => a + b
    }
    // 需注意，spyOn 只接受物件的方法，第一個參數必須是物件，第二個則是屬性名稱
    const spy = vi.spyOn(math, 'sum')

    const result = math.sum(1, 2)

    expect(result).toBe(3)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('alert + spyOn', () => {
    // 因為 window.alert 是瀏覽器的 API，所以在測試環境中會噴錯，所以這邊用 vi.fn() 來模擬 window.alert 呼叫
    window.alert = vi.fn()

    //#region 小知識點
    // 只要有操作邏輯是跟 Window 有關的，可以使用 stubGlobal 來模擬
    // const mockWindow = {
    //   alert: vi.fn(),
    //   location: {
    //     href: 'https://www.google.com'
    //   }
    // }
    // vi.stubGlobal('window', mockWindow)
    //#endregion

    const spy = vi.spyOn(window, 'alert')
    
    window.alert('Hello')
    // toHaveBeenCalled 用來檢查是否有被呼叫
    expect(spy).toHaveBeenCalled()
    // toHaveBeenCalledTimes 用來檢查是否有被呼叫幾次
    expect(spy).toHaveBeenCalledTimes(1)

    window.alert('Hello')
    expect(spy).toHaveBeenCalledTimes(2)
  })

  it('spyOn + mockReturnValue', async () => {
    // spyOn 本質其實是攔截特定函式的呼叫，然後轉換成 Mock Function 取代原本的行為
    // 例如：原本有一個取得產品的 API，我們可以透過 spyOn 來攔截這個 API 的呼叫，然後回傳我們自己的資料
    const ajax = {
      async getProduct() {
        try {
          const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')
          console.log(data)
          return data
        } catch (error) {
          console.error(error)
        }
      }
    }

    const mockGetProduct = vi.spyOn(ajax, 'getProduct')
    // mockReturnValue 用來設定當這個函式被呼叫時，要回傳什麼值
    mockGetProduct.mockReturnValue('mock data')

    const result = await ajax.getProduct()
    console.log(result)
    expect(result).toBe('mock data')
  })

  it('setTimeout', () => {
    let count = 0;

    // 使用 useFakeTimers 將 setTimeout 以及 setInterval 轉換為 mock function
    vi.useFakeTimers()
    setTimeout(() => {
      count += 1
    }, 0)

    // 將所有的 timer 都執行完畢
    vi.runAllTimers()
    // console.log(count)
    expect(count).toBe(1)
  })

  it('date', () => {
    // 有些情況下，我們會需要模擬當前時間，這時候可以使用 vi.setSystemTime 來設定當前時間
    vi.setSystemTime(new Date('2021-01-01'))
    const now = new Date()
    // console.log(now.getFullYear())
    expect(now.getFullYear()).toBe(2021)
  })
})