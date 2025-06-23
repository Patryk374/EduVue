import { describe, it, expect, vi } from "vitest"
import { setActivePinia, createPinia } from 'pinia'
import { useThemeStore } from '../src/stores/theme'
import { nextTick } from 'vue'

describe('theme store', () => {
  // Test 8: toggling light/dark theme
  it('toggles theme state', async () => {
    localStorage.setItem('theme', 'light')
    setActivePinia(createPinia())
    const store = useThemeStore()

    expect(store.isDark).toBe(false)
    store.toggleTheme()
    await nextTick()
    expect(store.isDark).toBe(true)
    expect(localStorage.getItem('theme')).toBe('dark')
  })
})
