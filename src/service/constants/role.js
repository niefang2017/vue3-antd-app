// import { get, post, del } from '../request'

/**
 * @description: 获取角色列表
 * @param {*} params
 * @return {*}
 */
export const getUserRoleList = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('getUserRoleList模拟数据', params)
      const data = []
      for (let i = 0; i < 10; i++) {
        data.push({
          key: i.toString(),
          name: `超级管理员${i}`,
          num: 1 + i,
          id: i.toString(),
          desc: `${i}超级管理员描述超级管理员描述超级管理员描述超级管理员描述述超级管理员描述111`
        })
      }
      resolve({
        code: 1,
        data: {
          list: data,
          total: 3
        }
      })
    }, 1000)
    // return post('/api/getUserRoleList', params)
  })
}
/**
 * @description: 删除角色
 * @param {*} params
 * @return {*}
 */
export const delRoleById = (params) => {
  return new Promise((resolve) => {
    console.log('delRoleById删除角色', params)
    setTimeout(() => {
      resolve({
        code: 1,
        data: true
      })
    }, 1000)
  })
  // return post('/api/login', params)
}

/**
 * @description: 启用/禁用
 * @param {*} params
 * @return {*}
 */
export const changeRoleStatus = (params) => {
  return new Promise((resolve) => {
    console.log('启用/禁用', params)
    setTimeout(() => {
      resolve({
        code: 1,
        data: true
      })
    }, 1000)
  })
  // return post('/api/changeRoleStatus', params)
}
