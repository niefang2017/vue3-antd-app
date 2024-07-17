/*
 * @Author: 聂芳 nie4161204@qq.com
 * @Date: 2023-02-27 18:24:15
 * @LastEditors: 聂芳 nie4161204@qq.com
 * @LastEditTime: 2023-03-16 16:51:43
 * @FilePath: /vue3-frog-admin/src/service/constants/user.js
 * @Description: 用户相关
 *
 */
import { post, get } from '../request'
/**
 * @description: 登录
 * @param {*} params
 * @return {*}
 */
export const login = (params) => {
  return post('/api/login', params)
}
