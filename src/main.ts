import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import App from './App.vue'
import router from './router'
import './assets'
import vuetify, { i18n } from '~/plugins/vuetify'
import Clipboard from 'v-clipboard'

// Import the CSS or use your own!
import 'vue-toastification/dist/index.css'

const pinia = createPinia()
const app = createApp(App)
app.use(router)
  .use(pinia)
  .use(vuetify)
  .use(i18n)
  .use(Clipboard)
  .use(Toast, {
    position: 'top-center',
  })
  .mount(document.body)
