import { describe, it, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useThemeStore } from '../src/stores/theme'

describe('theme store', () => {
  // Test checks that toggling theme flips isDark state
  it('toggleTheme switches value', () => {
    setActivePinia(createPinia())
    const store = useThemeStore()
    expect(store.isDark).toBe(false)
    store.toggleTheme()
    expect(store.isDark).toBe(true)
  })
})
