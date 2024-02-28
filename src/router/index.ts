import { createRouter, createWebHashHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import NProgress from 'nprogress'
import pages from 'virtual:generated-pages'

const router = createRouter({
  history: createWebHashHistory(),
  routes: setupLayouts(pages),
})

router.beforeEach((to, from) => {
  if (to.path !== from.path)
    NProgress.start()
  // const token = localStorage.getItem('token')
  // if (!token
  //   // ❗️ 避免无限重定向
  //   && to.path !== '/login'
  // ) {
  //   return {
  //     path: '/login',
  //   }
  // }
})
router.afterEach(() => {
  NProgress.done()
})
export default router
