import { describe, it, expect, vi } from "vitest"
import { mount, flushPromises } from '@vue/test-utils'
import CanvasDashboard from '../src/canvas/CanvasDashboard.vue'
import AccountInfo from '../src/canvas/components/AccountInfo.vue'
import UsersList from '../src/canvas/components/UsersList.vue'
import UserForm from '../src/canvas/components/UserForm.vue'
import UserDetail from '../src/canvas/components/UserDetail.vue'

// Test 1: CanvasDashboard renders subcomponents with data

describe('CanvasDashboard.vue', () => {
  it('renders dashboard subcomponents with fetched data', async () => {
    const account = { id: 1, name: 'John' }
    const users = [{ id: 1, name: 'Alice', short_name: 'A' }]
    const axiosMock = {
      get: vi.fn((url) => {
        if (url === '/canvas/user/self') return Promise.resolve({ data: account })
        if (url === '/canvas/users') return Promise.resolve({ data: users })
        return Promise.resolve({ data: {} })
      })
    }

    const wrapper = mount(CanvasDashboard, {
      global: { mocks: { $axios: axiosMock } }
    })

    await flushPromises()

    expect(wrapper.findComponent(AccountInfo).props('account')).toEqual(account)
    expect(wrapper.findComponent(UsersList).props('users')).toEqual(users)
    expect(wrapper.findComponent(UserForm).exists()).toBe(true)
    expect(wrapper.findComponent(UserDetail).exists()).toBe(true)
  })

  it('handles missing data gracefully', async () => {
    const axiosMock = {
      get: vi.fn(() => Promise.reject())
    }

    const wrapper = mount(CanvasDashboard, {
      global: { mocks: { $axios: axiosMock } }
    })

    await flushPromises()

    expect(wrapper.findComponent(AccountInfo).text()).toContain('Ładowanie')
    expect(wrapper.findComponent(UsersList).props('users')).toEqual([])
  })
})
