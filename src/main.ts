import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets'
import vuetify from '~/plugins/vuetify'

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(vuetify)
app.mount(document.body)
