import {
  describe,
  it,
  expect
} from 'vitest';
import {
  mount
} from '@vue/test-utils'
import router from '@/router';
import routers from '@/router/routes';

import App from '@/App.vue'

describe('App.vue', () => {
  const wrapper = mount(App,{
    global: {
      // stubs 屬性可以把 Global Component 或是 Local Component 的子 Component 給 Stub 掉（Stub 是一種 Mock 的概念）
      stubs: [
        'RouterView',
        'RouterLink',
        'HelloWorld'
      ],
    }
  })

  it('App is isVisible', () => {
    expect(wrapper.isVisible()).toBe(true)
  })
})

describe('App.vue + Router', async() => {
  router.push('/')
  // 只要有切換路由的行為，都需要等待路由完成
  await router.isReady()

  const wrapper = mount(App, {
    global: {
      plugins: [
        router
      ],
      stubs: [
        'RouterView',
        'RouterLink',
        'HelloWorld'
      ],
    },
  })

  it('App is isVisible', () => {
    // 透過 isVisible() 可以確認元件是否被渲染
    expect(wrapper.isVisible()).toBe(true)
  })

  it('now location is home', () => {
    const route = routers.find((r) => r.path === '/')
    expect(wrapper.vm.$route.name).toBe(route.name)
  })
})