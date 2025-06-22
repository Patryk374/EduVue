<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
    <!-- Nawigacja -->
    <nav class="bg-white dark:bg-card-dark shadow-md w-full sticky top-0 z-50 transition-colors duration-300">
      <div class="w-full px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link :to="{ name: 'Home' }" class="flex-shrink-0 flex items-center">
              <span class="text-2xl font-bold text-[var(--accent-color)] transition-colors duration-300">EduVue</span>
            </router-link>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link
                v-for="item in navigationItems"
                :key="item.name"
                :to="item.to"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200"
                :class="{ 'text-primary-light dark:text-primary-dark': $route.name === item.name }"
              >
                {{ item.name }}
              </router-link>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <!-- Przełącznik motywu -->
            <button
              @click="themeStore.toggleTheme"
              class="p-2 rounded-lg transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 light:hover:bg-gray-700"
              :title="themeStore.isDark ? 'Przełącz na jasny motyw' : 'Przełącz na ciemny motyw'"
            >
              <SunIcon v-if="themeStore.isDark" class="h-6 w-6 text-yellow-400" />
              <MoonIcon v-else class="h-6 w-6 text-gray-600" />
            </button>

            <select
                v-model="selectedColor"
                @change="changeColor"
                class="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-card-dark text-sm text-gray-800 dark:text-gray-200"
                title="Wybierz kolor motywu"
            >
              <option value="indigo">indigo</option>
              <option value="blue">blue</option>
              <option value="green">green</option>
              <option value="orange">orange</option>

            </select>


            <button
              @click="toggleLanguage"
              class="p-2 rounded-lg text-gray-600 dark:text-white transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              :title="locale === 'pl' ? 'Switch to English' : 'Przełącz na polski'"
            >
              <span class="text-sm font-medium">{{ locale === 'pl' ? 'EN' : 'PL' }}</span>
            </button>

            <!-- Menu mobilne -->
            <div class="sm:hidden">
              <button
                @click="isMobileMenuOpen = !isMobileMenuOpen"
                class="p-2 rounded-lg text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    v-if="!isMobileMenuOpen"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    v-else
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Menu mobilne -->
      <div
        v-show="isMobileMenuOpen"
        class="sm:hidden animate-slide-in bg-white dark:bg-card-dark transition-colors duration-300"
      >
        <div class="pt-2 pb-3 space-y-1">
          <router-link
            v-for="item in navigationItems"
            :key="item.name"
            :to="item.to"
            class="block px-3 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200"
            :class="{ 'text-primary-light dark:text-primary-dark': $route.name === item.name }"
            @click="isMobileMenuOpen = false"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Główna zawartość -->
    <main class="w-full px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-4rem)]">
      <router-view v-slot="{ Component }">
        <transition
          name="fade"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Stopka -->
    <footer class="bg-white dark:bg-card-dark shadow-inner transition-colors duration-300">
      <div class="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div class="text-center text-gray-500 dark:text-gray-400">
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '../stores/theme'

const router = useRouter()
const { locale, t } = useI18n()
const themeStore = useThemeStore()
const isMobileMenuOpen = ref(false)

const navigationItems = ref([
  { name: t('nav.home'), to: { name: 'Home' } },
  { name: t('nav.courses'), to: { name: 'Courses' } }
])

// Aktualizuj navigationItems gdy zmienia się język
watch(locale, () => {
  navigationItems.value = [
    { name: t('nav.home'), to: { name: 'Home' } },
    { name: t('nav.courses'), to: { name: 'Courses' } }
  ]
})

const toggleTheme = () => {
  themeStore.toggleTheme()
}

const toggleLanguage = () => {
  locale.value = locale.value === 'pl' ? 'en' : 'pl'
}

const selectedColor = ref('indigo')

const changeColor = () => {
  document.documentElement.setAttribute('data-color', selectedColor.value)
  localStorage.setItem('theme-color', selectedColor.value)
}

onMounted(() => {
  const saved = localStorage.getItem('theme-color')
  selectedColor.value = saved || 'indigo'
  document.documentElement.setAttribute('data-color', selectedColor.value)
})

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animate-slide-in {
  animation: slideIn 0.3s ease-out forwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 