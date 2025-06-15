<template>
  <div class="animate-fade-in">
    <!-- Hero Section -->
    <section class="w-full bg-gradient-to-r from-primary-light to-primary-dark dark:from-primary-dark dark:to-primary-light text-white py-16 sm:py-24 transition-colors duration-300">
      <div class="w-full px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl sm:text-5xl font-bold mb-6 transition-colors duration-300">
            {{ t('home.title') }}
          </h1>
          <p class="text-xl sm:text-2xl mb-8 text-gray-100 transition-colors duration-300">
            {{ t('home.subtitle') }}
          </p>
          <router-link
            :to="{ name: 'Courses' }"
            class="inline-block bg-white text-primary-light dark:bg-gray-800 dark:text-primary-dark px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            {{ t('home.startLearning') }}
          </router-link>
        </div>
      </div>
    </section>

    <!-- Popular Courses Section -->
    <section class="w-full py-16 sm:py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div class="w-full px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-3xl sm:text-4xl font-bold mb-12 text-gray-900 dark:text-white text-center transition-colors duration-300">
            {{ t('home.popularCourses') }}
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="(course, index) in popularCourses"
              :key="course.id"
              class="bg-white dark:bg-card-dark rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 animate-slide-in"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <div class="relative h-48">
                <img
                  :src="course.image"
                  :alt="course.title"
                  class="w-full h-full object-cover"
                />
                <div class="absolute top-4 right-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm font-medium text-primary-light dark:text-primary-dark transition-colors duration-300">
                  {{ course.level }}
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white transition-colors duration-300">
                  {{ course.title }}
                </h3>
                <p class="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">
                  {{ course.description }}
                </p>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                    {{ course.duration }}
                  </span>
                  <router-link
                    :to="{ name: 'CourseDetail', params: { id: course.id }}"
                    class="text-primary-light dark:text-primary-dark hover:text-primary-dark dark:hover:text-primary-light font-medium transition-colors duration-300"
                  >
                    Learn More →
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="w-full py-16 sm:py-24 bg-white dark:bg-card-dark transition-colors duration-300">
      <div class="w-full px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-3xl sm:text-4xl font-bold mb-12 text-gray-900 dark:text-white text-center transition-colors duration-300">
            {{ t('home.whyChoose') }}
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="(feature, index) in features"
              :key="feature.title"
              class="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 animate-slide-in"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <div class="w-16 h-16 mx-auto mb-4 text-primary-light dark:text-primary-dark transition-colors duration-300">
                <component :is="feature.icon" class="w-full h-full" />
              </div>
              <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white transition-colors duration-300">
                {{ feature.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCourseStore } from '../stores/course'
import { useI18n } from 'vue-i18n'
import { AcademicCapIcon, UserGroupIcon, ClockIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const courseStore = useCourseStore()
const { t, locale } = useI18n()

const popularCourses = computed(() => {
  return courseStore.getPopularCourses.map(course => ({
    ...course,
    title: locale.value === 'en' ? course.title_en : course.title,
    description: locale.value === 'en' ? course.description_en : course.description
  }))
})

const features = computed(() => [
  {
    title: t('home.features.interactive.title'),
    description: t('home.features.interactive.description'),
    icon: AcademicCapIcon
  },
  {
    title: t('home.features.experts.title'),
    description: t('home.features.experts.description'),
    icon: UserGroupIcon
  },
  {
    title: t('home.features.flexible.title'),
    description: t('home.features.flexible.description'),
    icon: ClockIcon
  }
])
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