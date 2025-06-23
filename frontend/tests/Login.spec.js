import { describe, it, expect, vi } from "vitest"
import { mount, flushPromises } from '@vue/test-utils'

vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: vi.fn(() => Promise.resolve())
}))

vi.mock('../src/firebase', () => ({
  auth: {}
}))

import Login from '../src/views/Login.vue'
import { signInWithEmailAndPassword } from 'firebase/auth'

// Test 9: Login form calls Firebase auth and redirects

describe('Login.vue', () => {
  it('logs in user and redirects', async () => {
    const push = vi.fn()
    const wrapper = mount(Login, {
      global: { mocks: { $router: { push } } }
    })

    await wrapper.find('input[type="email"]').setValue('a@b.com')
    await wrapper.find('input[type="password"]').setValue('secret')
    await wrapper.find('button').trigger('click')
    await flushPromises()

    expect(signInWithEmailAndPassword).toHaveBeenCalled()
    expect(push).toHaveBeenCalledWith('/')
  })
})
