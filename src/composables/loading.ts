import { acceptHMRUpdate, defineStore } from 'pinia'

export const useLoading = defineStore('loading', () => {
  const loading = ref(false)

  function setLoading(index: boolean) {
    loading.value = index
  }
  return {
    loading,
    setLoading,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTabbarStore, import.meta.hot))
