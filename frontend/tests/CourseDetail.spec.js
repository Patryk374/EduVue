import { describe, it, expect, vi } from "vitest"
import { mount, flushPromises } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { ref } from 'vue'
vi.mock('../src/firebase', () => ({ db: {} }))

vi.mock('vue-router', () => ({
  useRoute: () => ({ params: { id: '1' } }),
  useRouter: () => ({ push: vi.fn() })
}))

vi.mock('vue-i18n', () => ({
  useI18n: () => ({ t: (k) => k, locale: ref('en') })
}))

import { useCourseStore } from '../src/stores/course'
import CourseDetail from '../src/views/CourseDetail.vue'

// Test 5: CourseDetail renderuje kurs na podstawie parametru w trasie

describe('CourseDetail.vue', () => {
  it('displays course details for given id', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const store = useCourseStore()
    store.fetchCourses = vi.fn(async () => {
      store.courses = [{
        id: '1',
        title: 'Course',
        title_en: 'Course',
        description: 'Desc',
        description_en: 'Desc',
        lessons: []
      }]
    })

    const wrapper = mount(CourseDetail, {
      global: {
        plugins: [pinia],
        stubs: { 'router-link': true }
      }
    })

    await flushPromises()

    expect(store.fetchCourses).toHaveBeenCalled()
    expect(store.courses[0].title).toBe('Course')
    expect(wrapper.html()).toContain('Course')
  })
})
