import {createApp} from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import {initializeFirebase} from './init-firebase'
import './assets/main.css'
import axios from 'axios'

// Inicjalizacja Firebase
initializeFirebase().then(() => {
    const app = createApp(App)

    app.use(createPinia())
    app.use(router)
    app.use(i18n)
    app.config.globalProperties.$axios = axios

    app.mount('#app')
})
