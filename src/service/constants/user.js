// import { post,get } from '../request'
import { routers } from '@/router/modules/default'
import { flatTree } from '@/utils/menu'
/**
 * @description: 登录
 * @param {*} params
 * @return {*}
 */
export const login = (params) => {
  // return post('/auth/loginV2', params)
  console.log('login', params)
  return new Promise((resolve) => {
    const data = 'token'
    resolve({
      code: 1,
      data
      // data: {
      //   id: 1,
      //   username: 'admin',
      //   password: '123456',
      //   name: '管理员',
      //   avatar: 'https://www.antdv.com/assets/logo.1ef800a8.svg',
      //   token:
      //     'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYW5hZ2VyIiwiaWF0IjoxNzIyNDc2OTg1LCJleHAiOjE3MjQyMDQ5ODUsInJvbGVJZCI6IjE2NTQzOTE5ODgwODQ0MTI0MTgiLCJ1c2VyTmFtZSI6IuiBguiKsyIsInVzZXJJZCI6IjE3NjAxMTc5MDM4NTkwODk0MTAifQ.HgoZ7dpI0bKAkaPxs9amzgG84Pgl_UqcCVr-NTiJZIyh9kIRmlGUM3g3yJCglC0Gyt_-9gxYxv7EqRNjsT3dlQ'
      // }
    })
  })
}
export const getUserInfoByToken = (params) => {
  // return get('/auth/login/getUserByToken', params)
  console.log('getUserInfo', params)
  const menu = flatTree(routers)
  return new Promise((resolve) => {
    resolve({
      code: 1,
      data: {
        id: 1,
        username: 'admin',
        password: '123456',
        name: '管理员',
        avatar: 'https://www.antdv.com/assets/logo.1ef800a8.svg',
        token:
          'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYW5hZ2VyIiwiaWF0IjoxNzIyNDc2OTg1LCJleHAiOjE3MjQyMDQ5ODUsInJvbGVJZCI6IjE2NTQzOTE5ODgwODQ0MTI0MTgiLCJ1c2VyTmFtZSI6IuiBguiKsyIsInVzZXJJZCI6IjE3NjAxMTc5MDM4NTkwODk0MTAifQ.HgoZ7dpI0bKAkaPxs9amzgG84Pgl_UqcCVr-NTiJZIyh9kIRmlGUM3g3yJCglC0Gyt_-9gxYxv7EqRNjsT3dlQ',
        roles: [
          {
            id: 1,
            name: '管理员',
            code: 'admin',
            description: '管理员',
            createTime: '2023-03-01 09:09:09',
            updateTime: '2023-03-01 09:09:09'
          }
        ],
        menu: menu
      }
    })
  })
}
