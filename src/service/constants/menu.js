// import { get, post, del } from '../request'
import { routers } from '@/router/modules/default'
const whiteNams = ['login', 'error', 'noAccess']
/**
 * @description: 登录
 * @param {*} params
 * @return {*}
 */
export const getMenuList = (params) => {
  return new Promise((resolve) => {
    console.log('模拟数据', params, routers)
    setTimeout(() => {
      resolve({
        code: 1,
        data: routers[0].children.filter((item, index) => {
          item.status = index % 2 === 0 ? 1 : 0
          return !whiteNams.includes(item.name)
        })
      })
    }, 1000)
  })
  // return post('/api/login', params)
}
/**
 * @description: 登录
 * @param {*} params
 * @return {*}
 */
export const delMenuById = (params) => {
  return new Promise((resolve) => {
    console.log('delMenu模拟数据', params)
    setTimeout(() => {
      resolve({
        code: 1,
        data: true
      })
    }, 1000)
  })
  // return post('/api/login', params)
}
