import { describe, it, expect, vi } from "vitest"
import { mount, flushPromises } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { ref } from 'vue'

vi.mock('../src/firebase', () => ({ db: {} }))

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: vi.fn() })
}))

vi.mock('vue-i18n', () => ({
  useI18n: () => ({ t: (k) => k, locale: ref('en') })
}))

import { useCourseStore } from '../src/stores/course'
import Courses from '../src/views/Courses.vue'

// Test 6: Courses view loads and lists courses

describe('Courses.vue', () => {
  it('loads courses from store and renders them', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const store = useCourseStore()
    store.fetchCourses = vi.fn(async () => {
      store.courses = [
        { id: '1', title: 'Course 1', description: 'Desc', category: 'programming', duration: '1h', level: 'beginner', image: '', lessons: [] },
        { id: '2', title: 'Course 2', description: 'Desc2', category: 'programming', duration: '1h', level: 'beginner', image: '', lessons: [] }
      ]
    })

    const wrapper = mount(Courses, {
      global: {
        plugins: [pinia],
        stubs: { 'router-link': true }
      }
    })

    await flushPromises()

    expect(store.fetchCourses).toHaveBeenCalled()
    expect(store.courses).toHaveLength(2)
    expect(wrapper.findAll('router-link-stub').length).toBe(2)
  })
})
