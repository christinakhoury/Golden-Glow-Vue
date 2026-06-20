import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import { createPinia } from 'pinia'

import './assets/main.css'

import AOS from 'aos'
import 'aos/dist/aos.css'

import '@fortawesome/fontawesome-free/css/all.min.css'

const app = createApp(App)

app.use(router)
app.use(createPinia())

app.mount('#app')


AOS.init({
  once: true,
  duration: 800,
  easing: 'ease-out'
})