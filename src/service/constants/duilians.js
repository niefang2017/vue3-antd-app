/*
 * @Author: 聂芳 nie4161204@qq.com
 * @Date: 2023-02-20 17:02:31
 * @LastEditors: 聂芳 nie4161204@qq.com
 * @LastEditTime: 2024-02-06 18:19:37
 * @FilePath: /vue3-frog-admin/src/service/constants/duilians.js
 * @Description: 对联
 *
 */
import { del, get, post, put } from '../request'
/**
 * @description: 新增成语
 * @param {*} params
 * @return {*}
 */
export const createDuilian = (params) => {
  return post('/api/admin/duilians', params)
}
/**
 * @description: 查询成语列表
 * @param {*} params
 * @return {*}
 */
export const getDuilianList = (params) => {
  return post('/api/admin/duilians/page', params)
}
/**
 * @description: 根据id查询成语
 * @param {*} params
 * @return {*}
 */
export const getDuilianById = (id) => {
  return get(`/api/admin/duilians/${id}`)
}
/**
 * @description: 根据id删除成语
 * @param {*} params
 * @return {*}
 */
export const delteDuilianById = (id) => {
  return del(`/api/admin/duilians/${id}`)
}
/**
 * @description: 根据id更新成语
 * @param {*} params
 * @return {*}
 */
export const updateDuilianById = (id, params) => {
  return put(`/api/admin/duilians/${id}`, params)
}
