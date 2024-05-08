import {
  describe,
  it,
  expect
} from 'vitest';
import {
  mount
} from '@vue/test-utils'

import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  const msg = 'Hello World'
  const wrapper = mount(HelloWorld,{
    props: {
      msg,
    }
  })

  it('HelloWorld is isVisible', () => {
    expect(wrapper.isVisible()).toBe(true)
  })

  it('HelloWorld has props msg', () => {
    // 可以透過 wrapper.props() 取得 props 的值
    expect(wrapper.props().msg).toBe(msg)
  })

  it('HelloWorld has text msg', () => {
    const findGreen = wrapper.find('.green')
    // 可以透過 wrapper.text() 取得元件的文字內容
    expect(findGreen.text()).toBe(msg)
  })
})