<template>
  <div class="animate-fade-in">
    <!-- Nagłówek -->
    <div class="w-full bg-[var(--accent-color)] text-white py-16 sm:py-24 transition-colors duration-300">
      <div class="w-full px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl sm:text-5xl font-bold mb-6">{{ t('courses.title') }}</h1>
          <p class="text-xl sm:text-2xl mb-8 text-gray-100">{{ t('courses.subtitle') }}</p>
        </div>
      </div>
    </div>

    <!-- Filtry i lista kursów -->
    <div class="w-full bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300">
      <div class="w-full px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <!-- Filtry -->
          <div class="mb-8 flex flex-col sm:flex-row gap-4">
            <div class="flex-1">
              <input
                  v-model="searchQuery"
                  type="text"
                  :placeholder="t('courses.search')"
                  class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--accent-color)] focus:border-transparent"
              />
            </div>
            <div class="w-full sm:w-48">
              <select
                  v-model="selectedCategory"
                  class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--accent-color)] focus:border-transparent"
              >
                <option value="">{{ t('courses.filter') }}</option>
                <option value="programming">{{ t('courses.categories.programming') }}</option>
                <option value="web">{{ t('courses.categories.web') }}</option>
              </select>
            </div>
          </div>

          <!-- Lista kursów -->
          <div v-if="loading" class="flex justify-center items-center min-h-[60vh]">
            <div class="animate-spin rounded-full h-12 w-12 border-4 border-[var(--accent-color)] border-t-transparent"></div>
          </div>

          <div v-else-if="error" class="text-center py-12">
            <p class="text-red-500 dark:text-red-400 mb-4">{{ error }}</p>
            <router-link
                :to="{ name: 'Home' }"
                class="text-[var(--accent-color)] hover:underline"
            >
              {{ t('courses.returnToHome') }}
            </router-link>
          </div>

          <div v-else>
            <div v-if="filteredCourses.length === 0" class="text-center py-12">
              <p class="text-gray-600 dark:text-gray-300 mb-4">{{ t('courses.noCourses') }}</p>
              <button
                  @click="clearFilters"
                  class="text-[var(--accent-color)] hover:underline"
              >
                {{ t('courses.clearFilters') }}
              </button>
            </div>

            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div
                  v-for="(course, index) in filteredCourses"
                  :key="course.id"
                  class="bg-white dark:bg-card-dark rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 animate-slide-in"
                  :style="{ animationDelay: `${index * 0.1}s` }"
              >
                <div class="relative h-48">
                  <img :src="course.image" :alt="course.title" class="w-full h-full object-cover" />
                  <div class="absolute top-4 right-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm font-medium text-[var(--accent-color)]">
                    {{ t('courses.levels.' + course.level) }}
                  </div>
                </div>
                <div class="p-6">
                  <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{{ course.title }}</h3>
                  <p class="text-gray-600 dark:text-gray-300 mb-4">{{ course.description }}</p>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-500 dark:text-gray-400">{{ course.duration }}</span>
                    <router-link
                        :to="{ name: 'CourseDetail', params: { id: course.id }}"
                        class="text-[var(--accent-color)] hover:underline font-medium transition"
                    >
                      {{ t('course.start') }}
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useCourseStore } from '../stores/course'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const courseStore = useCourseStore()
const { t, locale } = useI18n()

const searchQuery = ref('')
const selectedCategory = ref('')
const loading = ref(true)
const error = ref(null)

const filteredCourses = computed(() => {
  return courseStore.courses
      .filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesCategory = !selectedCategory.value || course.category === selectedCategory.value
        return matchesSearch && matchesCategory
      })
      .map(course => ({
        ...course,
        title: locale.value === 'en' ? course.title_en : course.title,
        description: locale.value === 'en' ? course.description_en : course.description,
        lessons: course.lessons.map(lesson => ({
          ...lesson,
          title: locale.value === 'en' ? lesson.title_en : lesson.title
        }))
      }))
})

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
}

onMounted(async () => {
  try {
    await courseStore.fetchCourses()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})

watch(locale, () => {
  // Kategorie są już zaktualizowane przez computed property
})
</script>

<style scoped>
.animate-slide-in {
  animation: slideIn 0.5s ease-out forwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
