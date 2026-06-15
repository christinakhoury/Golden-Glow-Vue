import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css' 

import AOS from "aos";
import "aos/dist/aos.css";

import "@fortawesome/fontawesome-free/css/all.min.css";
createApp(App).use(router).mount('#app')


AOS.init();