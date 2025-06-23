import { describe, it, expect, vi } from "vitest"
import { mount, flushPromises } from '@vue/test-utils'
import UserDetail from '../src/canvas/components/UserDetail.vue'

// Test 4: UserDetail fetches and displays user data

describe('UserDetail.vue', () => {
  it('fetches user and renders details', async () => {
    const user = { name: 'John', short_name: 'J', email: 'john@example.com' }
    const axiosMock = { get: vi.fn(() => Promise.resolve({ data: user })) }
    const wrapper = mount(UserDetail, {
      global: { mocks: { $axios: axiosMock } }
    })

    await wrapper.find('input').setValue('1')
    await wrapper.find('button').trigger('click')
    await flushPromises()

    expect(axiosMock.get).toHaveBeenCalled()
    expect(wrapper.text()).toContain(user.name)
    expect(wrapper.text()).toContain(user.email)
  })
})
