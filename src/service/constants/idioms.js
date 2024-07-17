/*
 * @Author: 聂芳 nie4161204@qq.com
 * @Date: 2023-02-20 17:02:31
 * @LastEditors: 聂芳 nie4161204@qq.com
 * @LastEditTime: 2023-02-28 13:57:27
 * @FilePath: /vue3-frog-admin/src/service/constants/idioms.js
 * @Description: 成语页面接口
 *
 */
import { post, get, del, put } from '../request'
/**
 * @description: 新增成语
 * @param {*} params
 * @return {*}
 */
export const createIdiom = (params) => {
  return post('/api/admin/idioms', params)
}
/**
 * @description: 查询成语列表
 * @param {*} params
 * @return {*}
 */
export const getIdiomList = (params) => {
  return post('/api/admin/idioms/page', params)
}
/**
 * @description: 根据id查询成语
 * @param {*} params
 * @return {*}
 */
export const getIdiomById = (id) => {
  return get(`/api/admin/idioms/${id}`)
}
/**
 * @description: 根据id删除成语
 * @param {*} params
 * @return {*}
 */
export const delteIdiomById = (id) => {
  return del(`/api/admin/idioms/${id}`)
}
/**
 * @description: 根据id更新成语
 * @param {*} params
 * @return {*}
 */
export const updateIdiomById = (id, params) => {
  return put(`/api/admin/idioms/${id}`, params)
}
