import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(localStorage.getItem('theme') === 'dark')

  // Funkcja do przełączania motywu
  function toggleTheme() {
    isDark.value = !isDark.value
  }

  // Obserwuj zmiany motywu i zapisuj do localStorage
  watch(isDark, (newValue) => {
    localStorage.setItem('theme', newValue ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', newValue)
  }, { immediate: true })

  return {
    isDark,
    toggleTheme
  }
}) 