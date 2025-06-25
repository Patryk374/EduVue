import { describe, it, expect, vi } from "vitest"
import { setActivePinia, createPinia } from 'pinia'
import { useCourseStore } from '../src/stores/course'

vi.mock('../src/firebase', () => ({ db: {} }))

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  getDocs: vi.fn(async () => ({
    docs: [
      { id: '1', data: () => ({ title: 'Course' }) }
    ]
  })),
  getFirestore: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn(),
  addDoc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  query: vi.fn(),
  where: vi.fn()
}))

// Test 7: metoda fetchCourses w course store aktualizuje stan

describe('course store', () => {
  it('fetchCourses populates courses', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const store = useCourseStore()
    await store.fetchCourses()
    expect(store.courses).toHaveLength(1)
    expect(store.courses[0].title).toBe('Course')
  })
})
