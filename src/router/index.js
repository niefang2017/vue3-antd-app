/*
 * @Author: 聂芳 nie4161204@qq.com
 * @Date: 2022-10-08 15:18:47
 * @LastEditors: 聂芳 nie4161204@qq.com
 * @LastEditTime: 2023-03-02 11:27:03
 * @FilePath: /vue3-frog-admin/src/router/index.js
 * @Description: 路由首页
 *
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import { routers } from './modules/default'
import useStore from 'store'
const router = createRouter({
  history: createWebHashHistory(),
  base: '/',
  routes: [...routers]
})
router.beforeEach((to, from, next) => {
  next()
  // const { user } = useStore()
  // if (to.name !== 'login' && !user.userInfo.token && to.meta.requiresAuth) next({ name: 'login' })
  // else next()
})
// router.afterEach(async (to, from) => {
//   // console.log("统计")
// })

export default router
