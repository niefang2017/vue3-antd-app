/*
 * @Author: 聂芳 nie4161204@qq.com
 * @Date: 2022-10-08 15:18:47
 * @LastEditors: 聂芳 nie4161204@qq.com
 * @LastEditTime: 2024-07-28 00:59:28
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
  if (to.name !== 'login' && !user.userInfo.token && to.meta.requiresAuth) next({ name: 'login' })
  else next()
})
// router.afterEach(async (to, from) => {
//   // console.log("统计")
// })

export default router
