import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import App from './App.vue'
import '@/styles/reset.less'
import '@/styles/global.less'
const app = createApp(App)

app.use(router).use(createPinia()).mount('#app')
