/*
 * @Author: 聂芳 nie4161204@qq.com
 * @Date: 2022-10-08 15:18:47
 * @LastEditors: 聂芳 nie4161204@qq.com
 * @LastEditTime: 2024-08-01 22:29:48
 * @FilePath: /vue3-antd-app/src/router/index.js
 * @Description: 路由首页
 *
 */
import useStore from 'store'
import { createRouter, createWebHashHistory } from 'vue-router'

import { routers } from './modules/default'
const router = createRouter({
  history: createWebHashHistory(),
  base: '/',
  routes: [...routers]
})
router.beforeEach((to, from, next) => {
  const { user } = useStore()
  const permissions = user?.permissions || []
  const hasPermission = permissions.some((permission) => permission.key === to.meta?.key)
  const isLoginPage = to.name === 'login'
  const isNoAccessPage = to.name === 'noAccess'
  if (to.meta?.requiresAuth) {
    if (!user.token && !isLoginPage) {
      next({ name: 'login' })
    } else if (user.token && !hasPermission && !isNoAccessPage) {
      user.clearAllTag()
      next({ name: 'noAccess' })
    } else {
      next()
    }
  } else {
    next()
  }
})
// router.afterEach(async (to, from) => {
//   // console.log("统计")
// })

export default router
