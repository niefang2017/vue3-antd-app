import 'virtual:uno.css'
import './assets/main.css'
import './style.css'
import { createApp } from 'vue'
import VueI18n from './languages'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(VueI18n)
// app.use(createPinia())
app.use(router)

app.mount('#app')
