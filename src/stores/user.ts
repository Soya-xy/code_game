import { acceptHMRUpdate, defineStore } from 'pinia'
import { userInfo } from './../api/index'

export const useUserStore = defineStore('user', () => {
  const user = ref<any>(JSON.parse(localStorage.getItem('user')!))
  function setUser(index: any) {
    user.value = index
    localStorage.setItem('user', JSON.stringify(index))
  }

  function getUser() {
    userInfo().then((res) => {
      if (res.res !== 0)
        setUser(res.obj)
    })
  }
  return {
    user,
    setUser,
    getUser,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTabbarStore, import.meta.hot))
