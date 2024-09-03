import 'virtual:uno.css'
import './assets/main.css'
import './style.css'
// import iconsPicker from '../lib/vue3-antd-icons-picker.es'
// import '../lib/style.css'
import 'virtual:svg-icons-register'
import '../node_modules/vue3-antd-icons-picker/dist/style.css'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import iconsPicker from 'vue3-antd-icons-picker'

import permission from './directives/permission'
const directives = [permission]

import App from './App.vue'
import VueI18n from './languages'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(VueI18n)
// 注册指令
directives.forEach((directive) => {
  app.directive(directive.name, directive)
})

// app.use(createPinia())
app.use(router)
app.use(iconsPicker)

app.mount('#app')
