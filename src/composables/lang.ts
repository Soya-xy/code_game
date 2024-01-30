import { acceptHMRUpdate, defineStore } from 'pinia'
import { i18n } from '~/plugins/vuetify'

export const useLang = defineStore('lang', () => {
  const lang = ref(localStorage.getItem('lang') || 'en')

  function setLang(index: string | any) {
    i18n.global.locale.value = index
    lang.value = index
    localStorage.setItem('lang', index)
    location.reload()
  }

  return {
    lang,
    setLang,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTabbarStore, import.meta.hot))
