import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import '@/assets/tailwind.css'
import pinia from '@/stores'

const isDev = import.meta.env.MODE === "development";

const app = createApp(App)

app.use(pinia).use(router)
app.provide('isDev', isDev)
app.mount('#app')
