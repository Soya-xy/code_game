import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref<any>({})
  function setUser(index: any) {
    user.value = index
  }
  return {
    user,
    setUser,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTabbarStore, import.meta.hot))
