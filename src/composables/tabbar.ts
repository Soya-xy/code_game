import { acceptHMRUpdate, defineStore } from 'pinia'

export const useTabbarStore = defineStore('tabbar', () => {
  const active = ref(0)
  function setActive(index: number) {
    active.value = index
  }
  return {
    active,
    setActive,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTabbarStore, import.meta.hot))
