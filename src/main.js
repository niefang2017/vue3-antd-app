import 'virtual:uno.css'
import './assets/main.css'
import './style.css'
import '../node_modules/vue3-antd-icons-picker/dist/style.css'
// import vuePicker from '../lib/vue3-antd-icons-picker.es'
// import '../lib/style.css'
import 'virtual:svg-icons-register'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import vuePicker from 'vue3-antd-icons-picker'

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
app.use(vuePicker)
// 注册指令
directives.forEach((directive) => {
  app.directive(directive.name, directive)
})

// app.use(createPinia())
app.use(router)

app.mount('#app')
