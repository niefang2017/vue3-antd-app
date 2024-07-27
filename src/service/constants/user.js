/*
 * @Author: 聂芳 nie4161204@qq.com
 * @Date: 2023-02-27 18:24:15
 * @LastEditors: 聂芳 nie4161204@qq.com
 * @LastEditTime: 2024-07-28 01:06:55
 * @FilePath: /vue3-antd-app/src/service/constants/user.js
 * @Description: 用户相关
 *
 */
// import { get,post } from '../request'
/**
 * @description: 登录
 * @param {*} params
 * @return {*}
 */
export const login = (params) => {
  console.log('login', params)
  return {
    code: 1,
    data: {
      id: '1',
      token: '123456',
      name: 'admin',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      roles: ['admin']
    }
  }
  // return post('/api/login', params)
}
