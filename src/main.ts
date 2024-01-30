import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets'
import vuetify, { i18n } from '~/plugins/vuetify'

const pinia = createPinia()
const app = createApp(App)
app.use(router)
  .use(pinia)
  .use(vuetify)
  .use(i18n)
  .mount(document.body)
