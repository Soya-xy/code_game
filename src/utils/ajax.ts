import { createAlova } from 'alova'
import GlobalFetch from 'alova/GlobalFetch'
import VueHook from 'alova/vue'
import { axiosRequestAdapter } from '@alova/adapter-axios'

// import { createDiscreteApi } from 'naive-ui'
// import router from '~/modules/router'
//
const baseURL = '/lottery-backend/api'

// const token = localStorage.getItem('token')
// const { message } = createDiscreteApi(['message'])

export function alovaInstance(base = baseURL) {
  return createAlova({
    baseURL: `${base}`,
    statesHook: VueHook,
    requestAdapter: GlobalFetch(),
    beforeRequest({ config }) {
      // config.headers.Authorization = `Bearer ${token}`
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    },
    responded: {
      onSuccess: async (response) => {
        // if (response.status === 401) {
        //   if (token)
        //     message.error('登录过期，请重新登录')
        //   setTimeout(() => {
        //     router.replace('/login')
        //   }, 1500)
        //   return
        // }
        const json = await response.json()
        return json
      },
    },
  })
}

// upload alova instance
export const uploadAlova = createAlova({
  baseURL,
  statesHook: VueHook,
  requestAdapter: axiosRequestAdapter(),
})
