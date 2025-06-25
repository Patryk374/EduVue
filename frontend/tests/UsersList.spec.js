import { describe, it, expect, vi } from "vitest"
import { mount } from '@vue/test-utils'
import UsersList from '../src/canvas/components/UsersList.vue'

// Test 2: UsersList renderuje listę użytkowników

describe('UsersList.vue', () => {
  it('renders provided users', () => {
    const users = [
      { id: 1, name: 'John', short_name: 'J' },
      { id: 2, name: 'Jane', short_name: 'Ja' }
    ]
    const wrapper = mount(UsersList, { props: { users } })
    expect(wrapper.findAll('li')).toHaveLength(users.length)
  })

  it('handles empty user list', () => {
    const wrapper = mount(UsersList, { props: { users: [] } })
    expect(wrapper.findAll('li')).toHaveLength(0)
  })
})
