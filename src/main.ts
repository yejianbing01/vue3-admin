import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/router'
import TDesign from 'tdesign-vue-next';
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import 'tdesign-vue-next/dist/reset.css';
import 'tdesign-vue-next/es/style/index.css';

const pinia = createPinia()
  .use(piniaPluginPersistedstate)
const app = createApp(App)

app.use(router)
app.use(TDesign);
app.use(pinia)

app.mount('#app')
