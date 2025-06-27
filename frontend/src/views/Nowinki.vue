<template>
  <div class="px-8 py-6">
    <!-- Nagłówek -->
    <div class="bg-[var(--accent-color)] text-white rounded-lg p-6 text-center mb-8 transition-colors duration-300">
      <h1 class="text-3xl font-bold mb-2 transition-colors duration-300">
        📰 {{ t('news.title') }}
      </h1>
      <p class="text-gray-100 transition-colors duration-300">
        {{ t('news.subtitle') }}
      </p>
    </div>

    <!-- Lista artykułów -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
          v-for="article in articles"
          :key="article.objectID"
          class="bg-white dark:bg-card-dark rounded-lg shadow-md hover:shadow-lg p-6 space-y-2 transition-all"
      >
        <h2 class="text-lg font-semibold">
          <template v-if="article.url || article.story_url">
            <a
                :href="article.url || article.story_url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-[var(--accent-color)] hover:underline transition-colors duration-300"
            >
              {{ article.title || article.story_title }}
            </a>
          </template>
          <template v-else>
  <span class="text-gray-400 italic">
    {{ article.title || article.story_title }} (no link)
  </span>
          </template>

        </h2>
        <p class="text-sm text-gray-500">
          {{ new Date(article.created_at).toLocaleDateString() }}
        </p>
      </div>
    </div>

    <!-- Komunikat ładowania -->
    <p v-if="!articles.length" class="text-center mt-6 text-gray-500">
      {{ t('news.loading') }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const articles = ref([])

onMounted(async () => {
  try {
    const res = await fetch(
        "https://hn.algolia.com/api/v1/search_by_date?query=programming&tags=story"
    )
    const data = await res.json()
    articles.value = data.hits.slice(0, 9)
  } catch (err) {
    console.error("Błąd pobierania danych:", err)
  }
})
</script>
