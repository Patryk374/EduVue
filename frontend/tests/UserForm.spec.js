import { describe, it, expect, vi } from "vitest"
import { mount, flushPromises } from '@vue/test-utils'
import UserForm from '../src/canvas/components/UserForm.vue'

// Test 3: UserForm emituje zdarzenie submit po wysłaniu danych

describe('UserForm.vue', () => {
  it('submits user data and emits event', async () => {
    const axiosMock = { post: vi.fn(() => Promise.resolve({ data: { id: 1 } })) }
    window.alert = vi.fn()
    const wrapper = mount(UserForm, {
      global: { mocks: { $axios: axiosMock } }
    })

    await wrapper.find('input[placeholder="Pełne imię i nazwisko"]').setValue('John Doe')
    await wrapper.find('input[placeholder="Short name"]').setValue('JD')
    await wrapper.find('input[placeholder="Sortable name"]').setValue('Doe, John')
    await wrapper.find('input[placeholder="Login (unique_id)"]').setValue('john')
    await wrapper.find('input[placeholder="Email"]').setValue('john@example.com')
    await wrapper.find('button').trigger('click')
    await flushPromises()

    expect(axiosMock.post).toHaveBeenCalled()
    expect(wrapper.emitted('user-created')).toBeTruthy()
  })
})
