import { createApp } from 'vue'

const App = {
  data() {
    return { courses: [] }
  },
  async mounted() {
    const res = await fetch('/courses')
    this.courses = await res.json()
  },
  template: `
    <h1>Kursy</h1>
    <ul>
      <li v-for="c in courses" :key="c.id">
        <strong>{{ c.nazwa }}</strong> - {{ c.dlugosc_trwania }} - {{ c.sugerowany_przedzial_wiekowy }}<br/>
        {{ c.szczegoly }}
      </li>
    </ul>
  `
}

createApp(App).mount('#app')

