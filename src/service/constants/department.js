// import { get, post, del } from '../request'

/**
 * @description: 获取部门列表
 * @param {*} params
 * @return {*}
 */
export const getDepartmentList = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('getUserRoleList模拟数据', params)
      const data = [
        {
          key: 1,
          name: '部门A',
          num: 60,
          isRoot: true,
          children: [
            {
              key: 11,
              name: '子部门a-a',
              num: 42
            },
            {
              key: 12,
              name: '子部门a-b',
              num: 30,
              children: [
                {
                  key: 121,
                  name: '孙子部门a-b-a',
                  num: 16
                }
              ]
            },
            {
              key: 13,
              name: '子部门a-c',
              num: 72,
              children: [
                {
                  key: 131,
                  name: '孙子部门a-c-a',
                  num: 42,
                  children: [
                    {
                      key: 1311,
                      name: 'aca-a',
                      num: 25
                    },
                    {
                      key: 1312,
                      name: 'aca-b',
                      num: 18
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          key: 2,
          name: '部门2',
          num: 32,
          isRoot: true,
          children: [
            {
              key: 21,
              name: '子部门2-a',
              num: 20
            },
            {
              key: 22,
              name: '子部门2-b',
              num: 12
            }
          ]
        }
      ]
      resolve({
        code: 1,
        data: {
          list: data,
          total: 3
        }
      })
    }, 1000)
    // return post('/api/getDepartmentList', params)
  })
}
/**
 * @description: 删除部门
 * @param {*} params
 * @return {*}
 */
export const delDepartmentById = (params) => {
  return new Promise((resolve) => {
    console.log('delDepartment删除部门', params)
    setTimeout(() => {
      resolve({
        code: 1,
        data: true
      })
    }, 1000)
  })
  // return del('/api/delDepartmentById', params)
}
