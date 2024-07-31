// import { get, post, del } from '../request'

/**
 * @description: 获取员工列表
 * @param {*} params
 * @return {*}
 */
export const getEmployeeList = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('getUserRoleList模拟数据', params)
      const data = []
      for (let i = 0; i < 10; i++) {
        data.push({
          key: i.toString(),
          id: i.toString(),
          name: `员工xx-${i}`,
          mobile: '18123456789',
          roleList: [1, 2],
          status: i % 2 === 0 ? 1 : 0,
          department: `部门` + i
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
    // return post('/api/getEmployeeList', params)
  })
}
/**
 * @description: 删除员工
 * @param {*} params
 * @return {*}
 */
export const delEmployeeById = (params) => {
  return new Promise((resolve) => {
    console.log('delRoleById删除角色', params)
    setTimeout(() => {
      resolve({
        code: 1,
        data: true
      })
    }, 1000)
  })
  // return del('/api/delEmployeeById', params)
}

/**
 * @description: 启用/禁用
 * @param {*} params
 * @return {*}
 */
export const changeEmployeeStatus = (params) => {
  return new Promise((resolve) => {
    console.log('启用/禁用', params)
    setTimeout(() => {
      resolve({
        code: 1,
        data: true
      })
    }, 1000)
  })
  // return post('/api/changeEmployeeStatus', params)
}
