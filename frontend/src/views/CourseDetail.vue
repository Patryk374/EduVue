<template>
  <div class="animate-fade-in">
    <!-- Nagłówek kursu -->
    <div class="w-full bg-[var(--accent-color)] text-white py-16 sm:py-24 transition-colors duration-300">
      <div class="w-full px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <router-link
            :to="{ name: 'Courses' }"
            class="inline-flex items-center text-gray-100 hover:text-white mb-6 transition-colors duration-300"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Courses
          </router-link>

          <div v-if="loading" class="flex justify-center items-center min-h-[60vh]">
            <div class="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
          </div>

          <div v-else-if="error" class="text-center py-12">
            <p class="text-red-200 mb-4">{{ error }}</p>
            <router-link
              :to="{ name: 'Courses' }"
              class="text-white hover:text-gray-200 underline transition-colors duration-300"
            >
              Return to Courses
            </router-link>
          </div>

          <div v-else-if="translatedCourse" class="space-y-6">
            <div class="flex items-center space-x-4">
              <span class="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                {{ translatedCourse.level }}
              </span>
              <span class="text-gray-200">{{ translatedCourse.duration }} min</span>
            </div>
            <h1 class="text-4xl sm:text-5xl font-bold">{{ translatedCourse.title }}</h1>
            <p class="text-xl text-gray-100">{{ translatedCourse.description }}</p>
            <button
                class="bg-white text-[var(--accent-color)] dark:bg-white dark:text-[var(--accent-color)] hover:brightness-110 px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              {{ t('course.start') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Szczegóły kursu -->
    <div v-if="translatedCourse" class="w-full bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300">
      <div class="w-full px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Lista lekcji -->
            <div class="lg:col-span-2">
              <div class="bg-white dark:bg-card-dark rounded-xl shadow-lg p-6 transition-colors duration-300">
                <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-300">
                  {{ t('course.lessons') }}
                </h2>
                <div class="space-y-4">
                  <div
                    v-for="lesson in translatedCourse.lessons"
                    :key="lesson.id"
                    class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                  >
                    <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white transition-colors duration-300">
                      {{ lesson.title }}
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                      {{ lesson.duration }} min
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Informacje o kursie -->
            <div class="space-y-6">
              <div class="bg-white dark:bg-card-dark rounded-xl shadow-lg p-6 transition-colors duration-300">
                <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
                  {{ t('course.details') }}
                </h3>
                <div class="space-y-4">
                  <div class="flex items-center text-gray-600 dark:text-gray-300 transition-colors duration-300">
                    <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{{ t('course.duration') }}: {{ translatedCourse.duration }} min</span>
                  </div>
                  <div class="flex items-center text-gray-600 dark:text-gray-300 transition-colors duration-300">
                    <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{{ t('course.level') }}: {{ t('courses.levels.' + translatedCourse.level) }}</span>
                  </div>
                  <div class="flex items-center text-gray-600 dark:text-gray-300 transition-colors duration-300">
                    <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span>{{ t('courses.categories.' + translatedCourse.category) }}</span>
                  </div>
                </div>
              </div>

              <div class="bg-white dark:bg-card-dark rounded-xl shadow-lg p-6 transition-colors duration-300">
                <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
                  What You'll Learn
                </h3>
                <ul class="space-y-3">
                  <li
                    v-for="(item, index) in translatedCourse.learningObjectives"
                    :key="index"
                    class="flex items-start text-gray-600 dark:text-gray-300 transition-colors duration-300"
                  >
                    <svg class="w-5 h-5 mr-3 mt-1 text-primary-light dark:text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCourseStore } from '../stores/course'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const route = useRoute()
const courseStore = useCourseStore()
const { t, locale } = useI18n()

const course = ref(null)
const loading = ref(true)
const error = ref(null)

const translatedCourse = computed(() => {
  if (!course.value) return null
  return {
    ...course.value,
    title: locale.value === 'en' ? course.value.title_en : course.value.title,
    description: locale.value === 'en' ? course.value.description_en : course.value.description,
    lessons: course.value.lessons.map(lesson => ({
      ...lesson,
      title: locale.value === 'en' ? lesson.title_en : lesson.title
    }))
  }
})

onMounted(async () => {
  try {
    loading.value = true
    await courseStore.fetchCourses()
    course.value = courseStore.courses.find(c => c.id === route.params.id)
    if (!course.value) {
      error.value = 'Course not found'
    }
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})

// Aktualizuj tłumaczenia gdy zmienia się język
watch(locale, () => {
  // Tłumaczenia są już zaktualizowane przez computed property
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