import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import { setupAntd } from '@/plugins'
import App from './App.vue'

const app = createApp(App)

setupAntd(app)
app
  .use(router)
  .use(createPinia())
  .mount('#app')
