<template>
  <h1>Kursy</h1>
  <ul>
    <li v-for="c in courses" :key="c.id">
      <strong>{{ c.nazwa }}</strong> - {{ c.dlugosc_trwania }} - {{ c.sugerowany_przedzial_wiekowy }}<br />
      {{ c.szczegoly }}
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const courses = ref([])

onMounted(async () => {
  const res = await fetch('/courses')
  courses.value = await res.json()
})
</script>
